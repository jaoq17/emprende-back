require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const transporter = require("./helpers/mailer")
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")

// Conexion a mongoBD
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Conexion exitosa con la BBDD!!")
    })
    .catch((err) =>
        console.log("Hubo un error al conectarnos a la BBDD", {err})
    )


// Creando Schema  // genera restricciones modelo datos guardado base datos tasks= tareas
const taskSchema = new Schema({
    name: String,
    done: Boolean
    // createdBy:
})

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    login_code: String
    // createdBy:
})

const Task = mongoose.model("Task", taskSchema, "Tasks")
const User = mongoose.model("User", userSchema, "Users")




// Middleware de archivos estaticos
app.use(express.static("public", { extensions: ["html", "css", "js"] }))
app.use(express.json())   // Middleware para parsear el BODY de las request
app.use(cookieParser())

app.post("/api/auth/login/:email/code", async function (req, res){
    const { email } = req.params

    const user = await User.findOne({ email })

    if (!user){
        await User.create({ email, firstName: "Jhonny", lastName:"Ocampo" })
        return res
            .status(400)
            .json({ ok: false, message: "No existe un usuario con ese correo"})
    }

    let code = ""

    for (let index = 0; index <= 5; index++){
        let character = Math.ceil(Math.random() * 9)
        code += character
    }

    console.log({ code })

    user.login_code = code
    await user.save()

    const result = await transporter.sendMail({
        from: `Martin Gesualdo ${process.env.EMAIL}`,
        to: email,
        subject: "Código de inicio de sesión:  " + code,
        body: "Este es tu código para iniciar sesión: "
    })
    console.log({ result })
    res.status(200).json({ok: true, message: "Código enviado con éxito" })
})

app.post("/api/auth/login/:email", async function (req, res){
    const { email } = req.params
    const { code } = req.body

    const user = await User.findOne({ email, login_code: code })

    if(!user){
        return res
            .status(400)
            .json({ ok: false, message: "Credenciales invalidas"})
    }

    const tokenPayload = {
        _id : user._id,
        firstName: user.firstName,
        email: user.email,
    }

    const token = jwt.sign(tokenPayload, proccess.env.JWT_SECRET_KEY)
    console.log({ token })
    res.cookie("jwt", token)

    res
    .status(200)
    .json({
        ok: true,
        data: tokenPayload,
        message: "Inicio sesión exitosa!!"
    })
})

const jwtValidation = (req, res, next) =>{
    try {
        const token = req.cookies.jwt
        const validPayload = jwt.verify(token, procces.env.JWT_SECRET_KEY)
        console.log({ validPayload})
        next()
    } catch (error) {
        console.log({ error })
        res.status(401).json({ ok: false, message: "Invalid TOKEN"})

    }
}


app.use(jwtValidation)

// configurar RUTAS
app.get(
    '/api/tasks', 
    (req, res, next) =>{
        try {
            const token = req.cookies.jwt
            const validPayload = jwt.verify(token, procces.env.JWT_SECRET_KEY)
            console.log({ validPayload})
            next()
        } catch (error) {
            console.log({ error })
            res.status(401).json({ ok: false, message: "Invalid TOKEN"})

        }
        
    },
function (req, res) {
    Task.find().then((tasks) => {
        res.status(200).json({ ok: true, data: tasks })
    })
    .catch((err) => {
        res
            .status(400)
            .json({ ok: false, message: "Hubo un problema al obtener las tareas"})
    })
})


app.post("/api/tasks", function(req, res){
    const body = req.body
    console.log({ body })
    Task.create({
        name: body.text,
        done: false,
        hello: "HOLA",
    }).then((createdTask)=>{
    res
        .status(201)
        .json({
            ok: true,
            message: "Tarea creada con éxito",
            data: createdTask,
        })
    })
    .catch(()=>{
        res.status(400).json({ ok: false, message: "Error al crear la tarea" })
    })
})


app.put("/api/tasks/:id", function(req, res){
    const body = req.body
    const id = req.params.id
    
    Task.findByIdAndUpdate(id, {
        name: body.text,
    })
    .then((updatedTask)=>{
        res
        .status(200)
        .json({
            ok: true,
            message: "Tarea editada con éxito",
            data: updatedTask,
        })
    })
    .catch(()=>{
        res.status(400).json({ ok: false, message: "Error al editar la tarea" })
    })
})


app.delete("/api/tasks/:id", function (req, res){
    const id = req.params.id
    Task.findByIdAndDelete(id).then((deletedTask) => {  // revisar el findByAndRemove
        res.status(200).json({ ok: true, data: deletedTask })
    }).catch(() => {
        res
        .status(400)
        .json({ ok: false, message: "Hubo un error al eliminar la tarea" })
    })
    // console.log( { params: req.params, id })
})



/*// app.get('/users', function (req, res) {
//     res.send([{ name: "Martin" }, { name: "Francisco" }])
// }) */


// Poner a escuchar la APP en un puerto
app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
})


// A) Pasamos una función anónima
app.use((req, res, next) => {
    console.log("No especificamos como debe ser el inicio de la ruta")
    console.log("Middleware 1")
    next()
})

// B) Pasamos una funcion RETORNADA por OTRA FUNCION/METODO
const logger = {
    logThis: (whatToLog) => {
        return (req, res, next) => {
            console.log("Middleware 2: ", whatToLog)
            next()
        }
    },
}

app.use("/martin", logger.logThis("Logueame estooo"))



// servir archivos estatico
app.use(express.static('public'))


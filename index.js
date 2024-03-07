require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT
const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Conexion a mongoBD
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Conexion exitosa con la BBDD!")
    })
    .catch((err) =>
        console.log("Hubo un error al conectarnos a la BBDD", {err})
    )


// Creando Schema  // genera restricciones
const taskSchema = new Schema({
    name: String,
    done: Boolean
    // createdBy:
})

const Task = mongoose.model("Task", taskSchema, "Tasks")



// Middleware de archivos estaticos
app.use(express.static("public"))
app.use(express.json())   // Middleware para parsear el BODY de las request


// configurar RUTAS
app.get('/api/tasks', function (req, res) {
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


/* 

// app.get('/users', function (req, res) {
//     res.send([{ name: "Martin" }, { name: "Francisco" }])
// }) 

*/


// Poner a escuchar la APP en un puerto
app.listen(port, () => {
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


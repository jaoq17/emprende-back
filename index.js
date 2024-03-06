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

const Task = mongoose.model("Task", taskSchema,  )





// Middleware de archivos estaticos
app.use(express.static("public"))

// Middleware para parsear el BODY de las request
app.use(express.json())



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


// Middleware para parsear BODY de la REQUEST (es como el caso "C")
app.post("/api/tasks", function(req, res){
    const body = req.body
    console.log({ body })
    res.status(201).json({ ok: true, message: "Tarea creada con éxito"})
})





// servir archivos estatico
app.use(express.static('public'))


// configurar RUTAS
app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/users', function (req, res) {
    res.send([{ name: "Martin" }, { name: "Francisco" }])
})


// Poner a escuchar la APP en un puerto
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
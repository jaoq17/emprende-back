require('dotenv').config();
const express = require('express')
const app = express()
const dbConnect = require("./db/connect")
const cookieParser = require("cookie-parser")
const tasksRoutes = require('./routes/task')
const authRoutes = require('./routes/auth');
const { jwtValidation } = require('./middlewares/jwtValidation');

dbConnect()


// Middleware de archivos estaticos
app.use(express.static("public", { extensions: ["html", "css", "js"] }))
app.use(express.json())   // Middleware para parsear el BODY de las request
app.use(cookieParser())


app.use("/api/auth", authRoutes )


app.use(jwtValidation)


// Configurar nuestros ROUTERS
app.use("/api/tasks", tasksRoutes )

const port = process.env.PORT


// Poner a escuchar la APP en un puerto
app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
})


/*// app.get('/users', function (req, res) {
//     res.send([{ name: "Martin" }, { name: "Francisco" }])
// }) */





// A) Pasamos una función anónima
// app.use((req, res, next) => {
//     console.log("No especificamos como debe ser el inicio de la ruta")
//     console.log("Middleware 1")
//     next()
// })

// B) Pasamos una funcion RETORNADA por OTRA FUNCION/METODO
// const logger = {
//     logThis: (whatToLog) => {
//         return (req, res, next) => {
//             console.log("Middleware 2: ", whatToLog)
//             next()
//         }
//     },
// }

// app.use("/martin", logger.logThis("Logueame estooo"))



// servir archivos estatico
// app.use(express.static('public'))


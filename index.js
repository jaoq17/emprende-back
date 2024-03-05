require('dotenv').config()

const  http = require("http");
// const exportsFromAnother = require("./another")
console.log({ http})

function requestController(){
    console.log("Hola mundo!")
}

//configurar nuestro servidor
const server = http.createServer(requestController)

const PORT = process.env.PORT

server.listen(process.env.PORT, function(){
    console.log("Aplicacion corriendo en puerto: " + PORT)
})

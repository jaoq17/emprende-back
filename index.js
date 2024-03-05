const  http = require("http");
// const exportsFromAnother = require("./another")
console.log({ http})

function requestController(){
    console.log("Hola mundo!")
}

//configurar nuestro servidor
const server = http.createServer(requestController)

server.listen(4000)

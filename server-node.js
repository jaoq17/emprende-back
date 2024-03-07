// require('dotenv').config();
// const  http = require("http");
// const fs = require("fs");


// // const exportsFromAnother = require("./another")
// // console.log({ http})

// function requestController(req, res){
//     const url = req.url
//     const method = req.method
//     console.log({ url, method })

//     if (method === "GET" && url === "/"){
//         res.setHeader("Content-type", "text/html; charset=utf-8")
//         fs.readFile("./public/index.html", function(err, file){
//             if (err){
//                 console.log("Hubo un error")
//             }
        
//             res.write(file)
//             res.end()
//             })
//             return
//     }

//     if (method === "GET" && url === "/about"){
//         res.setHeader("Content-type", "text/html; charset=utf-8")
//         fs.readFile("./public/about.html", function(err, file){
//         /* Valores que evaluados en un contexto BOOLEANO, arrojan FALSY:
//             a) null
//             b) undefined
//             c) 0
//             d) ""
//             e) false
//             f) NaN  ej: si declaro una variable como number y le paso un string
//         */
//             if (err){
//                 console.log("Hubo un error")
//             }
        
//             res.write(file)
//             res.end()
//             })
//             return
//     }

//     res.setHeader("Content-type", "text/html; charset=utf-8")
//     res.write("<h1>Pagina no encontrada</h1>")
//     res.end()
// }


// //configurar nuestro servidor
// const server = http.createServer(requestController)

// const PORT = process.env.PORT

// server.listen(process.env.PORT, function(){
//     console.log("Aplicacion corriendo en puerto: " + PORT)
// })

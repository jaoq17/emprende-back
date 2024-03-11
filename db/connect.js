const mongoose = require('mongoose')

// Conexion a mongoBD

const dbConnect = () => {
    mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Conexion exitosa con la BBDD!!")
    })
    .catch((err) =>
        console.log("Hubo un error al conectarnos a la BBDD", {err})
    )

}

module.exports = dbConnect

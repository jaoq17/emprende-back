const { Task } = require("../models/task")

const getAll = function (req, res) {
    Task.find()
    .then((tasks) => {
        res.status(200).json({ ok: true, data: tasks })
    })
    .catch((err) => {
        res
            .status(400)
            .json({ ok: false, message: "Hubo un problema al obtener las tareas"})
    })
    }


const create = function(req, res){
    const body = req.body
    console.log({ body })
    Task.create({
        name: body.text,
        done: false,
        hello: "HOLA",
    })
    .then((createdTask)=>{
        res.status(201).json({
            ok: true,
            message: "Tarea creada con éxito",
            data: createdTask,
        })
    })
    .catch((err)=>{
        res.status(400).json({ ok: false, message: "Error al crear la tarea" })
    })
}


const update = function(req, res){
    const body = req.body
    const id = req.params.id
    
    Task.findByIdAndUpdate(id, {
        name: body.text,
    })
    .then((updatedTask)=>{
        res.status(200).json({
            ok: true,
            message: "Tarea editada con éxito",
            data: updatedTask,
        })
    })
    .catch((err)=>{
        res.status(400).json({ ok: false, message: "Error al editar la tarea" })
    })
}


const remove = function (req, res){
    const id = req.params.id
    Task.findByIdAndDelete(id)
    .then((deletedTask) => {  // revisar el findByAndRemove
        res.status(200).json({ ok: true, data: deletedTask })
    }).catch((err) => {
        res
        .status(400)
        .json({ ok: false, message: "Hubo un error al eliminar la tarea" })
    })
    // console.log( { params: req.params, id })
}

module.exports = {
    getAll,
    create,
    update,
    remove,
}


// (req, res, next) => {
//     try {
//         const token = req.cookies.jwt
//         const validPayload = jwt.verify(token, procces.env.JWT_SECRET_KEY)
//         console.log({ validPayload})
//         next()
//     } catch (error) {
//         console.log({ error })
//         res.status(401).json({ ok: false, message: "Invalid TOKEN"})

//     }
    
// },

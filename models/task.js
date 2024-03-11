const mongoose = require('mongoose')
const Schema = mongoose.Schema



// Creando Schema  // genera restricciones modelo datos guardado base datos tasks= tareas
const taskSchema = new Schema({
    name: String,
    done: Boolean
    // createdBy:
})

const Task = mongoose.model("Task", taskSchema, "Tasks")

module.exports = { Task }
/* Functions

a. sintaxis and definition (paramaters vs arguments)
b. Params: default values & order
c. Data types coercion & error handling
d. Nmaed vs Arrow
e. Anonymus functions  // no estan definidas como funcion o constante, se guarda con el nombre de palabra reservada
f. "This" object
g. Hoisting  // una  Named functions se puede ejecutar en cualquier parte, asi la variable este antes, no aplioca functions arrow 


// "Named function" difition
function suma(param1, param2){
    console.log({param1, param2})
    let total = param1 + param2
    return total
}

const arg1 = 3
const arg2 = 5


"Invoke", "call" or "excute" a function
console.table({
    constants: suma(arg1, arg2),
    values: suma(10, 20),
    expresions: suma(2+2, 5*8),
    error1: suma(3, {}),
    error2: suma(2, "2"),
    error3: suma("Martin ", "Gesualdo"),
})

*/

// "Named function" difition
// function suma(num1, num2) {
//     console.log( "Named", this)
//     return num1 + num2
// }


// function suma(num1, num2){
//     let total = num1 + num2
//     return total
// }

/* ejemplo como quedaria la de arriba con function flecha => "arrow"
        const suma = (num1, num2) => num1 + num2
*/

// const result = suma(10, 127)
// console.log({ result })

// const personA = { age: 40}
// const personB = { age: 20}    ///


// "Invoke", "call" or "excute" a function
// console.table({
//     constants: suma(personA.age, personB.age),
//     values: suma(10, 20),
//     expresions: suma(2 + 2, 5 * 8),
//     error1: suma(3),
//     error2: suma(2, "2"),
//     error3: suma("Martin ", "Gesualdo"),
// })


// "Arrow function" definition
// const exp = (base, exp = 2) => {
//     console.log("Arrow", this)
//      return base ** exp
// }

    //otra forma pero con arrow function puede ir todo en una sola linea
    // let total = base * exp
    // return total
// }


// // "This" object

// const calculations = {
//     name: "Calculations",
//     suma,
//     exp,
//     sayMyName : function () {
//         console.log("Mi nombre es: ", this.name)
//     },
//     sayMyNameArrow: () => {
//         console.log("Mi nombre es: ", this.name)
//     },
// }
// calculations.sayMyName()
// calculations.sayMyNameArrow()


// "This"  object
// const calculations = {
//     suma, // Named function
//     exp, // Arrow function
// }



// calculations.suma(3, 3)
// calculations.exp(5)


// const exp2 = (param1, param2 = 2) => param1 * param2

// "This" object
// const calculations = {

// }


// "Named funtion" definition
// function suma(num1, num2 = 10){
//     console.log({num1, num2})
//     // if (typeof param1 !== "number" || typeof param2 !== "number"){
//     //     throw Error("Ambos argumentos deben ser del tipo 'number'")
//     // }

//     let total = num1 + num2
//     return total
// }



// console.log("Este JS va a ser interpretado por el Navegador")

// Obtener elementos del HTML y guardarlos en constantes




// const button = document.querySelector("button")
// console.log({ button })


// // Nutrir de funcionalidad a los botones
// button.addEventListener("click", function () {
//     console.log("CLICK!!")
//     fetch("http://localhost:4000/users")
// })


// const getBtn = document.querySelector("#get-tasks")
const createEditBtn = document.querySelector("#create-task")
const tasksDiv = document.querySelector("#tasks")
const input = document.querySelector("#task-name")


// Nutrir de funcionalidad a los botones
// getBtn.addEventListener("click", function (){
//     console.log("GET TAREAS")
//     fetch("http://localhost:4000/api/tasks")
// })



const baseBackendUrl = "http://localhost:4000/api"
// const baseBackendUrl = `${window.origin}/api`
// console.log({ window, baseBackendUrl })


let TASK_TO_EDIT = null


// Nutrir de funcionalidad a los botones
createEditBtn.addEventListener("click", function (){
    console.log("CLICK!!")
    const creating = !TASK_TO_EDIT
    const path = creating ? "tasks" : `tasks/${TASK_TO_EDIT._id}`
    const method = creating ? "POST" : "PUT"
    // fetch(`${baseBackendUrl}/${path}`, {
    //     method,
    //     headers: { "Content-type": "application/json"},
    //     body: JSON.stringify({ text: input.value}),
    // })
    //     .then((res) => {
    //         getTasks()
    //         input.value = ""
    //         createEditBtn.innerText = "Crear tarea"
    //         return res.json()
    // })
    //     .then((resJSON)=>{
    //     console.log({resJSON})
    // })
})

function getTasks(){
    tasksDiv.innerHTML = null
    fetch(`${baseBackendUrl}/tasks`)
        .then((res) => {
            return res.json()
        })
        .then((resJSON)=>{
            const tasks = resJSON.data
            for (const task of tasks) {
                const taskParagraph = document.createElement('p')
                const deleteTaskBtn = document.createElement('button')
                const taskContainerDiv = document.createElement('div')
                deleteTaskBtn.innerText = "Borrar"
                taskParagraph.innerText = task.name
                deleteTaskBtn.setAttribute('id', task._id)
                deleteTaskBtn.addEventListener('click', (e) =>{
                    const taskId = e.target.id
                    deleteTaskBtn.innerText = "..."
                    fetch(`${baseBackendUrl}/tasks/${taskId}`, {
                        method: "DELETE",
                    }).then(() => {
                        const taskDiv =  deleteTaskBtn.parentElement
                        taskDiv.remove()
                    })
                    
                })
                taskParagraph.addEventListener('click', (e) => {
                    input.value = task.name
                    createEditBtn.innerText = "Editar tarea"
                    TASK_TO_EDIT = task
                    console.log({TASK_TO_EDIT})
                })
                taskContainerDiv.appendChild(taskParagraph)
                taskContainerDiv.appendChild(deleteTaskBtn)
                tasksDiv.appendChild(taskContainerDiv)

            } 
    })
}

getTasks()
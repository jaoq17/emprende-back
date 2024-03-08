// Asincronia dada por el entorno  => TIMER

    // let seconds = 2
    // setTimeout(() => {
    //     console.log(`Ya pasaron los ${seconds} segundos`)
    // }, seconds * 1000)

    // console.log("Esto se ejecuta al instante")


// Ojo con las operaciones SINCRONAS
// console.time("Loop took")
// let total = 0
// for (let index = 0; index < 500_000_000; index++){
//     total += index
// }
// console.timeEnd("Loop took")

// console.log("Finalizo el loop", total)


const makeRequest = (method, url) =>{
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
    // console.log("Inicio fetching: ", { response: xhr.response})
    xhr.open(method, url)
    xhr.responseType = "json"
    xhr.onload = () => {
        // console.log({ xhr})
        if (xhr.status >= 200 && xhr.status < 300){
            resolve(null, xhr.response)
        }else{
            reject(new Error(xhr.statusText))
        }
    }

    xhr.onerror = () => {
        reject(new Error("Network error"))
    }
    xhr.send()
    })
    
    return promise
}



// Callback HELL 
const baseURL = "https://jsonplaceholder.typicode.com"
console.time("Fetch took")
const promise = fetch(`${baseURL}/users/1`)
console.log({promise})

promise
    .then((res) => {
        return res.json()
})
.then((user) => {
    return fetch(`${baseURL}/posts?userId=${user.id}`)
})
.then((res) =>{
    return res.json()
}).then(posts => {
    console.log({posts})
})
.catch((err) => {
    console.log("Todo salio mal", err)
})
.finally(() => {
    console.log("Esto se ejecutaria siempre")
})

// Peligro del INVERSION OF CONTROL
// paypal.createOrder(orderInfo, () => {
//     console.log("Esto lo ejecutaria el SDK software Developer kit")
// })
// paypal.createOrder(orderInfo).then(() => {
//     console.log("Esto lo ejecutaria nuestro codigo")
// })
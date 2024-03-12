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


// const makeRequest = (method, url) =>{
//     const promise = new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest()
//     // console.log("Inicio fetching: ", { response: xhr.response})
//     xhr.open(method, url)
//     xhr.responseType = "json"
//     xhr.onload = () => {
//         // console.log({ xhr})
//         if (xhr.status >= 200 && xhr.status < 300){
//             resolve(null, xhr.response)
//         }else{
//             reject(new Error(xhr.statusText))
//         }
//     }

//     xhr.onerror = () => {
//         reject(new Error("Network error"))
//     }
//     xhr.send()
//     })
    
//     return promise
// }



// // Callback HELL 
// const baseURL = "https://jsonplaceholder.typicode.com"

// function myFetch(url){
//     return fetch(url).then((res) => {
//         return res.json()})
// }

// const promise = myFetch(`${baseURL}/users/1`)

// async function getUserData(id) {
//     try {
//         const user = await myFetch(`${baseURL}/users/${id}`)
//         console.log({ user })
//         const posts = await myFetch(`${baseURL}/posts?userId=${user.id}`)
//         const comments = await myFetch(`${baseURL}/comments?postId=${posts[0].id}`)
//         console.log({ user, posts, comments })

//     } catch (error) {
//         console.log({ error })
//     } finally {
//         console.log("ESTO VA SIEMPRE")
//     } 
// }

// getUserData(5)
// promise
//     .then((user) => )
//     .then((posts) => )

//     .then((comments) => {
//         console.log({ comments })
// })
// .catch((err) => {
//     console.log("Todo salio mal", err)
// })
// .finally(() => {
//     console.log("Esto se ejecutaria siempre")
// })



// Peligro del INVERSION OF CONTROL
// paypal.createOrder(orderInfo, () => {
//     console.log("Esto lo ejecutaria el SDK software Developer kit")
// })
// paypal.createOrder(orderInfo).then(() => {
//     console.log("Esto lo ejecutaria nuestro codigo")
// })
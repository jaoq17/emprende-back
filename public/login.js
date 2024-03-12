const form = document.querySelector("form")
const inputEmail = document.querySelector("#email")
const inputCode = document.querySelector("#code")
const codeBtn = document.querySelector("#codeBtn")


const baseBackendUrl = `${window.origin}/api`


// Nutrir de funcionalidad los botones

codeBtn.addEventListener("click", async function (e) {
    console.log("Pidiendo código...");
    try {
        console.log({ value: inputEmail.value});
        if (!inputEmail.value) {
            Swal.fire("UPS", "Debes ingresar un correo", "info");
            return;
        }

        const res = await fetch(
            `${baseBackendUrl}/auth/login/${inputEmail.value}/code`,
            {
                method: "POST",
            }
        );

        const resJSON = await res.json();
        console.log({ resJSON });
    } catch (error) {
        // Manejar el error aquí
    }
});


form.addEventListener("submit", async function (e){
    e.preventDefault()
    console.log("Intentando iniciar sesión...")
    if (!inputEmail.value || !inputCode.value){
        Swal.fire("UPS", "Debes ingresar un correo", "info")
        return
    }

    const res = await fetch(`${baseBackendUrl}/auth/login/${inputEmail.value}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ code: inputCode.value }),
        }
    )
    const resJSON = await res.json()
    window.location.href = "/"
    console.log({ resJSON })

})


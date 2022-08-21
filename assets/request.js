const URL = "http://23.21.222.228:8000/"

var email 

document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault()
    // fetch(URL+"userInfo")
    let mail = event.target.parentNode.children[0].value
    email = mail
    let password = event.target.parentNode.children[1].value
    let confirmPassword = event.target.parentNode.children[2].value

    if (event.target.parentNode.children[1].value != event.target.parentNode.children[2].value) {
        event.target.parentNode.children[3].style = "opacity: 1"

        setTimeout(() => { event.target.parentNode.children[3].style = "opacity: 0" }, 4000)
    }

    else {
        // userInfo/?correo=eduardolopez@correo.com&password=password&confirmpassword=password
        request = URL + "userInfo/?correo=" + email + "&password=" + password + "&confirmpassword=" + confirmPassword
        // console.log(request)

        fetch(request).then(response => response.json()).then(serializedResponse => {
            console.log(serializedResponse)
        })

        document.getElementById("userInfo").style.display = "none"
        document.getElementById("mailConfirm").style.display = "block"
    }



})

document.getElementById("submit2").addEventListener("click", (event) => {
    event.preventDefault()
    let code = event.target.parentNode.children[1].value

    // localhost:8000/confirmMail/?correo=eduardolopez@correo.com&verif_number=666123143142
    request = URL + "confirmMail/?correo=" + email + "&verif_number=" + code
    console.log(request)
    fetch(request).then(response => {
        console.log("serializando")
        return response.json()
    }).then(serializedResponse => {
        console.log("si se pudo serializado")
        if (serializedResponse["numbers match"] === "verified") {
            document.getElementById("mailConfirm").style.display = "none"
            document.getElementById("signUp").style.display = "none"
            document.getElementById("dashboard").style.display = "block"
        }
    })
})


document.getElementById("makeAccount").addEventListener("click", (event) => {
    event.preventDefault()
    document.getElementById("signIn").style.display = "none"
    document.getElementById("signUp").style.display = "block"
    document.getElementById("mailConfirm").style.display = "none"
})


document.getElementById("cancelMakeAccount").addEventListener("click", (event) => {
    event.preventDefault()
    document.getElementById("signIn").style.display = "block"
    document.getElementById("signUp").style.display = "none"
    document.getElementById("mailConfirm").style.display = "none"
})
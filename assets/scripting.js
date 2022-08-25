const URL = "http://23.21.222.228:8000/"

var mail

// LOGIN ACTIVITY

// Hiding and Showing Widgets

// Events that show Sign In Widget
document.getElementById("cancelMakeAccount").addEventListener("click", (event) => {
    document.getElementById("signIn").style.display = "block"
    document.getElementById("signUp").style.display = "none"
    document.getElementById("mailConfirm").style.display = "none"
})

document.getElementById("logOut").addEventListener("click", (event) => {
    document.getElementById("login").style.display = "block"
    document.getElementById("dashboard").style.display = "none"
})

document.getElementById("confirmMailSubmit").addEventListener("click", (event) => {
    event.preventDefault()
    let verCode = event.target.parentNode.children[2].value
    // mail is already declared as global

    if(verCode!=""){
        data = ["correo",mail,"verif_number",verCode]
        let dataToRequest = ""
        for ( let i = 0; i < data.length; i = i+2) {
            dataToRequest = dataToRequest + data[i] + "=" + data[i+1]
            if(i+2<data.length){dataToRequest = dataToRequest + "&"}
        }
        request = URL+"confirmMail"+"/?"+dataToRequest
        
        console.log(request)
        
        fetch(request).then((response) => response.json()).then(serializedResponse => {
            console.log(Object.keys(serializedResponse))              
        })
    }
})

// Events that show Sign Up Widget
document.getElementById("makeAccount").addEventListener("click", (event) => {
    document.getElementById("signIn").style.display = "none"
    document.getElementById("signUp").style.display = "block"
    document.getElementById("mailConfirm").style.display = "none"
})

// Events that show Confirm Email Widget
document.getElementById("submitMakeAccountData").addEventListener("click", (event) => {
    event.preventDefault()

    mail = event.target.parentNode.children[1].value
    let password = event.target.parentNode.children[2].value
    let confirmPassword = event.target.parentNode.children[3].value

    if(mail!=""){
        if(password!=""){
            if(confirmPassword!=""){
                if (password==confirmPassword){
                    data = ["correo",mail,"password",password]
                    let dataToRequest = ""
                    for ( let i = 0; i < data.length; i = i+2) {
                        dataToRequest = dataToRequest + data[i] + "=" + data[i+1]
                        if(i+2<data.length){dataToRequest = dataToRequest + "&"}
                    }
                    request = URL+"signUpRequest"+"/?"+dataToRequest

                    console.log(request)

                    fetch(request).then((response) => response.json()).then(serializedResponse => {
                        console.log(Object.keys(serializedResponse))
                        document.getElementById("signUp").style.display = "none"
                        document.getElementById("mailConfirm").style.display = "block"                
                    })
                }   
            }
        }
    }


    document.getElementById("signIn").style.display = "none"
    document.getElementById("signUp").style.display = "block"
    document.getElementById("mailConfirm").style.display = "none"
})

// DASHBOARD ACTIVITY

// Hiding and Showing Widgets

// Events that show Dashboard
document.getElementById("loginSubmit").addEventListener("click", (event) => {
    event.preventDefault()

    let mail = event.target.parentNode.children[0].value
    let password = event.target.parentNode.children[1].value

    // userInfo/?correo=eduardolopez@correo.com&password=password&confirmpassword=password
    data = ["correo",mail,"password",password]

    // console.log(postData(URL, "loginRequest", data, "first_word"))

    let dataToRequest = ""
    for ( let i = 0; i < data.length; i = i+2) {
        dataToRequest = dataToRequest + data[i] + "=" + data[i+1]
        if(i+2<data.length){dataToRequest = dataToRequest + "&"}
    }

    request = URL+"loginRequest"+"/?"+dataToRequest

    fetch(request).then((response) => response.json()).then(serializedResponse => {
        console.log(Object.keys(serializedResponse))
        let answer = Object.keys(serializedResponse)
        if (answer == "ok") {
            document.getElementById("login").style.display = "none"
            document.getElementById("dashboard").style.display = "block"
        }
        else {
            event.target.parentNode.children[3].style = "opacity: 1;color: white;text-align: center;"
            setTimeout(() => { event.target.parentNode.children[3].style = "opacity: 0" }, 4000)
        }
    })
})

// function postData (url, route, data, returnType) {
//     // Function assumes data is a flat list of pairs
//     // example: [name, value, name, value, name, value]
// 
//     let dataToRequest = ""
//     for ( let i = 0; i < data.length; i = i+2) {
//         dataToRequest = dataToRequest + data[i] + "=" + data[i+1]
//         if(i+2<data.length){dataToRequest = dataToRequest + "&"}
//     }
// 
//     request = url+route+"/?"+dataToRequest
// 
//     fetch(request).then((response) => response.json()).then(serializedResponse => {
// 
//         if (returnType == "first_word") {
//             console.log(Object.keys(serializedResponse))
//             return Object.keys(serializedResponse)
//         }
//     })
// }


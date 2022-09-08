const URL = "https://skyclad.xyz/"

var mail
var lang = "es"
var currentActivity = "signInEs"


document.getElementById("langSelector").onchange = changeLang


function changeLang() {
    lang = document.getElementById("langSelector").value
    translatedCurrentActivity = currentActivity.slice(0,currentActivity.length - 2)
    translatedCurrentActivity = translatedCurrentActivity + lang
    displayElement(translatedCurrentActivity)
}

function displayElement(elementId) {
    document.getElementById("signInEs").style.display = "none"
    document.getElementById("signUpEs").style.display = "none"
    document.getElementById("mailConfirmEs").style.display = "none"
    document.getElementById("dashboardEs").style.display = "none"
    document.getElementById("signInEn").style.display = "none"
    document.getElementById("signUpEn").style.display = "none"
    document.getElementById("mailConfirmEn").style.display = "none"
    document.getElementById("dashboardEn").style.display = "none"
    document.getElementById("adminDashboardEs").style.display = "none"
    console.log(elementId)
    document.getElementById(elementId).style.display = "block"
    currentActivity = elementId
}

// LOGIN ACTIVITY

// Hiding and Showing Widgets

// Events that show Sign In Widget
document.getElementById("cancelMakeAccountEs").addEventListener("click", (event) => {
    displayElement("signInEs")
})

document.getElementById("cancelMakeAccountEn").addEventListener("click", (event) => {
    displayElement("signInEn")
})

document.getElementById("logOutEs").addEventListener("click", (event) => {
    displayElement("signInEs")
})

document.getElementById("logOutFromAdminEs").addEventListener("click", (event) => {
    displayElement("signInEs")
})


document.getElementById("logOutEn").addEventListener("click", (event) => {
    displayElement("signInEn")
})

document.getElementById("confirmMailSubmitEs").addEventListener("click", (event) => {
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
            console.log(serializedResponse["new_status"])
            newStatus = serializedResponse["new_status"]
            if (newStatus == "verified") {
                displayElement("signInEs")
            }
            if (newStatus == "not_verified") {
                event.target.parentNode.children[4].style = "color:white ;text-align: center;opacity: 1;"
                setTimeout(() => { event.target.parentNode.children[4].style = "color:white ;text-align: center;opacity: 0;" }, 4000)
            }
        })
    }
})

document.getElementById("confirmMailSubmitEn").addEventListener("click", (event) => {
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
            console.log(serializedResponse["new_status"])
            newStatus = serializedResponse["new_status"]
            if (newStatus == "verified") {
                displayElement("signInEn")
            }
            if (newStatus == "not_verified") {
                event.target.parentNode.children[4].style = "color:white ;text-align: center;opacity: 1;"
                setTimeout(() => { event.target.parentNode.children[4].style = "color:white ;text-align: center;opacity: 0;" }, 4000)
            }
        })
    }
})

// Events that show Sign Up Widget
document.getElementById("makeAccountEs").addEventListener("click", (event) => {
    displayElement("signUpEs")
})

document.getElementById("makeAccountEn").addEventListener("click", (event) => {
    displayElement("signUpEn")
})

// Events that show Confirm Email Widget
document.getElementById("submitMakeAccountDataEs").addEventListener("click", (event) => {
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
                        displayElement("mailConfirmEs")             
                    })
                }   
            }
        }
    }
})


document.getElementById("submitMakeAccountDataEn").addEventListener("click", (event) => {
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
                        displayElement("mailConfirmEn")             
                    })
                }   
            }
        }
    }
})

// DASHBOARD ACTIVITY

// Hiding and Showing Widgets

// Events that show Dashboard
document.getElementById("loginSubmitEs").addEventListener("click", (event) => {
    event.preventDefault()

    console.log("here")

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
    console.log(request)

    fetch(request).then((response) => response.json()).then(serializedResponse => {
        console.log(Object.keys(serializedResponse))
        let answer = Object.keys(serializedResponse)
        if (answer == "ok") {
            if (serializedResponse["ok"] == "admin") {
                displayElement("adminDashboardEs")
            }
            else{
                displayElement("dashboardEs")
            }
        }
        else {
            event.target.parentNode.children[3].style = "opacity: 1;color: white;text-align: center;"
            setTimeout(() => { event.target.parentNode.children[3].style = "opacity: 0" }, 4000)
        }
    })
})


document.getElementById("delUserEs").addEventListener("click", (event) => {
    event.preventDefault()
    let userToDelete = event.target.parentNode.children[2].value
    data = ["target",userToDelete]
    let dataToRequest = ""
    for ( let i = 0; i < data.length; i = i+2) {
        dataToRequest = dataToRequest + data[i] + "=" + data[i+1]
        if(i+2<data.length){dataToRequest = dataToRequest + "&"}
    }
    request = URL+"deleteUser"+"/?"+dataToRequest
    fetch(request).then((response) => response.json()).then(serializedResponse => {
        console.log(Object.keys(serializedResponse))
    })
})


document.getElementById("loginSubmitEn").addEventListener("click", (event) => {
    event.preventDefault()

    console.log("here")

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
    console.log(request)

    fetch(request).then((response) => response.json()).then(serializedResponse => {
        console.log(Object.keys(serializedResponse))
        let answer = Object.keys(serializedResponse)
        if (answer == "ok") {
            displayElement("dashboardEn")
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


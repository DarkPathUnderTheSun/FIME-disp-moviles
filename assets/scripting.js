const URL = "http://23.21.222.228:8000/"

// LOGIN ACTIVITY

// Hiding and Showing Widgets

// Events that show Sign In Widget
document.getElementById("cancelMakeAccount").addEventListener("click", (event) => {
    document.getElementById("signIn").style.display = "block"
    document.getElementById("signUp").style.display = "none"
    document.getElementById("mailConfirm").style.display = "none"
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

    postData(URL, "loginRequest", data)

    // if() {
    //     document.getElementById("login").style.display = "none"
    //     document.getElementById("dashboard").style.display = "block"
    // }
    
})

function postData (url, route, data) {
    // Function assumes data is a flat list of pairs
    // example: [name, value, name, value, name, value]

    let dataToRequest = ""
    for ( let i = 0; i < data.length; i = i+2) {
        dataToRequest = dataToRequest + data[i] + "=" + data[i+1]
        if(i+2<data.length){dataToRequest = dataToRequest + "&"}
    }

    request = url+route+"/?"+dataToRequest

    console.log(request)


    fetch(request).then((response) => response.json()).then(serializedResponse => {
        console.log(serializedResponse)
        let serverAnswer = serializedResponse
        if (Object.keys(serverAnswer)[0] == "ok") {
            console.log("successful login")
            document.getElementById("login").style.display = "none"
            document.getElementById("dashboard").style.display = "block"
        }
    })
}


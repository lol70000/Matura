let postObj = {
    id:1,
    title: "What is AJAX",
    body: "AJAX stand for Asynchronous JavaScript..."
}

function run(username, password){
    let post = JSON.stringify(postObj)
    const url = "registration.php"
    let xhr = new XMLHttpRequest()
    xhr.open('POST',url,true)
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    xhr.send("username"+username+"&password"+password)
    xhr.onload = function(){
        if(xhr.status === 201){
            console.log("Post successfully created!")
        }
    }
}

function register(event){
    event.preventDefault()
    if (document.getElementById("username") != null){
        if (document.getElementById("password") != null){
            if (document.getElementById("password_check") != null && document.getElementById("password") === document.getElementById("password_check")){
                run(document.getElementById("username").value,document.getElementById("password").value)
            }else{
                document.getElementById("placeholde1").innerHTML = "Username/Password nicht gegeben oder falsch"
            }
        }else{
            document.getElementById("placeholde1").innerHTML = "Username/Password nicht gegeben oder falsch"
        }
    }else{
        document.getElementById("placeholde1").innerHTML = "Username/Password nicht gegeben oder falsch"
    }
}
let postObj = {
    id:1,
    title: "Waht is AJAX",
    body: "AJAX stands for Asynchronous JavaScript..."
}

function run(username,password){
    let post = JSON.stringify(postObj)
    const url = "login.php"
    let xhr = new XMLHttpRequest()
    xhr.open('POST',url,true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send("username="+username+"&password="+password);
    xhr.onload = function(){
        if(xhr.status === 201){
            console.log("Post successfully created!")
        }
    }
}

function login(event){
    event.preventDefault();
    if (document.getElementById("username") != null){
        if(document.getElementById("password") != null){
            run(document.getElementById("username").value,document.getElementById("password").value)
        }else{
            document.getElementById("placeholder1").innerHTML = "Username/Passwort nicht gegeben"
        }
    }else{
        document.getElementById("placeholder1").innerHTML = "Username/Passwort nicht gegeben"
    }
}

const button = document.getElementById("submit")
button.onclick = login()
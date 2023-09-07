let postObj = { 
    id: 1,
    title: "What is AJAX", 
    body: "AJAX stands for Asynchronous JavaScript..."
}

function run(usern, passw) {
    let post = JSON.stringify(postObj)
    const url = "registration.php"
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send("username="+usern+"&password="+passw);
    xhr.onload = function () {
        if(xhr.status === 201) {
            console.log("Post successfully created!")
        }
    }
};

function factorialize(num) {
    if (num < 0) 
          return -1;

    else if (num == 0) 
        return 1;

    else {
        return (num * factorialize(num - 1));
    }
}

function possible_combinations(){
    console.log("Make all possible Teams")
    let number_team = document.getElementById("number_teams").value;
    let all_combinations = [];
    let num = 2;
    let string = '';
    console.log("hello");
    for (let x = 1; x <= number_team-1; x++){
        for (let a = 1; a <= number_team-x; a++){
            string = '';
            string += x;    
            string += ' : ';
            string += num;
            num += 1;
            all_combinations.push(string);
        }
    num = 2+x
    }
    console.log(all_combinations);
}

function teams_to_table(){
    console.log("Make Teama");
    let time = [];
    let status = '';
    const tablebody = document.getElementById("Table_body");
    const number_gyms = document.getElementById("number_Gyms").value;
    const number_teams = document.getElementById("number_teams").value;
    let time_start = document.getElementById("time_of_start").value;
    const time_game = document.getElementById("time_per_game").value;
    const number_rows = Math.ceil(((number_teams/2)*(number_teams-1))/number_gyms);

    time = time_start.split(':');
    let minutes = parseInt(time[1]);
    let hours = parseInt(time[0]);
    status += time[0];
    status += ':';
    status += time[1];

    tablebody.innerHTML= "";

    for (let i = 1; i <= number_rows; i++){
        let tablebodyelement = document.createElement("tr");
        tablebodyelement.setAttribute("class","table-active");
        let stirng = 'row';
        stirng += i;
        tablebodyelement.setAttribute("id",stirng);
        tablebody.appendChild(tablebodyelement);
        
        const tablebodyrow = document.getElementById(stirng);
        tablebodyelement = document.createElement("th");
        tablebodyelement.setAttribute("scope","row");
        stirng = '';
        stirng += status;
        stirng += ' - ';
        minutes = minutes + time_game * 1;
        if (minutes>=60){
            minutes-=60;
            hours += 1;
        };
        status = '';
        status += hours;
        status += ':';
        status += minutes;
        stirng += status;
        tablebodyelement.innerText = stirng;
        tablebodyrow.appendChild(tablebodyelement);

        for (let a = 1; a <= number_gyms; a++){
            tablebodyelement = document.createElement("td");
            tablebodyelement.innerText = 'hello';
            tablebodyrow.appendChild(tablebodyelement);
        }
    }
    possible_combinations();
}

function make_Table(event){
    console.log("make_Table");
    const tableheadrow = document.getElementById("Table-head");
    let tableheadelement = document.createElement("th");
    const numberGyms = document.getElementById("number_Gyms").value;
    tableheadrow.innerHTML = "";
    console.log(numberGyms)
    tableheadelement.innerText = 'Zeit';
    console.log(tableheadelement);
    console.log(tableheadrow);
    tableheadrow.appendChild(tableheadelement);
    for (let i = 1; i <= numberGyms; i++) {
        tableheadelement = document.createElement("th");
        let str = 'Halle ';
        str += i;
        tableheadelement.innerText = str;
        tableheadrow.appendChild(tableheadelement);
    }
    teams_to_table()
}

document.getElementById('fertig').onclick = make_Table;
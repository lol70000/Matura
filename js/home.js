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

//Here all Teams are added into a list.
function makeTeams(number_teams){
    let allteams = [];
    let team = "";
    for(i = 0; i<number_teams; i++){
        team = 0;
        team += i+1;
        team.stringify;
        allteams.push(team);
    }
    return allteams;
}

//Here we get the maximum number of games on a place
function getMaxlength(matchesOnPlaces,number_gyms){
    let leng = [];
    let max = 0;
    //the length of all games is added into a list
    for(a = 0;a<number_gyms;a++){
        leng.push(matchesOnPlaces[a])
    }
    //the first element of said list is set as the maximum
    max = matchesOnPlaces[0].length;
    //the current maximum is checket against the remaninig elements in the list and if they are bigger they are set as the new maximum
    for(b = 1; b<leng.length;b++){
        if (matchesOnPlaces[b]>max){
            max = matchesOnPlaces[b];
        }
    }
    return max;
}

//here the places are filled with filler games, so that all places have a equal amount of games even if they are just fillers
function fillUp(matchesOnPlaces,maxim,number_gyms){
    let filler = ['---','---']
    for(z = 0;z < number_gyms; z++){
        let number = maxim-matchesOnPlaces[z].length-1
        for(a = 0;a <= number;a++){
            matchesOnPlaces[z].push(filler);
        }
    }
return matchesOnPlaces;
}

function teams_table_input(number_teams){
    //Here all needed Variables are declared
    let teamtableinputbody = document.getElementById("Table_input_names");
    const basestring = "Team";
    let stri = "";
    let diving = "";
    //In this loop a input for each Team is created in order to be able to input a team chief for each team
    headerelement = document.createElement("p");
    headerelement.setAttribute("class","text-center text");
    headerelement.innerText = "Name des Team-Chef's"
    teamtableinputbody.appendChild(headerelement);
    for(i = 0; i<number_teams;i++){
        stri += basestring;
        stri += i+1;
        diving += i;
        //first a div is created, so that the inputs are stacked verticaly and not horizontaly
        inputingelement = document.createElement("div");
        inputingelement.setAttribute("id",stri);
        inputingelement.setAttribute("class","center");
        teamtableinputbody.appendChild(inputingelement);
        teamtableinputting = document.getElementById(stri);

        //here the input is created with the Text "Team X" for each team with X being the according number
        tableinputelement = document.createElement("input");
        tableinputelement.setAttribute("class","input center");
        tableinputelement.setAttribute("type","text");
        tableinputelement.setAttribute("id",diving);
        tableinputelement.setAttribute("placeholder",stri);
        teamtableinputting.appendChild(tableinputelement);

        stri = "";
        diving = "";
    }
    //Here the button is created wich allows you to send the results inorder for the table to be created
    tableinputelement = document.createElement("div");
    tableinputelement.setAttribute("class","center");
    tableinputelement.setAttribute("id","input_send");
    teamtableinputbody.appendChild(tableinputelement);
    input_div = document.getElementById("input_send");

    tableinputelement = document.createElement("button");
    tableinputelement.setAttribute("class","center");
    tableinputelement.setAttribute("type","submit");
    tableinputelement.setAttribute("id","sending_teams_table");
    tableinputelement.innerText = "send";
    input_div.appendChild(tableinputelement);
    document.getElementById('sending_teams_table').onclick = teams_table;
}

function teams_table(){
    let number_teams = parseInt(document.getElementById("number_teams").value);
    let teamtablebody = document.getElementById("Table_body_teams");
    let teamtablehead = document.getElementById("Table-head-teams");
    const rows = "Row";
    let rowname = "";
    let stringname = "";
    teamtablebody.innerHTML = '';
    teamtablehead.innerHTML = '';
    let headelemens= ["Team","Chef"];
    for(x=0;x<2;x++){
        let tableheadelement = document.createElement("th");
        tableheadelement.innerText = headelemens[x];
        tableheadelement.setAttribute("scope","col");
        teamtablehead.appendChild(tableheadelement);
    }
    for(i=0;i<number_teams;i++){
        rowname += rows;
        rowname += i;
        stringname += i+1;
        input = document.getElementById(i).value;
        tablebodyelement = document.createElement("tr");
        tablebodyelement.setAttribute("class","table-active")
        tablebodyelement.setAttribute("id",rowname);
        teamtablebody.appendChild(tablebodyelement);
        
        team_table_row = document.getElementById(rowname);
        tablebodyelement = document.createElement("th");
        tablebodyelement.setAttribute("scope","row");
        tablebodyelement.innerText = stringname;
        team_table_row.appendChild(tablebodyelement);

        tablebodyelement = document.createElement("th");
        tablebodyelement.innerText = input;
        team_table_row.appendChild(tablebodyelement);

        rowname = "";
        stringname = "";
    }
    document.getElementById("Table_input_names").innerHTML = "";
}

let counter = 0;
//Here everything is put into the table all of this is done in one function because passing elements from function to function (in my experience) dosn't work all the time
function teams_to_table(){
    //here most variables, lists and constants are declared
    //Also most functions are called here before the loop
    let time = [];
    let status = '';
    let match = '';
    const tablebody = document.getElementById("Table_body");
    const number_gyms = parseInt(document.getElementById("number_Gyms").value);
    const number_teams = document.getElementById("number_teams").value;
    let time_start = document.getElementById("time_of_start").value;
    let time_game = document.getElementById("time_per_game").value;
    const time_break = document.getElementById("time_per_break").value;
    let teams = makeTeams(number_teams);
    let matches = getAllCombinations(teams);
    let rawmatchOnPlace = bringMatchesToPlaces(matches,number_gyms);
    let matchOnPlace = rawmatchOnPlace[0];
    let matchesInRows = rawmatchOnPlace[1];
    let maximum = getMaxlength(matchOnPlace,number_gyms);
    let time_stop = document.getElementById("time_of_end").value;
    let times = [];

    if(counter == 0){
        teams_table_input(number_teams);
    }
    counter += 1;

    //here the list of the games divided up on the places is filled so that all places have an equal amount of games
    matchOnPlace = fillUp(matchOnPlace,maximum,number_gyms);

    //here we check if it is possible to fill the amount of places with the amount of teams given if not an error message is display wich will be taken away if the mistake is corrected
    rounds = number_teams - 1;
    mpr = Math.ceil(parseInt(rounds)/2);
    if (number_gyms > mpr){
        document.getElementById("error_message_teams").innerHTML = "Mit dieser Anzahl Teams können nicht alle Plätze gefüllt werden. Es wird empfohlen "+mpr+" oder weniger Plätze zu haben";
    }else{
        document.getElementById("error_message_teams").innerHTML = ""
    }

    if(time_stop != "" && time_game == 0){
        console.log("calculating...")
        list_start = time_start.split(":");
        list_stop = time_stop.split(":");
        start_hour = parseInt(list_start[0]);
        stop_hour = parseInt(list_stop[0]);
        time_for_turnier = stop_hour-start_hour;
        min_for_turnier = time_for_turnier * 60;
        time_for_games = min_for_turnier-(matches.length * time_break);
        time_game = Math.floor(time_for_games/(matches.length/number_gyms));
    }
    
    //here we split the set start time into hours and minutes(so that i didn't have to deal with the JavaScript time format)
    time = time_start.split(':');
    let minutes = parseInt(time[1]);
    let hours = parseInt(time[0]);
    status += time[0];
    status += ':';
    status += time[1];

    tablebody.innerHTML= "";

    //this is the main loop were all the elements are added to the list
    for (let i = 1; i <= maximum; i++){
        //here we add a row elements to the table body wich to this point is empty
        let tablebodyelement = document.createElement("tr");
        tablebodyelement.setAttribute("class","table-active");
        let stirng = 'row';
        stirng += i;
        tablebodyelement.setAttribute("id",stirng);
        tablebody.appendChild(tablebodyelement);
        
        //here we make this row element a constant so that we dont accidentaly change it during the process
        const tablebodyrow = document.getElementById(stirng);

        //here the first element of the row is prepared wich will always be the time element
        tablebodyelement = document.createElement("th");
        tablebodyelement.setAttribute("scope","row");
        stirng = '';

        //this if statement exists sice we dont want to add the break time to the start time of the first game
        if(i != 1){
            //here we add the break time and the check if the minutes are over 60 
            //if true we subtract 60 minutes from the minutes and add a hour
            minutes = minutes + time_break * 1;
            while(minutes>=60){
                minutes-=60;
                hours += 1;
            }
            while(hours>=24){
                hours -=24
            }
            status = '';
            //here we check if hours or minutes are under 9 because if soo we would have to add a zero before it in order to stay true to the format of the first time
            if(hours <= 9){
                status += '0'
            }
            status += hours;
            status += ':';
            if (minutes <= 9){
                status += '0';
            }
            status += minutes;
        }
        //here the game time is added and the same checks are done as in the if statement
        stirng += status;
        stirng += ' - ';
        minutes = minutes + time_game * 1;
        while (minutes>=60){
            minutes-=60;
            hours += 1;
        }
        while(hours>=24){
            hours -=24
        }
        status = '';
        if(hours <= 9){
            status += '0'
        }
        status += hours;
        status += ':';
        if (minutes <= 9){
            status += '0';
        }
        status += minutes;
        stirng += status;
        times.push(stirng);
        //here the text for the time element of the tabe is added to the element and it is the added to the table as a child of the row
        tablebodyelement.innerText = stirng;
        tablebodyrow.appendChild(tablebodyelement);
        //here we add the matches for the corresponding round each as a child element of the row
        for (x = 0; x < number_gyms; x++){
            match ='';
            match += matchOnPlace[x][i-1][0];
            match += ' : ';
            match += matchOnPlace[x][i-1][1];
            tablebodyelement = document.createElement("th");
            tablebodyelement.innerText = match;
            tablebodyrow.appendChild(tablebodyelement);
        }
    }
    const csv_button = document.getElementById("csv_export");
    csv_button.addEventListener('click',csv_prepare(matchesInRows,times,number_gyms));
}

function make_Table(){
    //here we add the headrow of the table
    const tableheadrow = document.getElementById("Table-head");
    let tableheadelement = document.createElement("th");
    const numberGyms = document.getElementById("number_Gyms").value;
    tableheadrow.innerHTML = "";
    //Here we add the time since it only needs to be added once
    tableheadelement.setAttribute("scope","col");
    tableheadelement.innerText = 'Zeit';
    tableheadrow.appendChild(tableheadelement);
    //here we add a element for each place witch the corresponding name
    for (let i = 1; i <= numberGyms; i++) {
        tableheadelement = document.createElement("th");
        let str = 'Halle ';
        str += i;
        tableheadelement.setAttribute("scope","col");
        tableheadelement.innerText = str;
        tableheadrow.appendChild(tableheadelement);
    }
    teams_to_table()
}

//The following Code was originaly written by Beat Temperli but has been altered to fit this usecase and can be found here:
//https://codepen.io/btemperli/pen/OJrOXZR?editors=0012

function getAllCombinations(arr) {
    const combinations = [];

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            combinations.push([arr[i], arr[j]]);
        }
    }
    console.log(combinations)
    return combinations;
}

// gets a random element from a list
function getRandomElement(liste) {
    const randomIndex = Math.floor(Math.random() * liste.length);
    return liste[randomIndex];
}

// removes a specific element from a list
function arrayRemove(arr, value) {
    return arr.filter(function (geeks) {
        return geeks != value;
    });
}

function oneTeamIsAlreadyInRow(row, teams) {
    if (row.includes(teams[0])) {
        return true;
    }
    if (row.includes(teams[1])) {
        return true;
    }
    return false;
}

function bringMatchesToPlaces(matches, numberOfPlaces) {
    let gamesOnPlaces = [];
    let matchesNotDistributed = matches;
    let teamsInRows = [[]];
    let matchesInRows = [[]];
    
    for (let i = 0; i < numberOfPlaces; i++) {
        // eine neue Spalte für jeden Platz.
        gamesOnPlaces.push([]);
    }
    
    // Nicht immer mit Team 1:2 starten.
    let randomMatch = getRandomElement(matchesNotDistributed);
    matchesInRows[0].push(randomMatch);
    
    // Die Teams abspeichern...
    teamsInRows[0].push(randomMatch[0]);
    teamsInRows[0].push(randomMatch[1]);
    matchesNotDistributed = arrayRemove(matchesNotDistributed, randomMatch);
    
    while (matchesNotDistributed.length > 0) {
        let randomMatch = getRandomElement(matchesNotDistributed);
        let rowToPlaceThisMatchIn = teamsInRows.length;

        // team A or B already in row x?
        for (let i = 0; i < teamsInRows.length; i++) {
            if (!oneTeamIsAlreadyInRow(teamsInRows[i], randomMatch) && matchesInRows[i].length < numberOfPlaces) {
                rowToPlaceThisMatchIn = i;
                break;
            }
        }

        // Diese Teams werden in eine neue Zeile gespeichert
        if (rowToPlaceThisMatchIn >= teamsInRows.length) {
            // console.log("new row: " + rowToPlaceThisMatchIn);
            teamsInRows.push([]);
            matchesInRows.push([]);
        }
    
        // Teams & Match in dieser Zeile speichern
        teamsInRows[rowToPlaceThisMatchIn].push(randomMatch[0]);
        teamsInRows[rowToPlaceThisMatchIn].push(randomMatch[1]);
        matchesInRows[rowToPlaceThisMatchIn].push(randomMatch);
    
        matchesNotDistributed = arrayRemove(matchesNotDistributed, randomMatch);
    }
    
    // Alle Matches aus einer Zeile auf die drei Hallen verteilen.
    for (let i = 0; i < matchesInRows.length; i++) {
        //console.log(matchesInRows[i].length)
        for (let j = 0; j < matchesInRows[i].length; j++) {
            gamesOnPlaces[j].push(matchesInRows[i][j]);
        }
    }
    let outpt = [];
    outpt.push(gamesOnPlaces);
    outpt.push(matchesInRows)
    //console.log(gamesOnPlaces);
    return outpt;
}

function csv_prepare(data_table,table_time,number_of_places){
    let header = ["Zeit"];
    const bossstring = "Halle";
    let string = "";
    let list_element = "";
    data_table.forEach(element => {
        element.forEach(element2 => {
            list_element += element2[0];
            list_element += ":"
            list_element += element2[1];
            element2.splice(0,2);
            element2.push(list_element);
            list_element = "";
            console.log(element2);
        });
    });
    for(y=0;y<number_of_places;y++){
        string += bossstring;
        string += y+1;
        header.push(string);
        string = "";
    }
    x=0;
    data_table.forEach(element => {
        element.splice(0,0,table_time[x]);
        x++;
    });
    data_table.splice(0,0,header);

    const main_csv = data_table.map(row => row.join(',')).join('\n');

    const blob = new Blob([main_csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute('href',url);
    a.setAttribute('download','Spielplan.csv');
    a.click()
}

//here the first function is called and the whole process is started
document.getElementById('fertig').onclick = make_Table;
const csv_button = document.getElementById("csv_export")
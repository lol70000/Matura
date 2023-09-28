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
    const time_game = document.getElementById("time_per_game").value;
    const time_break = document.getElementById("time_per_break").value;
    let teams = makeTeams(number_teams);
    let matches = getAllCombinations(teams);
    let matchOnPlace = bringMatchesToPlaces(matches,number_gyms);
    let maximum = getMaxlength(matchOnPlace,number_gyms);

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
            if (minutes>=60){
                minutes-=60;
                hours += 1;
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
        if (minutes>=60){
            minutes-=60;
            hours += 1;
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
        //here the text for the time element of the tabe is added to the element and it is the added to the table as a child of the row
        tablebodyelement.innerText = stirng;
        tablebodyrow.appendChild(tablebodyelement);
        //here we add the matches for the corresponding round each as a child element of the row
        for (x = 0; x < number_gyms; x++){
            match ='';
            match += matchOnPlace[x][i-1][0];
            match += ' : '
            match += matchOnPlace[x][i-1][1];
            tablebodyelement = document.createElement("th");
            tablebodyelement.setAttribute("scope","row")
            tablebodyelement.innerText = match;
            tablebodyrow.appendChild(tablebodyelement)
        }
    }
}

function make_Table(){
    //here we add the headrow of the table
    const tableheadrow = document.getElementById("Table-head");
    let tableheadelement = document.createElement("th");
    const numberGyms = document.getElementById("number_Gyms").value;
    tableheadrow.innerHTML = "";
    //Here we add the time since it only needs to be added once
    tableheadelement.innerText = 'Zeit';
    tableheadrow.appendChild(tableheadelement);
    //here we add a element for each place witch the corresponding name
    for (let i = 1; i <= numberGyms; i++) {
        tableheadelement = document.createElement("th");
        let str = 'Halle ';
        str += i;
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
    
    //console.log(gamesOnPlaces);
    return gamesOnPlaces;
}

//here the first function is called and the whole process is started
document.getElementById('fertig').onclick = make_Table;
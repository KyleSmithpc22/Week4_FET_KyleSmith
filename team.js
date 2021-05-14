class Member {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }
}

class Team {
    constructor(id, name) {
         this.id = id;
         this.name = name;
         this.members = [];
    }


    
    addMember(member) {
        this.members.push(member);
    }

    deleteMember(member) {
        let index = this.members.indexOf(member);
        this.members.splice(index, 1);
    }
}


let teams = [];
let teamId = 0;

onClick('new-team', () => {
    teams.push(new Team(teamId++, getValue('new-team-name')))
    drawDOM();
});

function onClick(id, action) {
    console.log("got in the onClick")
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    console.log("got to the end onClick")
    return element;
    
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    console.log("got in the drawDOM")
    let teamDiv = document.getElementById('teams');
    clearElement(teamDiv);
    console.log("Got passed clearElement")
    for (team of teams) {
        console.log("Got into the team of teams for loop")
        let table = createTeamTable(team);
        let title = document.createElement('h2');
        title.innerHTML = team.name;
        title.appendChild(createDeleteTeamButton(team));
        teamDiv.appendChild(title);
        teamDiv.appendChild(table);
        console.log("Checking team.members before |member of team.member| for loop: " + team.members)
        console.log(team)
        for (member of team.members) {
            console.log("got into the member of team.members for loop")
            createMemberRow(team, table, member);
            console.log("got into the end of drawDOM")
        }
    }
}

function createMemberRow(team, table, member) {
    console.log("got in the createMemberRow")
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.position;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(team, member));

}

function createDeleteRowButton(team, member) {
    console.log("got in the createDeleteRowButton")
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = team.members.indexOf(member);
        team.members.splice(index, 1);
        drawDOM();
    };
    return btn;  
}

function createDeleteTeamButton(team) {
    console.log("got in the createDeleteTeamButton")
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Team';
    btn.onclick = () => {
        let index = teams.indexOf(team);
        teams.splice(index, 1);
        drawDOM();
    };
    console.log('Got to the end of createDeleteTeamButton')
    return btn;
}

// Member is team
function createNewMemberButton(team) {
    console.log("got in the createNewMemberButton")
    console.log("Here it he team given tocreateNewMemberButton")
    console.log(team)
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        console.log("Got into btn.onclick")
        team.members.push(new Member(getValue(`name-input-${team.id}`), getValue(`position-input-${team.id}`)));
        console.log("Pushes team.members:" + team.members)
        drawDOM();
        
    };
    return btn;
}

function createTeamTable(team) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let positionColum = document.createElement('th');
    nameColumn.innerHTML = 'Level';
    positionColum.innerHTML = 'Pokémon';
    row.appendChild(nameColumn);
    row.appendChild(positionColum);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let positionTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${team.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let positionInput = document.createElement('input');
    positionInput.setAttribute('id', `position-input-${team.id}`);
    positionInput.setAttribute('type', 'text');
    positionInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(team);
    nameTh.appendChild(nameInput);
    positionTh.appendChild(positionInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(positionTh);
    formRow.appendChild(createTh);
    return table;
 
}

function clearElement(element) {
    console.log("got in clearElement")
    while(element.firstChild) {
        element.removeChild(element.firstChild);
        console.log("got to the end of clearElement")
    }
}
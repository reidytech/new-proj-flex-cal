/* event listeners for clicks and prompts */

//would also have to change the id of the element
var projectNames = document.querySelector('.project-names')
projectNames.addEventListener('click', function(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
        var text = target.textContent || text.innerText;
        element = document.getElementById(e.target.id);
        if((element.id).match(/proj/g) !== null){
            if((element.id).match(/week/g) !== null){
               var textEntered = prompt("You wish to change the employee capacity of this cell. The current value is listed in the input box", text);
               if(textEntered == null || textEntered == ""){
                   console.log('Use cancelled input');
               }
               else {
                   element.innerHTML = textEntered;
                   updateCellColor(element);
               }
            }
            else if(element.id.match(/week-translate/g) !== null){
                if(textEntered == null || textEntered == ""){
                    console.log('Use cancelled input');
                }
                else {
                    if(textEntered != '26' || textEntered != '52')
                        console.log("you can only set 26 or 52 weeks.");
                    else
                        setWeekView(textEntered);
                }
            }
            else {
                var textEntered = prompt("You wish to change the project name of this cell. The current name is listed in the input box", text);
                if(textEntered == null || textEntered == ""){
                    console.log('Use cancelled input');
                }
                else {
                    element.innerHTML = textEntered;
                    element.id = textEntered.toLowerCase().replace(' ', '-');
                }
            }
        }
        else {
            console.log("no changeable element was clicked.");
        }
        //console.log(e.target.id);
        //console.log(text);
}, false);


/* constant sample data */

var DATA = {
    projectNames: ["Project-1", "Project-2", "Project-3", "Project-4", "Project-5", "Project-6", "Project-7", "Project-8", "Project-9", "Project-11", "Project-12", "Project-13", "Project-14", "Project-15"]
}

var WEEKNUMBER = 52;

var fteARR = [];

var accessDataCellArr = {
    dataCellArr: this.dataCellArr,
    addCell: function(cell) {
        dataCellArr.push(cell);
    },
    /*removeCell: function(cell) {
        dataCellArr.pop(cell);
    }*/
    returnCellArr: function() {
        return this.dataCellArr;
    }
}

accessDataCellArr.dataCellArr = [];

function genRandomData(arr) {
    fteARR.push(arr);
}

//make 0 FTE WHITE (not black for borders, which you have to take out)
function getRandomData() {
    var stoArr = [];
    var sampleData = 0;
    for(var j = 0; j < WEEKNUMBER; j++){
        if( j < 13){ 
            sampleData = Math.round(Math.random());
        }
        else {
            sampleData = Math.floor((Math.random() * 4) + 1);
        }
        stoArr.push(sampleData);
    }
    return stoArr;
}


function populateWeekNumbers(){
    var weekNumberTable = document.querySelector('.week-number-table');
    weekNumberRow = elemAttr(document.createElement('tr'), {class: 'week-num'});
    weekNumberRow = weekNumberTable.appendChild(weekNumberRow);

    
    for(var i = 0; i < WEEKNUMBER; i++){
        var weekNumberCell = document.createElement('td');
        weekNumberCell.style.fontWeight = 'bold';
        weekNumberCell = elemAttr(weekNumberCell, {id: `week-id-${i+1}`});
        weekNumberCell.className = 'week-cal-cells';
        weekNumberCell.innerHTML = (i+1).toString();
        weekNumberRow.appendChild(weekNumberCell);
    } 
}

/* this function populates project names (leftmost, fixed column) */

function populateProjectNames(DATA){
    var projectNameTable = document.querySelector('.project-names');
    var projectNames = DATA.projectNames;
    var projNodeMap = projectNames.map((val) => {
        var nameCell = document.createElement('td');
        nameCell.innerHTML = val;
        nameCell.className = 'proj-name-cell';
        //this currently sets the id of the cell to the project number, should be changed to project
        //name for effective data setting-getting
        nameCell = elemAttr(nameCell, {id: `proj-${val.match(/[0-9]/g)}`})
        return nameCell;
    });
    
    for(projNode of projNodeMap){
        tableRow = document.createElement('tr');
        tableRow.appendChild(projNode);
        //projectNameTable.appendChild(document.createElement('tr').appendChild(projNode));
        projectNameTable.appendChild(tableRow);
    }
}

function populateFTE(fteARR){
    for(var i = 0; i < DATA.projectNames.length; i++){
        var weekDataProjRow = document.createElement('tr');
        weekDataProjRow = elemAttr(weekDataProjRow, {class: DATA.projectNames[i].toLowerCase()});
        for(var j = 0; j < fteARR[i].length; j++){
            var weekDataCell = document.createElement('td');
            weekDataCell = elemAttr(weekDataCell, {id: `${DATA.projectNames[i].toLowerCase()} week-num-${j + 1}`});
            weekDataCell.className = 'fte-cell';
            if(i === 0){weekDataCell.style.borderTop = '1px solid black';}
            weekDataProjRow.appendChild(weekDataCell);
            weekDataCell.innerHTML = (fteARR[i][j]).toString();
            
            document.querySelector('.week-number-table').appendChild(weekDataProjRow);
            accessDataCellArr.dataCellArr.push(weekDataCell);
        }
    }
}

function fteAlerts(){
    var index = 0;
    while(index < accessDataCellArr.dataCellArr.length) {
        if(accessDataCellArr.dataCellArr[index].innerHTML == 0){
            accessDataCellArr.dataCellArr[index].style.background = 'antiquewhite';
            accessDataCellArr.dataCellArr[index].style.color = 'antiquewhite';
        }
        else if(accessDataCellArr.dataCellArr[index].innerHTML == 1){
            accessDataCellArr.dataCellArr[index].style.background = '#ffd731';
            accessDataCellArr.dataCellArr[index].style.color = '#ffd731';
        }
        else if(accessDataCellArr.dataCellArr[index].innerHTML == 2){
            accessDataCellArr.dataCellArr[index].style.background = '#ffa900';
            accessDataCellArr.dataCellArr[index].style.color = '#ffa900';
        }
        else {
            accessDataCellArr.dataCellArr[index].style.background = '#ff6246';
            accessDataCellArr.dataCellArr[index].style.color = '#ff6246';
        }

        index++;
    }
}

function updateCellColor(node){
    if(node.innerHTML == 0){
       node.style.background = 'antiquewhite';
        node.style.color = 'antiquewhite';
    }
    else if(node.innerHTML == 1){
        node.style.background = '#ffd731';
        node.style.color = '#ffd731';
    }
    else if(node.innerHTML == 2){
        node.style.background = '#ffa900';
        node.style.color = '#ffa900';
    }
    else {
        node.style.background = '#ff6246';
        node.style.color = '#ff6246';
    }
}


function elemAttr(node, classObj){
    switch((Object.keys(classObj))[0]){
        case 'class':
             node.className = (Object.values(classObj))[0];
             return node;
        case 'id':
            node.id = (Object.values(classObj))[0];
            return node;
        default: 
            return node;
    }
}

function setWeekView(weekChange){
    document.getElementById('week-translate').innerHTML = `WeekView: ${weekChange} Weeks.`;
    console.log("you have successfully changed the view to " + WEEKNUMBER + " weeks.");
}

populateWeekNumbers();
populateProjectNames(DATA);
for(var i = 0; i < 16; i++){
    genRandomData(getRandomData());
}

populateFTE(fteARR);
fteAlerts();


//sovoutlook.cloud.corp
//13 - .25 // 39 - .75



/* <tr><td style="">1</td></tr> */
/* tr - class needs to be project name | td - cell needs to have project name as ID and week number as ID td needs class as fteCell*/

/*

                                                <tr>
                                                    <td>1</td>
                                                    <td>2</td>
                                                </tr>
*/


/* REDUX */

var state = {
    projectNames: this.projectNames,
    weekNumber: this.weekNumber,
    capacityPerWeek: this.capacityPerWeek,
    capacityPerProject: this.capacityPerProject
};

function setDefaultState(){
    state.projectNames = DATA.projectNames;
    state.weekNumber = WEEKNUMBER;
    state.capacityPerProject = [];
    state.capacityPerWeek = [];
    
}

setDefaultState();


function getCapacityPerProject(){

}

console.log(fteARR);
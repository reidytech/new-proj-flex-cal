/* constant sample data */

var DATA = {
    projectNames: ["Project-1", "Project-2", "Project-3", "Project-4", "Project-5", "Project-6", "Project-7", "Project-8", "Project-9", "Project-11", "Project-12", "Project-13", "Project-14", "Project-15"]
}

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
console.log(accessDataCellArr.dataCellArr);

function genRandomData(arr) {
    fteARR.push(arr);
}

function getRandomData() {
    var stoArr = [];
    for(var j = 0; j < 60; j++){
        var sampleData = Math.floor((Math.random() * 16) + 1);
        stoArr.push(sampleData);
    }
    return stoArr;
}


function populateWeekNumbers(){
    var weekNumberTable = document.querySelector('.week-number-table');
    weekNumberRow = elemAttr(document.createElement('tr'), {class: 'week-num'});
    weekNumberRow = weekNumberTable.appendChild(weekNumberRow);

    
    for(var i = 0; i < 60; i++){
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
        if(accessDataCellArr.dataCellArr[index].innerHTML >= 10){
            accessDataCellArr.dataCellArr[index].style.background = 'red';
        }
        else if(accessDataCellArr.dataCellArr[index].innerHTML >= 7 && accessDataCellArr.dataCellArr[index].innerHTML < 10){
            accessDataCellArr.dataCellArr[index].style.background = 'orange';
        }
        else if(accessDataCellArr.dataCellArr[index].innerHTML >= 3 && accessDataCellArr.dataCellArr[index].innerHTML < 7){
            accessDataCellArr.dataCellArr[index].style.background = 'yellow';
        }
        else {
            accessDataCellArr.dataCellArr[index].style.background = 'green';
        }

        index++;
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

populateWeekNumbers();
populateProjectNames(DATA);
for(var i = 0; i < 16; i++){
    genRandomData(getRandomData());
}

populateFTE(fteARR);
fteAlerts();





console.log(fteARR);





/* <tr><td style="">1</td></tr> */
/* tr - class needs to be project name | td - cell needs to have project name as ID and week number as ID td needs class as fteCell*/

/*

                                                <tr>
                                                    <td>1</td>
                                                    <td>2</td>
                                                </tr>
*/

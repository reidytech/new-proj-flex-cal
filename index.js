var DATA = {
    projectNames: ["Project-1", "Project-2", "Project-3", "Project-4", "Project-5", "Project-6", "Project-7", "Project-8", "Project-9", "Project-11", "Project-12", "Project-13", "Project-14", "Project-15"]
}

function genRandomData() {
    var arr = [];
    for(var i = 0; i < 60; i++){
        arr.push(i);
    }
    return arr;
}

function populateWeekNumbers(){
    var weekNumberTable = document.querySelector('.week-number-table');
    weekNumberRow = elemAttr(document.createElement('tr'), {class: 'week-num'});
    weekNumberRow = weekNumberTable.appendChild(weekNumberRow);

    
    for(var i = 0; i < 60; i++){
        var weekNumberCell = document.createElement('td');
        weekNumberCell.style.fontWeight = 'bold';
        weekNumberCell = elemAttr(weekNumberCell, {id: `week-id-${i+1}`})
        weekNumberCell.innerHTML = (i+1).toString();
        weekNumberCell.style.borderTop = '2px solid black';
        weekNumberCell.style.borderBottom = '2px solid black';
        weekNumberCell.style.borderRight = '2px solid black';
        weekNumberCell.style.minWidth = '1.5em';
        weekNumberCell.style.textAlign = 'center';
        weekNumberRow.appendChild(weekNumberCell);
    } 
}

function populateProjectNames(DATA){
    var projectNameTable = document.querySelector('.project-names');
    var projectNames = DATA.projectNames;
    var projNodeMap = projectNames.map((val) => {
        console.log(val);
        var nameCell = document.createElement('td');
        nameCell.innerHTML = val;
        nameCell.style.width = '100%';
        nameCell.style.borderTop = '2px solid black';
        nameCell.style.borderBottom = '2px solid black';
        nameCell.style.fontWeight = 'bold';
        nameCell = elemAttr(nameCell, {id: `proj-${val.match(/[0-9]/g)}`})
        return nameCell;
    });

    console.log(projNodeMap);

    for(projNode of projNodeMap){
        tableRow = document.createElement('tr');
        tableRow.appendChild(projNode);
        //projectNameTable.appendChild(document.createElement('tr').appendChild(projNode));
        projectNameTable.appendChild(tableRow);
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




/*

                                                <tr>
                                                    <td>1</td>
                                                    <td>2</td>
                                                </tr>
*/

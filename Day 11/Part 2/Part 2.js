const input = require('../input')
let rows = input.split('\n')
let rowsToExpand = []
let columnToExpand = []
let additional = 999999
function expandRows() {
    for(let i = 0; i <rows.length; i++){
        if(rows[i].indexOf('#') === -1){
            rowsToExpand.push(i)
        }
    }

}
function expandColumns() {
    for(let j = 0; j < rows[0].length; j++){
        let has = false
        for(let i=0; i < rows.length; i++){
            if(rows[i].charAt(j) === '#'){
                has = true
            }
        }
        if(!has){
          columnToExpand.push(j)
        }
    }
}

function findAllIndexes(str, target) {
    let indexes = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === target) {
            indexes.push(i);
        }
    }
    return indexes;
}
function findWays() {
    let allCords = []
    for(let i = 0; i < rows.length; i++){
        if( rows[i].indexOf('#') !== -1){
            let indexes = findAllIndexes(rows[i], '#')
            for(let y = 0; y < indexes.length; y++){
                allCords.push([i,indexes[y]])
            }
        }
    }
    let allPairs = []
    while( allCords.length > 1){
        for(let j = 1; j < allCords.length; j++){
            allPairs.push([allCords[0], allCords[j]])
        }
        allCords.splice(0,1)
    }
    allPairs.forEach(pair => {
        let addRow = 0
        let addColl = 0
        rowsToExpand.forEach(row => {
            if(pair[0][0] < row && pair[1][0] > row){
                addRow++
            }
        })
        columnToExpand.forEach( col => {
            if(pair[0][1] < col && pair[1][1] > col || pair[1][1] < col && pair[0][1] > col){
                addColl++
            }
        })
        let wayByRow = Math.abs(pair[0][0] - pair[1][0]) + addRow*additional
        let wayByCol = Math.abs(pair[0][1] - pair[1][1]) + addColl*additional

        sum += wayByRow + wayByCol
    })

}

let sum = 0;
expandRows()
expandColumns()
findWays()
console.log('Result is:',sum)


const input = require('../input')
let stringRowToAdd = '............................................................................................................................................'
let rows = input.split('\n')
function expandRows() {
    for(let i = rows.length-1; i >= 0; i--){
        if(rows[i].indexOf('#') === -1){
            rows.splice(i+1, 0, stringRowToAdd)
            console.log('-')
        }
    }

}
function expandColumns() {
    for(let j = rows[0].length-1; j >= 0; j--){
        let has = false
        for(let i=0; i < rows.length; i++){
            if(rows[i].charAt(j) === '#'){
                has = true
            }
        }
        if(!has){
            console.log('+')
            for(let i=0; i < rows.length; i++) {
                rows[i] = rows[i].slice(0, j) + '.' + rows[i].slice(j);
            }
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
    for(let i = 0; i < allCords.length; i++) {
        for(let j = i; j < allCords.length; j++){
            sum += ( Math.abs(allCords[j][0] - allCords[i][0]) + Math.abs(allCords[j][1] - allCords[i][1]))
        }
    }

}

let sum = 0;
expandRows()
expandColumns()
findWays()
console.log('Result is:',sum)

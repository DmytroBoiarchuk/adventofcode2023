const data = require('../input')
const map = data.split('\n').map(x => x.split(''))
let loopShadow = [];
for(let i = 0; i < map.length; i++){
    let loopShadowCol = []
    for(let j =0 ; j< map[0].length; j++){
        loopShadowCol.push(false)
    }
    loopShadow.push(loopShadowCol)
}
let rowIndex = -1
let columnIndex = -1
function findS() {
    for(let i = 0; i < map.length; i++){
        columnIndex = map[i].indexOf('S')
        if(columnIndex !== -1){
            rowIndex = i
            break
        }
    }
}
findS();
let target = 'S'
let steps = 0;
let lastCord = [rowIndex , columnIndex]
loopShadow[rowIndex][columnIndex] = true
loopShadow[rowIndex+1][columnIndex] = true

let newCord = [rowIndex + 1, columnIndex]
let pos = map[newCord[0]][newCord[1]]
let row = newCord[0]
let col = newCord[1]
while (pos !== target){
    switch (pos) {
        case '|': {
            if(lastCord[0] - row === -1) {
                lastCord = [row , col]
                row++
            }else{
                lastCord = [row , col]
                row--
            }
            pos = map[row][col]
            loopShadow[row][col] = true
            break
        }
        case '-': {
            if(lastCord[1] - col === 1){
                lastCord = [row , col]
                col--
            }else{
                lastCord = [row , col]
                col++
            }
            pos = map[row][col]
            loopShadow[row][col] = true
            break
        }
        case 'L': {
            if(lastCord[0]- row === -1){
                lastCord = [row , col]
                col++

            }else{
                lastCord = [row , col]
                row--
            }
            pos = map[row][col]
            loopShadow[row][col] = true
            break
        }
        case 'J' : {
            if(lastCord[0]- row === -1){
                lastCord = [row , col]
                col--
            }else{
                lastCord = [row , col]
                row--
            }
            pos = map[row][col]
            loopShadow[row][col] = true
            break
        }
        case '7' : {
            if(lastCord[1]-col === -1){
                lastCord = [row , col]
                row++
            }else{
                lastCord = [row , col]
                col--
            }
            pos = map[row][col]
            loopShadow[row][col] = true
            break
        }
        case 'F' : {
            if(lastCord[1]-col === 1){
                lastCord = [row , col]
                row++
            }else{
                lastCord = [row , col]
                col++
            }
            pos = map[row][col]
            loopShadow[row][col] = true
            break
        }
    }
    steps++
}
////Part 2
let result = 0
let newMap = [];
let newShadow = [];
for (let i = 0; i < map.length; i++) {
        let newRow = [];
        let shadowRow = [];
        for (let x = 0; x < map[i].length; x++) {
            if (map[i][x] !== '-' || !loopShadow[i][x]) {
                newRow.push(map[i][x]);
                shadowRow.push(loopShadow[i][x])
            }
        }
    newMap.push(newRow);
        newShadow.push(shadowRow)
}

let intersection = 0;
for(let i = 0; i < newMap.length; i++){
    for(let j = 0; j < newMap[i].length; j++){
        if(!newShadow[i][j]){
            for(let x = j ; x < newShadow[i].length; x++){
                if(newMap[i][x] !== 'F' && newMap[i][x+1] !== '7' || newMap[i][x] !== 'L' && newMap[i][x+1] !== 'J'){
                   if(newShadow[i][x+1]) intersection++
                }
            }
        }
        if(intersection % 2 !== 0) result++
        intersection = 0
    }

}
console.log('Result is:',result)

const data = require('../input')
const map = data.split('\n').map(x => x.split(''))
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
            break
        }
    }
    steps++
}

console.log('Answer is: ', (steps+1) / 2 )

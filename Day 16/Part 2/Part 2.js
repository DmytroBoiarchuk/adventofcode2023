const field = require('../input').split('\n')
let fieldArr = []
for(let i = 0; i < field.length; i++){
    let row = []
    for (let j = 0; j< field[i].length; j++ ){
        row.push(field[i][j])
    }
    fieldArr.push(row)
}
let powerArr = []
let ways= []
function setUp() {
    powerArr = []
    ways= []
    for(let i = 0; i < field.length; i++){
        let powerRow =[]
        let waysRow = []
        for (let j = 0; j< field[i].length; j++ ){
            powerRow.push(0)
            waysRow.push([0,0])
        }
        powerArr.push(powerRow)
        ways.push(waysRow)
    }
}

function go(startX, startY, wX, wY) {
    let currentPlate = fieldArr[startX][startY]
    let currentPos = [startX, startY]
    let dir = [wX, wY]
    while (currentPlate){
        if(areArraysEqual(dir,ways[currentPos[0]][currentPos[1]] ) && fieldArr[currentPos[0], currentPos[1]] !== 0){
            break
        }
        powerArr[currentPos[0]][currentPos[1]] = 1
        ways[currentPos[0]][currentPos[1]] = [dir[0], dir[1]]
        if(currentPlate === '|'){
            if(dir[0] === 0 && dir[1] !== 0 ){
                if(currentPos[0] !== 0){
                    go(currentPos[0] - 1, currentPos[1], -1, 0)
                }
                dir = [1, 0]
                currentPos = [currentPos[0] + dir[0], currentPos[1] + dir[1]]
                if(currentPos[0] >= 0 && currentPos[0] <= fieldArr.length - 1 && currentPos[1] >= 0 && currentPos[1] <= fieldArr[0].length - 1  ){
                    currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                    continue
                }else{
                    break
                }
            }else{
                currentPos = [currentPos[0] + dir[0], currentPos[1] + dir[1]]
                if(currentPos[0] >= 0 && currentPos[0] <= fieldArr.length - 1 && currentPos[1] >= 0 && currentPos[1] <= fieldArr[0].length - 1  ){
                    currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                    continue
                }else{
                    break
                }

            }
        }
        else if(currentPlate === '-'){
            if(dir[0] !== 0 && dir[1] ===0){
                if(currentPos[1] !== 0) go(currentPos[0], currentPos[1] - 1, 0 , -1)
                dir = [0, 1]
                currentPos = [currentPos[0] + dir[0], currentPos[1] + dir[1]]
                currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                continue
            }else{
                currentPos = [currentPos[0] + dir[0], currentPos[1] + dir[1]]
                currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                continue
            }
        }
        else if(currentPlate === '/'){
            if(dir[0] === 0 && dir[1] > 0) {
                dir = [-1, 0]
                currentPos = [currentPos[0] + dir[0], currentPos[1] + dir[1]]
                if(currentPos[0] >= 0 && currentPos[0] <= fieldArr.length - 1 && currentPos[1] >= 0 && currentPos[1] <= fieldArr[0].length - 1  ){
                    currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                    continue
                }else{
                    break
                }
            }else if(dir[0] === 0 && dir[1] < 0){
                dir = [1 , 0]
                currentPos = [currentPos[0] + dir[0], currentPos[1] + dir[1]]
                if(currentPos[0] >= 0 && currentPos[0] <= fieldArr.length - 1 && currentPos[1] >= 0 && currentPos[1] <= fieldArr[0].length - 1  ){
                    currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                    continue
                }else{
                    break
                }
            }else if(dir[0] > 0 && dir[1] === 0){
                dir = [0, -1]
                currentPos = [currentPos[0] + dir[0], currentPos[1] + dir[1]]
                currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                continue
            }else if(dir[0] < 0 && dir[1] === 0){
                dir = [0, 1]
                currentPos = [currentPos[0] + dir[0], currentPos[1] + dir[1]]
                currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                continue
            }

        }
        else if(currentPlate === '\\'){
            if(dir[0] === 0 && dir[1] > 0) {
                dir = [1, 0]
                currentPos = [currentPos[0] + dir[0], currentPos[1] + dir[1]]
                if(currentPos[0] >= 0 && currentPos[0] <= fieldArr.length - 1 && currentPos[1] >= 0 && currentPos[1] <= fieldArr[0].length - 1  ){
                    currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                    continue
                }else{
                    break
                }
            }else if(dir[0] === 0 && dir[1] < 0){
                dir = [-1 , 0]
                currentPos = [currentPos[0] + dir[0], currentPos[1] + dir[1]]
                if(currentPos[0] >= 0 && currentPos[0] <= fieldArr.length - 1 && currentPos[1] >= 0 && currentPos[1] <= fieldArr[0].length - 1  ){
                    currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                    continue
                }else{
                    break
                }
            }else if(dir[0] > 0 && dir[1] === 0){
                dir = [0, 1]
                currentPos = [currentPos[0] + dir[0], currentPos[1] + dir[1]]
                currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                continue
            }else if(dir[0] < 0 && dir[1] === 0){
                dir = [0, -1]
                currentPos = [currentPos[0] + dir[0], currentPos[1] + dir[1]]
                currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                continue
            }
        }else{
            currentPos = [currentPos[0] + dir[0], currentPos[1] + dir[1]]
            if(currentPos[0] >= 0 && currentPos[0] <= fieldArr.length - 1 && currentPos[1] >= 0 && currentPos[1] <= fieldArr[0].length - 1  ){
                currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
            }else{
                break
            }

        }
    }
}
function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}
let resultArr = []
// up -> down
for(let i = 0; i < fieldArr[0].length; i++) {
    setUp()
    go(0, i, 1 , 0)
    resultArr.push(powerArr.map(row => row.reduce((acc, current) => acc + current, 0)).reduce((acc, current) => acc + current, 0))
}
// down -> up
for(let i = 0; i < fieldArr[0].length; i++) {
    setUp()
    go(fieldArr.length -1, i, -1 , 0)
    resultArr.push(powerArr.map(row => row.reduce((acc, current) => acc + current, 0)).reduce((acc, current) => acc + current, 0))
}
// left -> right
for(let i = 0; i < fieldArr.length; i++) {
    setUp()
    go(i, 0, 0 , 1)
    resultArr.push(powerArr.map(row => row.reduce((acc, current) => acc + current, 0)).reduce((acc, current) => acc + current, 0))
}
// right -> left
for(let i = 0; i < fieldArr.length; i++) {
    setUp()
    go(i, fieldArr[0].length - 1, 0 , -1)
    resultArr.push(powerArr.map(row => row.reduce((acc, current) => acc + current, 0)).reduce((acc, current) => acc + current, 0))
}

console.log('Answer is:',Math.max(...resultArr))
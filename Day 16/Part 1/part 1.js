const field = require('../input').split('\n')

const fieldArr = []
let powerArr = []
let ways= []
for(let i = 0; i < field.length; i++){
    let row = []
    let powerRow =[]
    let waysRow = []
    for (let j = 0; j< field[i].length; j++ ){
        row.push(field[i][j])
        powerRow.push(0)
        waysRow.push([0,0])
    }
    fieldArr.push(row)
    powerArr.push(powerRow)
    ways.push(waysRow)
}
powerArr[0][0] = 1
go(0,0,0, 1)
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
                currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                continue
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
                currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                continue
            }else if(dir[0] === 0 && dir[1] < 0){
                dir = [1 , 0]
                currentPos = [currentPos[0] + dir[0], currentPos[1] + dir[1]]
                currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                continue
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
                currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                continue
            }else if(dir[0] === 0 && dir[1] < 0){
                dir = [-1 , 0]
                currentPos = [currentPos[0] + dir[0], currentPos[1] + dir[1]]
                currentPlate = fieldArr[currentPos[0]] [currentPos[1]]
                continue
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

console.log('Answer is:',powerArr.map(row => row.reduce((acc, current) => acc + current, 0)).reduce((acc, current) => acc + current, 0))
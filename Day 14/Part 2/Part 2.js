const input = require('../input').split('\n')
let arr2D = [];
for(let i = 0; i < input.length ;i++){
    let toPush = []
    for(let j = 0; j < input[i].length;j++){
        toPush.push(input[i][j])
    }
    arr2D.push(toPush)
}
function rollTONorth() {
    for(let i = 1; i < arr2D.length;i++){
        for(let j = 0; j < arr2D[i].length ;j++){
            if(arr2D[i][j] === 'O'){
                let k = 1;
                let m = 0
                while(i-k >= 0 && arr2D[i-k][j] === '.'){
                    arr2D[i-k][j] = 'O'
                    arr2D[i-m][j] = '.'
                    k++
                    m++
                }
            }
        }
    }
}
// <---
function rollTOWest() {
    for(let i = 1; i < arr2D[0].length;i++){
        for(let j = 0; j < arr2D.length ;j++){
            if(arr2D[j][i] === 'O'){
                let k = 1;
                let m = 0
                while(i-k >= 0 && arr2D[j][i - k] === '.'){
                    arr2D[j][i-k] = 'O'
                    arr2D[j][i-m] = '.'
                    k++
                    m++
                }
            }
        }
    }
}

function rollTOSouth() {
    for(let i = arr2D.length - 1; i >= 0;i--){
        for(let j = 0; j < arr2D[i].length ;j++){
            if(arr2D[i][j] === 'O'){
                let k = 1;
                let m = 0
                while(i+k < arr2D.length && arr2D[i+k][j] === '.'){
                    arr2D[i+k][j] = 'O'
                    arr2D[i+m][j] = '.'
                    k++
                    m++
                }
            }
        }
    }
}
function rollTOEast() {
    for(let i = arr2D[0].length - 2; i >=0;i--){
        for(let j = 0; j < arr2D.length ;j++){
            if(arr2D[j][i] === 'O'){
                let k = 1;
                let m = 0
                while(i+k < arr2D[0].length && arr2D[j][i + k] === '.'){
                    arr2D[j][i+k] = 'O'
                    arr2D[j][i+m] = '.'
                    k++
                    m++
                }
            }
        }
    }
}
//after 122 cycles answers repeat every 21 cycle
let cyclesNeeded = (1000000000 - 122) % 21
for(let l = 0; l < 122 + cyclesNeeded   ;l++){
    rollTONorth()
    rollTOWest()
    rollTOSouth()
    rollTOEast()
}
let count = 0
for(let i = 0; i < arr2D.length ;i++){
    for(let j = 0; j < arr2D[i].length ;j++){
        if(arr2D[i][j] === 'O') count += arr2D.length - i
    }
}
console.log('Answer is:',count)


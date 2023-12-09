const data = require('../input')
const histories = data.split('\n').map(row => row.split(' ').map( z => parseInt(z)))
let result = 0
for(let i = 0 ; i < histories.length; i++) {
    let forSum = [histories[i][0]]
    let row = histories[i]
    let tempoArr = []
    for (let j = 0; j < row.length-1; j++) {
        tempoArr.push(row[j+1] - row[j])
    }

    while (!tempoArr.every(el => el === 0)){
        forSum.push(tempoArr[tempoArr.length - 1])
       tempoArr = main(tempoArr)
    }
    result += forSum.reduce((a,c) => a+c)

}

console.log('Sum is: ' + result)
function main(tempoArr) {
    let newArr = []
    for (let j = 0; j < tempoArr.length-1; j++) {
        newArr.push(tempoArr[j+1] - tempoArr[j])
    }
    return newArr
}

























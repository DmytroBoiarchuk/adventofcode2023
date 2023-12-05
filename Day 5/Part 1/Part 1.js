let input = require('../input')
let seeds = input.split('\n')[0].split(':')[1].trim().split(' ')
let mapData = input.split(' \n')
mapData.shift()
mapData = mapData.map(circle => circle.split('\n'))
mapData.forEach((circle) => {
    circle.shift()
})
function find(prevNumber, circleNumber) {
    let nextNumber = prevNumber
    mapData[circleNumber].forEach((row) => {
        let datas = row.split(' ')
        if(prevNumber >= parseInt(datas[1]) && prevNumber <= parseInt(datas[2]) + parseInt(datas[1])){
            nextNumber = parseInt(datas[0]) - parseInt(datas[1]) + prevNumber
        }
    });
    return nextNumber
}
let result = []
seeds.forEach((seed) => {
    for(let i=0 ; i<7; i++){
        seed = find(parseInt(seed), i)
    }
    result.push(seed)
})

console.log(Math.min(...result))
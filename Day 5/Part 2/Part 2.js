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
    let done = false;
    mapData[circleNumber].forEach((row) => {
        let datas = row.split(' ')
        if(!done && prevNumber >= parseInt(datas[1]) && prevNumber <= parseInt(datas[2]) + parseInt(datas[1])){
            nextNumber = parseInt(datas[0]) - parseInt(datas[1]) + prevNumber
            done = true
        }
    });
    return nextNumber
}
let min = -1
for(let i = 0; i < seeds.length; i+=2) {
    let range = parseInt(seeds[i+1])
    let seed = parseInt(seeds[i])
    for(let x = 0; x < range; x++){
        for(let j=0 ; j<7; j++){
            seed = find(seed, j)
        }
        console.log(seed + ' ' + 'SEED NUMERO ' + i)
        min = min === -1 ? seed : Math.min(min, seed)
    }
    console.log(min)

}




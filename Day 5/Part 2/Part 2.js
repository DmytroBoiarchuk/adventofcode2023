let input = require('../input')
const example = 'seeds: 79 14 55 13\n' +
    ' \n' +
    'seed-to-soil map:\n' +
    '50 98 2\n' +
    '52 50 48\n' +
    ' \n' +
    'soil-to-fertilizer map:\n' +
    '0 15 37\n' +
    '37 52 2\n' +
    '39 0 15\n' +
    ' \n' +
    'fertilizer-to-water map:\n' +
    '49 53 8\n' +
    '0 11 42\n' +
    '42 0 7\n' +
    '57 7 4\n' +
    ' \n' +
    'water-to-light map:\n' +
    '88 18 7\n' +
    '18 25 70\n' +
    ' \n' +
    'light-to-temperature map:\n' +
    '45 77 23\n' +
    '81 45 19\n' +
    '68 64 13\n' +
    ' \n' +
    'temperature-to-humidity map:\n' +
    '0 69 1\n' +
    '1 0 69\n' +
    ' \n' +
    'humidity-to-location map:\n' +
    '60 56 37\n' +
    '56 93 4'
let diapasons = []
let seeds = example.split('\n')[0].split(':')[1].trim().split(' ')
let mapData = example.split(' \n')
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
    for(let loop = 0; loop < 7; loop++){
        mapData[loop].forEach((row) => {
            let startCircleChanged = false
            let datas = row.split(' ')
            if(!startCircleChanged && seed > parseInt(datas[1]) &&  (seed + range) < datas[1]+datas[2]){
                seed = seed+(parseInt(datas[0]) - parseInt(datas[1]))
                range = range+(parseInt(datas[0]) - parseInt(datas[1]))
                startCircleChanged = true
                diapasons.push([seed, range])
                console.log(' reduced on ' + loop)
            }
            if(seed > (parseInt(datas[1])+ parseInt(datas[2])) || (seed + range) < datas[1]){
                diapasons.push([seed, range])
            }

        })
        // if(!startCircleChanged){
        //     for(let x = 0; x < range; x++) {
        //        seed = find(seed+x, loop)
        //     }
        // }
    }


    // for(let x = 0; x < range; x++){
    //     const prevSeed = seed
    //     for(let j=startCircle ; j<7; j++){
    //         seed = find(j === 0? seed+x : seed, j)
    //     }
    //     min = min === -1 ? seed : Math.min(min, seed)
    //     seed = prevSeed+1
    //
    //
    // }

}
console.log(min + ' - Result ')



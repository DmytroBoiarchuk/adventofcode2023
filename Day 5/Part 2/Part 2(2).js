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


let seeds = input.split('\n')[0].split(':')[1].trim().split(' ').map(x => parseInt(x))
let mapData = input.split(' \n').slice(1).map(circle => circle.split('\n'))
    .map(circleAgain =>circleAgain.slice(1) ).map((circle3 => {
        if(circle3[circle3.length -1] === ''){
           return  circle3.slice(0, -1)
        }
        return circle3
    } ))
const seedToSoil = mapData[0].map(line => line.split(' ').map(numb => parseInt(numb)))
const soilToFertilizer = mapData[1].map(line => line.split(' ').map(numb => parseInt(numb)))
const fertilizerToWater = mapData[2].map(line => line.split(' ').map(numb => parseInt(numb)))
const waterToLight = mapData[3].map(line => line.split(' ').map(numb => parseInt(numb)))
const lightToTemp = mapData[4].map(line => line.split(' ').map(numb => parseInt(numb)))
const tempToHumid = mapData[5].map(line => line.split(' ').map(numb => parseInt(numb)))
const humidToLocation = mapData[6].map(line => line.split(' ').map(numb => parseInt(numb)))


let diapasons = []
for(let i = 0; i < seeds.length; i+=2){
    diapasons.push([seeds[i], seeds[i+1]])
}
let newDiapasons = [];
function goThroughMap(map, seed, range) {
    for(let i =0 ; i < map.length; i++){
        if( seed > map[i][1] && (seed + range) <= (map[i][1] + map[i][2])){
            newDiapasons.push([seed + (map[i][0] - map[i][1]), range])
        }
        if( seed > map[i][1]+ map[i][2] || seed + range < map[i][1]){
            if(map.length - i === 1){
                newDiapasons.push([seed, range])
            }
        }
        if( (seed < map[i][1] + map[i][2] && seed > map[i][1] && seed+range > map[i][1] + map[i][2])){
            newDiapasons.push([(map[i][0] - map[i][1]) + seed, map[i][1]+map[i][2] - seed])
        }
        if( seed < map[i][1] && seed+range > map[i][1] + map[i][2] ){
            newDiapasons.push([map[i][0], map[i][2]])
        }
        if( seed < map[i][1] && seed + range > map[i][1] && map[i][1]+map[i][2] > seed + range){
            newDiapasons.push([map[i][0], seed + range - map[i][1]])
        }
    }

}

goThroughMap(seedToSoil, diapasons[0][0], diapasons[0][1])
let nDLength = newDiapasons.length;
for(let i = 0 ; i < nDLength; i++){
    goThroughMap(soilToFertilizer, newDiapasons[i][0], newDiapasons[i][1] )
}
newDiapasons = newDiapasons.slice(nDLength)

nDLength = newDiapasons.length
for(let i = 0 ; i < nDLength; i++){
    goThroughMap(fertilizerToWater, newDiapasons[i][0], newDiapasons[i][1] )
}
newDiapasons = newDiapasons.slice(nDLength)

nDLength = newDiapasons.length
for(let i = 0 ; i < nDLength; i++){
    goThroughMap(waterToLight, newDiapasons[i][0], newDiapasons[i][1] )
}
newDiapasons = newDiapasons.slice( nDLength)
//114001375

nDLength = newDiapasons.length
for(let i = 0 ; i < nDLength; i++){
    goThroughMap(lightToTemp, newDiapasons[i][0], newDiapasons[i][1] )
}
newDiapasons = newDiapasons.slice(nDLength)

nDLength = newDiapasons.length

for(let i = 0 ; i < nDLength; i++){
    goThroughMap(tempToHumid, newDiapasons[i][0], newDiapasons[i][1] )
}

newDiapasons = newDiapasons.slice( nDLength)

nDLength = newDiapasons.length
for(let i = 0 ; i < nDLength; i++){
    goThroughMap(humidToLocation, newDiapasons[i][0], newDiapasons[i][1] )
}
console.log(newDiapasons)
 let minValue = newDiapasons.reduce((min, current) => (current[0] < min ? current[0] : min), newDiapasons[0][0]);

console.log('Min Value: ' + minValue);



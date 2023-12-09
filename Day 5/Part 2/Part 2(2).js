let input = require('../input')

const startTime = new Date().getTime();

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

////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////
const endTime = new Date().getTime();
console.log('Time: ', (endTime - startTime)/1000, 'sec');
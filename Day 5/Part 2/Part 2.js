let input = require('../input')
const example = 'seeds: 79 14\n' +
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
let seedDiapason = []
for(let i = 0; i < seeds.length; i += 2){
    seedDiapason.push([seeds[i], seeds[i+1]])
}
let min = [];
let nextMapDiapasons = []
let curCheckDia = []
for(let i = 0; i < seedDiapason.length; i++){
    nextMapDiapasons = [seedDiapason[i]]
    curCheckDia = []
    goThroughMap(seedToSoil)
    goThroughMap(soilToFertilizer)
    goThroughMap(fertilizerToWater)
    goThroughMap(waterToLight)
    goThroughMap(lightToTemp)
    goThroughMap(tempToHumid)
    goThroughMap(humidToLocation)
    min.push( Math.min(...nextMapDiapasons.map(pair => pair[0])))
    nextMapDiapasons = []
}
console.log('The answer is',Math.min(...min))
function goThroughMap(map) {
    curCheckDia = nextMapDiapasons
    nextMapDiapasons = []
    for(let i = 0; i < map.length; i++){
        checkMapLine(curCheckDia, map[i], i === map.length - 1)
    }

}
function checkMapLine (forCheck, line, isLast) {
    for(let i = 0 ; i < forCheck.length; i++) {
        let start = forCheck[i][0]
        let length = forCheck[i][1]
        let currentEnd = start + length
        let mapStart = line[1]
        let mapLength = line[2]
        let mapEnd = line[1] + line[2]
        let difference = line[0] - line[1]

        //     ---current---
        //  ____checking________
        if (start >= mapStart && mapEnd >= currentEnd) {
            curCheckDia.splice(i, i+1)
            nextMapDiapasons.push([start + difference, length])
        }

            //               ---------current----
        // ____checking_______
        else if (start > mapStart && start < mapEnd && currentEnd > mapEnd) {
            curCheckDia.splice(i, i+1)
            nextMapDiapasons.push([start + difference, mapEnd - start])
            curCheckDia.push([mapEnd + 1, currentEnd - mapEnd])
        }

            //  -----current------
        //                ________checking_____
        else if (start < mapStart && currentEnd >= mapStart && currentEnd < mapEnd) {
            curCheckDia.splice(i, i+1)
            nextMapDiapasons.push([mapStart + difference, currentEnd - mapStart])
            curCheckDia.push([start, mapStart - start - 1])
        }
            //    --------current---------
        //      _____checking___
        else if (start < mapStart && currentEnd > mapEnd) {
            curCheckDia.splice(i, i+1)
            nextMapDiapasons.push([mapStart + difference, mapLength])
            curCheckDia.push([start, mapStart - start - 1])
            curCheckDia.push([mapEnd + 1, currentEnd - mapEnd - 1])
        } else if(isLast){
            curCheckDia = []
            nextMapDiapasons.push([start, length])
        }

    }
}










const endTime = new Date().getTime();
console.log('Time: ', (endTime - startTime)/1000, 'sec');
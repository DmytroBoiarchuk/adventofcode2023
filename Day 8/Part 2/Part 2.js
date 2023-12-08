let input = require('../input')
let way = input.split('\n')[0]
let steps = input.split('\n').slice(2)
let output = {};

for (let entry of steps) {
    let [key, valueStr] = entry.split(' = ');
    let value = valueStr.slice(1, -1).split(', ');
    output[key] = value;
}

let positions =  []
let stepsCount = []
let stopPoints = []
for(let i = 0; i < steps.length; i++) {
    if(steps[i].split(' = ')[0].lastIndexOf('A') === 2){
        positions.push(steps[i].split(' = ')[0])
        stepsCount.push(0)
        stopPoints.push(0)
    }
}
for(let i = 0; i< positions.length ; i++){
    for (let j = 0; j < way.length; j++){
        positions[i] = output[positions[i]][way[j] === 'L'? 0 : 1]
        stepsCount[i]++

        if(positions[i].lastIndexOf('Z') === 2){
            break
        }
        if(j === way.length -1){
            j = -1
        }
    }
}
function findLCM(numbers) {
    function findGCD(a, b) {
        return b === 0 ? a : findGCD(b, a % b);
    }
    function findLCMOfTwo(a, b) {
        return (a * b) / findGCD(a, b);
    }
    let lcm = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        lcm = findLCMOfTwo(lcm, numbers[i]);
    }
    return lcm;
}

let result = findLCM(stepsCount);
console.log(result)
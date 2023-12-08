let input = require('../input')
let example = 'LLR\n' +
    '\n' +
    'AAA = (BBB, BBB)\n' +
    'BBB = (AAA, ZZZ)\n' +
    'ZZZ = (ZZZ, ZZZ)'

let way = input.split('\n')[0]
let steps = input.split('\n').slice(2)
let output = {};

for (let entry of steps) {
    let [key, valueStr] = entry.split(' = ');
    let value = valueStr.slice(1, -1).split(', ');
    output[key] = value;
}
let answer = 0;
let position = 'AAA'

for(let i = 0; i< way.length ; i++){
    if(position === 'ZZZ') {
        console.log(answer)
        break
    }
    position = output[position][way[i] === 'L'? 0 : 1]
    answer++

    if(i === way.length -1){
        i = -1
    }
}

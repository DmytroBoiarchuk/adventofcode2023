const input = require('../data')
let sum = 0;
input.split('\n').map( (card) => {
    let points = 0;
    card.split(':')[1]
    .split('|')[0]
        .trim()
    .split(' ')
    .map((number) => {

        let currentNumbers = card.split(':')[1].split('|')[1].trim().split(' ')
        currentNumbers.map((currentNumber) => {
            if(currentNumber.length !== 0 && parseInt(number) === parseInt(currentNumber)){
                points === 0? points = 1 : points *= 2;
            }
        })
    })
    sum += points

})
console.log(sum)
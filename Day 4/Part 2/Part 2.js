const input = require('../data')
let result = 0;
let sum = [];
for (let i = 0; i < 198; i++){
    sum.push(1)
}
input.split('\n').map( (card) => {
    let points = 0;
    let cardNumber = parseInt(card.split(':')[0].slice(4).trim())
    card.split(':')[1]
        .split('|')[0]
        .trim()
        .split(' ')
        .map((number) => {

            let currentNumbers = card.split(':')[1].split('|')[1].trim().split(' ')
            currentNumbers.map((currentNumber) => {
                if(currentNumber.length !== 0 && parseInt(number) === parseInt(currentNumber)){
                    points++
                }
            })
        })
    for(let i = 0; i < points; i++){
        if(sum[cardNumber + i]) sum[cardNumber + i] += sum[cardNumber - 1]
    }
})
sum.map((card)=> {
    result += card
})
console.log(result)
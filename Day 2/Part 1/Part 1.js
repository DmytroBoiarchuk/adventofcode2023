const data = require('../data')
const redMax = 12;
const greenMax = 13;
const blueMax = 14;
const parsedData = data.split('\n');

let games = parsedData.map((row) => {
    let sets = row.split(':')[1]
        .split(';')
        .map((set) => set.split(',')
            .map((trimed) => trimed.trim())
            .map((subString) => subString.split(' ')))
    return sets.map((set) => set.map((pair) => {
        return  {
            [pair[1]]: parseInt(pair[0])
        }
    }))
})

function findIfGameIsPossible(game) {
    let result = true;
    game.forEach((set) => {
         return set.forEach((pair) => {
            if(!(pair.red === undefined || pair.red <= redMax) ) {
                result = false
            }
            if(!(pair.green === undefined || pair.green <= greenMax) ) {
                result = false
            }
            if(!(pair.blue === undefined || pair.blue <= blueMax) ) {
                result = false
            }
        })
    })
    return result;
}
function findSumOfGamesNumbers() {
    let sum = 0;
    for(let i = 0; i < games.length; i++){
        if(findIfGameIsPossible(games[i])){
            sum += i+1;
        }
    }
    return sum
}

console.log(findSumOfGamesNumbers())
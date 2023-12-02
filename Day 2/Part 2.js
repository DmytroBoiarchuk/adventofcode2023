const data = require('./data')

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

function findPowerOfMinimumNeededCubes(game) {
    let minRed = 0;
    let minGreen = 0;
    let minBlue = 0;
    game.forEach((set) => {
        set.forEach( (pair) => {
            if(pair.red !== undefined && pair.red > minRed){
                minRed = pair.red
            }
            if(pair.green !== undefined && pair.green > minGreen){
                minGreen = pair.green
            }
            if(pair.blue !== undefined && pair.blue > minBlue){
                minBlue = pair.blue
            }
        })
    })
    return minRed * minGreen * minBlue
}

function findSumOfPowers() {
    let sum = 0;
    games.map((game) => findPowerOfMinimumNeededCubes(game))
    for(let i = 0 ; i < games.length; i++) {
        sum += findPowerOfMinimumNeededCubes(games[i])
    }
    return sum
}
console.log(findSumOfPowers());
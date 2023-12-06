let input = require('../input');
let seeds = input.split('\n')[0].split(':')[1].trim().split(' ')
let mapData = input.split(' \n')
mapData.shift()
mapData = mapData.map(circle => circle.split('\n'))
mapData.forEach((circle) => {
    circle.shift()
})
let reducingLines = []

mapData.forEach((data)=> {
data.forEach(line => {
    let arr = line.split(' ')
    if(parseInt(arr[0]) - parseInt(arr[1]) < 0) {
        console.log(line.split(' '))
        if (parseInt(seeds[0]) < parseInt(line.split(' ')[1])) {
            if(parseInt(seeds[0] + seeds[1]) < parseInt(line.split(' ')[1])){
                console.log('goNEXT');
            } else {
                console.log((seeds[0] + seeds[1]) - (parseInt(seeds[0] + seeds[1]) - line.split(' ')[1]) + ' ' + 'TARRAAA')
            }
        }
    }

}
)
})

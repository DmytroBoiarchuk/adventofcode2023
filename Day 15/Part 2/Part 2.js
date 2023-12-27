let input = require('../input').split(',')

// setUp instruction
input = input.map(lens =>{
if(lens.indexOf('=') !== -1){
    return lens.split('=')
}else{
    return [lens.slice(0, -1)]

}
})

//initialize boxes
let boxes = []
for(let i = 0; i < 256;i++){
    boxes.push([])
}
//add lens
function addLens(boxNumber, lens){
    for(let i = 0; i < boxes[boxNumber].length;i++){
        if(boxes[boxNumber][i][0] === lens[0]){
            boxes[boxNumber][i][1] = lens[1]
            return
        }
    }
    boxes[boxNumber].push(lens)
}
//remove lens
function removeLens(boxNumber, lens){
    boxes[boxNumber] = boxes[boxNumber].filter(el => el[0] !== lens)
}
// process
input.forEach( action => {
    let actionHash = calcHash(action[0])
    if(action.length > 1){
        addLens(actionHash, [action[0], action[1]])
    }else{
        removeLens(actionHash, action[0])
    }
})
// define HASH of string
function calcHash(str){
    let current = 0
    str = str.split('')
    str.forEach(char => {
        let code = char.charCodeAt(0);
        current += code
        current *= 17
        current = current% 256
    })

    return current
}
//calc total power
let result = 0
for(let i = 0; i < boxes.length; i++){
    let boxPower = 0
    for(let j = 0; j < boxes[i].length; j++){
        boxPower += (i+1) * (j+1) * parseInt(boxes[i][j][1])
    }
    result+=boxPower
}
console.log(result)

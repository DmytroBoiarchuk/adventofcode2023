const input = require('../input').split(',')
let result=0
let current = 0
input.forEach( part => {
    part.split('').forEach(char => calcCurrent(hashCode(char)))
    result += current
    current = 0
})
function calcCurrent(code){
    current += code
    current *= 17
    current = current% 256
}
function hashCode(str) {
    return  str.charCodeAt(0);
}
console.log(result)
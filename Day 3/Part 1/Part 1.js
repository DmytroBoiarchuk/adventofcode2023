const data = require('../data')
let sum = 0;
let rows = data.split('\n');
let numbers = '0123456789'
let numbersAndDot = '0123456789.'
let currentNumber = '';
let currentNumberValidity = false;

for(let i = 0; i < rows.length; i++) {
    for(let j = 0; j < rows[0].length; j++){
        if(numbers.indexOf(rows[i].charAt(j)) !== -1) {
            currentNumberValidity = checkIfIsValid(i, j)
            currentNumber = rows[i].charAt(j)
            if(numbers.indexOf(rows[i].charAt(j + 1)) !== -1){
                j++
                if(!currentNumberValidity) currentNumberValidity = checkIfIsValid(i, j)
                currentNumber += rows[i].charAt(j)
                if(numbers.indexOf(rows[i].charAt(j + 1)) !== -1){
                    j++
                    currentNumber += rows[i].charAt(j)
                    if(!currentNumberValidity) currentNumberValidity = checkIfIsValid(i, j)
                    if(currentNumberValidity) sum += parseInt(currentNumber)
                } else {
                    if(currentNumberValidity) sum += parseInt(currentNumber)
                }
            } else {
                if(currentNumberValidity) sum += parseInt(currentNumber)
            }
        }
    }
}
console.log(sum);

function checkIfIsValid(i, j) {
    if( i !== 0 && numbersAndDot.indexOf(rows[i-1].charAt(j)) === -1 ) {
        return true
    }
    if(i !== 0 && j !== 139 && numbersAndDot.indexOf(rows[i-1].charAt(j+1)) === -1 ) {
        return true
    }
    if(j !== 139 && numbersAndDot.indexOf(rows[i].charAt(j+1)) === -1) {
        return true
    }
    if( i !== 139 && j !== 139 && numbersAndDot.indexOf(rows[i+1].charAt(j+1)) === -1) {
        return true
    }
    if( i !== 139 && numbersAndDot.indexOf(rows[i+1].charAt(j)) === -1 ) {
        return true
    }
    if( i !== 139 && j !== 0 && numbersAndDot.indexOf(rows[i+1].charAt(j-1)) === -1) {
        return true
    }
    if( j !== 0 && numbersAndDot.indexOf(rows[i].charAt(j-1)) === -1) {
        return true
    }
    return i !== 0 && j !== 0 && numbersAndDot.indexOf(rows[i - 1].charAt(j - 1)) === -1;

}
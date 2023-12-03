const data = require('../data')
let sum = 0;
let rows = data.split('\n');
let numbers = '0123456789'
let star = '*'
let starPointI
let starPointJ
let currentNumber = '';
let currentNumberIsMultipliable = false;
let checkBoxArr = []

for (let i = 0; i < 140; i++) {
    checkBoxArr[i] = [];
    for (let j = 0; j < 140; j++) {
        checkBoxArr[i][j] = false;
    }
}
for(let i = 0; i < rows.length; i++) {
    for(let j = 0; j < rows[0].length; j++){
        if(star.indexOf(rows[i].charAt(j)) !== -1 && !checkBoxArr[i][j]) {
            checkBoxArr[i][j] = true;
            let res = findPairOfNumber(i,j)
            if(res!==null)
            sum += res[0] * res[1]
        }
    }
}
console.log(sum)

function findPairOfNumber(i, j) {
    let pair = [null, null]
    if( i !== 0 && numbers.indexOf(rows[i-1].charAt(j)) !== -1 && !checkBoxArr[i-1][j] ) {
        if(pair[0] === null) {
            pair[0] = checkThreeForwardAndBackWard(i-1,j)
        } else {
            pair[1] = checkThreeForwardAndBackWard(i-1,j)
            return pair
        }
    }
    if(i !== 0 && j !== 139 && numbers.indexOf(rows[i-1].charAt(j+1)) !== -1 && !checkBoxArr[i-1][j+1] ) {
        if(pair[0] === null) {
            pair[0] = checkThreeForwardAndBackWard(i-1,j+1)
        } else {
            pair[1] = checkThreeForwardAndBackWard(i-1,j+1)
            return pair
        }
    }
    if(j !== 139 && numbers.indexOf(rows[i].charAt(j+1)) !== -1 && !checkBoxArr[i][j+1]) {
        if(pair[0] === null) {
            pair[0] = checkThreeForwardAndBackWard(i,j+1)
        } else {
            pair[1] = checkThreeForwardAndBackWard(i,j+1)
            return pair
        }
    }
    if( i !== 139 && j !== 139 && numbers.indexOf(rows[i+1].charAt(j+1)) !== -1 && !checkBoxArr[i+1][j+1]) {
        if(pair[0] === null) {
            pair[0] = checkThreeForwardAndBackWard(i+1,j+1)
        } else {
            pair[1] = checkThreeForwardAndBackWard(i+1,j+1)
            return pair
        }
    }
    if( i !== 139 && numbers.indexOf(rows[i+1].charAt(j)) !== -1 && !checkBoxArr[i+1][j]) {
        if(pair[0] === null) {
            pair[0] = checkThreeForwardAndBackWard(i+1,j)
        } else {
            pair[1] = checkThreeForwardAndBackWard(i+1,j)
            return pair
        }
    }
    if( i !== 139 && j !== 0 && numbers.indexOf(rows[i+1].charAt(j-1)) !== -1 && !checkBoxArr[i+1][j-1]) {
        if(pair[0] === null) {
            pair[0] = checkThreeForwardAndBackWard(i+1,j-1)
        } else {
            pair[1] = checkThreeForwardAndBackWard(i+1,j-1)
            return pair
        }
    }
    if( j !== 0 && numbers.indexOf(rows[i].charAt(j-1)) !== -1 && !checkBoxArr[i][j - 1]) {
        if(pair[0] === null) {
            pair[0] = checkThreeForwardAndBackWard(i,j-1)
        } else {
            pair[1] = checkThreeForwardAndBackWard(i,j-1)
            return pair
        }
    }
    if(i !== 0 && j !== 0 && numbers.indexOf(rows[i - 1].charAt(j - 1)) !== -1 && !checkBoxArr[i-1][j-1]){
        if(pair[0] === null) {
            pair[0] = checkThreeForwardAndBackWard(i-1,j-1)
        } else {
            pair[1] = checkThreeForwardAndBackWard(i-1,j-1)
            return pair
        }
    }
    if(pair[1] === null){
        return null
    }

}

function checkThreeForwardAndBackWard( i , j ) {
        let number = '';
        checkBoxArr[i][j] = true;
        if(numbers.indexOf(rows[i].charAt(j-1)) !== -1) {
            checkBoxArr[i][j-1] = true;
            if(numbers.indexOf(rows[i].charAt(j-2)) !== -1){
                checkBoxArr[i][j-2] = true;
                number = rows[i].charAt(j-2)
            }
            number += rows[i].charAt(j-1)
        }
        number += rows[i].charAt(j)
        if(numbers.indexOf(rows[i].charAt(j+1)) !== -1) {
            checkBoxArr[i][j+1] = true;
            number += rows[i].charAt(j+1)
            if(numbers.indexOf(rows[i].charAt(j+2)) !== -1) {
                checkBoxArr[i][j+2] = true;
                number += rows[i].charAt(j+2)
            }
        }
        return number
}
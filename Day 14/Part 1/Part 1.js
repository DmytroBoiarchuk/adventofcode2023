const input = require('../input').split('\n')
let arr2D = [];
for(let i = 0; i < input.length ;i++){
    let toPush = []
    for(let j = 0; j < input[i].length;j++){
        toPush.push(input[i][j])
    }
    arr2D.push(toPush)
}
for(let i = 1; i < arr2D.length;i++){
    for(let j = 0; j < arr2D[i].length ;j++){
        if(arr2D[i][j] === 'O'){
            let k = 1;
            let m = 0
            while(i-k >= 0 && arr2D[i-k][j] === '.'){
                arr2D[i-k][j] = 'O'
                arr2D[i-m][j] = '.'
                k++
                m++
            }
        }
    }
}
let count = 0
for(let i = 0; i < arr2D.length ;i++){
    for(let j = 0; j < arr2D[i].length ;j++){
        if(arr2D[i][j] === 'O') count += arr2D.length - i
    }
}
console.log('Answer is:',count)
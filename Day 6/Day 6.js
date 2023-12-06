const data = '54 70 82 75\n' +
    '239 1142 1295 1253'
const races = data.split('\n').map((line) => {
    return line.split( ' ')
})
let mainRes = 0;
for (let i=0 ; i < races[0].length; i++){

    if(mainRes !== 0){
        mainRes *= findOut(races[0][i], races[1][i])
    } else {
        mainRes = findOut(races[0][i], races[1][i])
    }
}

function findOut (time, record) {
    let result = 0;
    for(let i = 0; i < time; i++){
        if(i*(time - i) > record){
            result++
        }
    }
    return result
}

console.log(findOut(54708275, 239114212951253))
console.log(mainRes)
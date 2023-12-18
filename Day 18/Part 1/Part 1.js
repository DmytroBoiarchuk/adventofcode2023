const data = require('../input')
    .split('\n').map(x => x.split( ' ')).map(([u, y]) => [u, parseInt(y)] )

function findVertexes(){
    let vertexes = [[0,0]]
    let lastVertex = [0,0]
    data.forEach(movement => {
        if(movement[0] === 'R'){
            vertexes.push([lastVertex[0], lastVertex[1] + movement[1]])
            lastVertex = [lastVertex[0], lastVertex[1] + movement[1]]
        }
        else if(movement[0] === 'L'){
            vertexes.push([lastVertex[0], lastVertex[1] - movement[1]])
            lastVertex = [lastVertex[0], lastVertex[1] - movement[1]]
        }
        else if(movement[0] === 'U'){
            vertexes.push([lastVertex[0] - movement[1], lastVertex[1]])
            lastVertex = [lastVertex[0] - movement[1], lastVertex[1]]
        }else if(movement[0] === 'D'){
            vertexes.push([lastVertex[0] + movement[1], lastVertex[1]])
            lastVertex = [lastVertex[0] + movement[1], lastVertex[1]]
        }
    })
    return vertexes
}
function calc(vertexes) {
    let sum1 = 0
    for(let i = 0; i < vertexes.length; i++){
        if(i === vertexes.length - 1){
            sum1 += vertexes[i][0]*vertexes[0][1]
        }else{
            sum1 += vertexes[i][0]* vertexes[i+1][1]

        }
    }
    let sum2 = 0
    for(let i = 0; i < vertexes.length; i++){
        if(i === vertexes.length - 1){
            sum2 += vertexes[i][1]*vertexes[0][0]
        }else{
            sum2 += vertexes[i][1]* vertexes[i+1][0]
        }
    }
    return  Math.abs(sum1 - sum2)/2
}
function findPerimeter(){
    let sum = 0
    data.forEach(cord => {
        sum += cord[1]
    })
    return sum/2
}

console.log(calc(findVertexes()) + findPerimeter() +1)





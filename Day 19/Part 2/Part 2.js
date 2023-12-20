const input = require('../input')
let systems = input.split('\n\n')[0].split('\n')
let systemObj = {}
let results = []
const [diapasonsMin , diapasonsMax] = [1, 4000]
systems.forEach(rules => {
    rules = rules.split('{')
    systemObj[rules[0]] = rules[1].slice(0, -1).split(',').map(y=> y.split(':'))
})
const access = 'A'
const reject ='R'
const firstCheck = 'in'
function checkRule(ruleName, xMin, xMax, mMin, mMax, aMin, aMax, sMin, sMax) {
    if(ruleName === access) {
        results.push([ [xMin, xMax], [mMin, mMax], [aMin, aMax], [sMin, sMax]])
        return;
    }
    if(ruleName === reject){
        return;
    }
    if(ruleName === undefined){
        return;
    }
    for(let index = 0 ; index < systemObj[ruleName].length; index++){
        if(systemObj[ruleName][index].length === 1 ){
                checkRule(systemObj[ruleName][index][0], xMin, xMax, mMin, mMax, aMin, aMax, sMin, sMax)
        }
        if(systemObj[ruleName][index][0].charAt(0) === 'x') {
            if (systemObj[ruleName][index][0].charAt(1) === '<') {
                checkRule(systemObj[ruleName][index][1],xMin, parseInt(systemObj[ruleName][index][0].slice(2))-1, mMin, mMax, aMin, aMax, sMin, sMax)
                xMin = parseInt(systemObj[ruleName][index][0].slice(2))
            }else{
                checkRule(systemObj[ruleName][index][1], parseInt(systemObj[ruleName][index][0].slice(2))+1, xMax, mMin, mMax, aMin, aMax,sMin, sMax)
                xMax = parseInt(systemObj[ruleName][index][0].slice(2))
            }
        } else if(systemObj[ruleName][index][0].charAt(0) === 'm'){
            if (systemObj[ruleName][index][0].charAt(1) === '<') {
                checkRule(systemObj[ruleName][index][1],xMin, xMax, mMin, parseInt(systemObj[ruleName][index][0].slice(2))-1, aMin, aMax, sMin, sMax)
                mMin = parseInt(systemObj[ruleName][index][0].slice(2))
            }else{
                checkRule(systemObj[ruleName][index][1], xMin, xMax, parseInt(systemObj[ruleName][index][0].slice(2))+1, mMax, aMin, aMax,sMin, sMax)
                mMax = parseInt(systemObj[ruleName][index][0].slice(2))
            }
        }else if(systemObj[ruleName][index][0].charAt(0) === 'a'){
            if (systemObj[ruleName][index][0].charAt(1) === '<') {
                checkRule(systemObj[ruleName][index][1],xMin, xMax, mMin, mMax, aMin, parseInt(systemObj[ruleName][index][0].slice(2))-1, sMin, sMax)
                aMin = parseInt(systemObj[ruleName][index][0].slice(2))
            }else{
                checkRule(systemObj[ruleName][index][1], xMin, xMax, mMin, mMax, parseInt(systemObj[ruleName][index][0].slice(2))+1, aMax,sMin, sMax)
                aMax = parseInt(systemObj[ruleName][index][0].slice(2))
            }
        }else if(systemObj[ruleName][index][0].charAt(0) === 's'){
            if (systemObj[ruleName][index][0].charAt(1) === '<') {
                checkRule(systemObj[ruleName][index][1],xMin, xMax, mMin, mMax, aMin, aMax, sMin, parseInt(systemObj[ruleName][index][0].slice(2))-1)
                sMin = parseInt(systemObj[ruleName][index][0].slice(2))
            }else{
                checkRule(systemObj[ruleName][index][1], xMin, xMax, mMin, mMax, aMin, aMax,parseInt(systemObj[ruleName][index][0].slice(2))+1, sMax)
                sMax = parseInt(systemObj[ruleName][index][0].slice(2))
            }
        }
    }
}

checkRule(firstCheck, diapasonsMin, diapasonsMax, diapasonsMin, diapasonsMax, diapasonsMin, diapasonsMax, diapasonsMin, diapasonsMax)
let res = 0
results.forEach(range => {
    res += (range[0][1] - range[0][0] +1) * (range[1][1] - range[1][0] +1) * (range[2][1] - range[2][0] +1)* (range[3][1] - range[3][0] +1)
})

console.log('Answer is:', res)

const input = require('../input')
let [systems, details]  = input.split('\n\n').map(x => x.split('\n'))
let systemObj = {}
let successDetails = []
systems.forEach(rules => {
    rules = rules.split('{')
    systemObj[rules[0]] = rules[1].slice(0, -1).split(',').map(y=> y.split(':'))
})
let detailsConfig = []
details.forEach(row => {
    row = row.slice(1, -1)
    detailsConfig.push(row.split(',').map(x=>x.split('=')[1]))
})

const access = 'A'
const reject ='R'
const firstCheck = 'in'
function checkRule(detail, ruleName) {
    for(let index = 0 ; index < systemObj[ruleName].length; index++){
        if(systemObj[ruleName][index].length === 1 ){
            return systemObj[ruleName][index][0]
         }
        if(systemObj[ruleName][index][0].charAt(0) === 'x') {
            if (systemObj[ruleName][index][0].charAt(1) === '<') {
                if (parseInt(detail[0]) < parseInt(systemObj[ruleName][index][0].slice(2))) {
                    return systemObj[ruleName][index][1]
                }
            }else{
                if (parseInt(detail[0]) > parseInt(systemObj[ruleName][index][0].slice(2))) {
                    return systemObj[ruleName][index][1]
                }
            }
        } else if(systemObj[ruleName][index][0].charAt(0) === 'm'){
            if (systemObj[ruleName][index][0].charAt(1) === '<') {
                if (parseInt(detail[1]) < parseInt(systemObj[ruleName][index][0].slice(2))) {
                    return systemObj[ruleName][index][1]
                }
            }else{
                if (parseInt(detail[1]) > parseInt(systemObj[ruleName][index][0].slice(2))) {
                    return systemObj[ruleName][index][1]
                }
            }
        }else if(systemObj[ruleName][index][0].charAt(0) === 'a'){
            if (systemObj[ruleName][index][0].charAt(1) === '<') {
                if (parseInt(detail[2]) < parseInt(systemObj[ruleName][index][0].slice(2))) {
                    return systemObj[ruleName][index][1]
                }
            }else{
                if (parseInt(detail[2]) > parseInt(systemObj[ruleName][index][0].slice(2))) {
                    return systemObj[ruleName][index][1]
                }
            }
        }else if(systemObj[ruleName][index][0].charAt(0) === 's'){
            if (systemObj[ruleName][index][0].charAt(1) === '<') {
                if (parseInt(detail[3]) < parseInt(systemObj[ruleName][index][0].slice(2))) {
                    return systemObj[ruleName][index][1]
                }
            }else{
                if (parseInt(detail[3]) > parseInt(systemObj[ruleName][index][0].slice(2))) {
                    return systemObj[ruleName][index][1]
                }
            }
        }
    }
}
function checkDetail(detail) {
    //xmas
    let answer = '';
    let ruleName = firstCheck
    while (answer !== access && answer !== reject){
        answer = checkRule(detail, ruleName)
        if(answer === access){
            successDetails.push(...detail)
        }else if(answer !== reject){
            ruleName = answer
        }
    }
}

for(let i = 0 ; i < detailsConfig.length; i++){
    checkDetail(detailsConfig[i])
}
console.log('Answer is:', successDetails.reduce((a, c) => a + parseInt(c), 0))

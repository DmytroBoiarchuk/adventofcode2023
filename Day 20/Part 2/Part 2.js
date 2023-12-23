const input = require('../input')
const pars = require("../Part 1/Pars");
let [broadCaster, fFMod, conMod, state] = pars(input)
let conModsMemory = {}
let low = false
let high = true
let targetModules = []
let targetPresses = []
function setUpConModsMemory(){
    let toPush = []
    for (const con in conMod){
        for(const fF in fFMod){
            if(fFMod[fF].includes(con)){
                toPush.push([fF, undefined])
            }
        }
        for(const con2 in conMod){
            if(conMod[con2].includes(con)){
                toPush.push([con2, undefined])
            }
        }
        conModsMemory[con] = toPush
        toPush=[]
    }

}

function sendPulse(pulse, from, where) {
    if (fFMod[where] && !pulse) {
        fFMod[where].forEach(mods => state[where]? addToQueue(low, where, mods) : addToQueue(high, where, mods))
        state[where] = !state[where]
    }else if(conMod[where]){
        let send = low;
        conModsMemory[where] = conModsMemory[where].map(fF => {
            if(fF[0] === from){
                return [from, pulse]
            }else{
                return fF
            }
        })
        conModsMemory[where].forEach(fF => {
            if(fF[1] === low || fF[1] === undefined){
                send = high
            }
        })
        conMod[where].forEach( x=> addToQueue(send,where, x))
    }
}

let queue = []
function addToQueue(pulse ,from, where) {
    queue.push([pulse, from, where])
}
function processQueue(i){
    let queueCopy = queue.slice()
    queue = []
    queueCopy.forEach(send =>{
        sendPulse(send[0],send[1],send[2])
        targetModules.forEach(target => {
            if(send[0] === target[0] && send[1] === target[1] && send[2] === target[2] ){
                targetPresses.push(i)
            }
        })
    })
}

function pressButton(i) {
    broadCaster.forEach(module => addToQueue(low,undefined,module))
    while (queue.length !== 0){
        processQueue(i)
    }
}
function main() {
    setUpConModsMemory()
    conModsMemory['zh'].forEach(mods => {
        targetModules.push([high, mods[0], 'zh'])
    })
    for(let i = 1 ; i < Infinity; i++) {
        pressButton(i)
        if(targetPresses.length === 4){
            break
        }
    }
}
function findGCD (a, b){
    return b === 0 ? a : findGCD(b, a % b);
}

function findLCM (a, b){
    return a*b/findGCD(a,b)
}
main()
let result = targetPresses[0];
for (let i = 1; i < targetPresses.length; i++) {
    result = findLCM(result, targetPresses[i]);
}
console.log('Answer is:',result)



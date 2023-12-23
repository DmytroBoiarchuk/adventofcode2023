const input = require('../input')
const pars = require("./Pars");
let presses = 1000
let [broadCaster, fFMod, conMod, state] = pars(input)
let conModsMemory = {}
let low = false
let high = true
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
let lowPulses = 0;
let highPulses = 0;
function sendPulse(pulse, from, where) {
    pulse? highPulses++ : lowPulses++
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
function processQueue(){
    let queueCopy = queue.slice()
    queue = []
    queueCopy.forEach(send =>{
        sendPulse(send[0],send[1],send[2])
    })
}
function pressButton() {
    lowPulses++
    broadCaster.forEach(module => addToQueue(low,undefined,module))
    while (queue.length !== 0){
        processQueue()
    }
}
function main() {
    setUpConModsMemory()
    for(let i = 0 ; i < presses; i++) {
        pressButton()
    }
}
main()
console.log('Low pulses:',lowPulses,';','High pulses:', highPulses,';','Multiple:', lowPulses*highPulses)
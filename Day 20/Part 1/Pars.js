module.exports = pars = (input) => {
    let broadcaster = [];
    input = input.split('\n')
    input.forEach(x => {
        if(x.split(' ')[0] === 'broadcaster'){
            for(let i = 2;i < x.split(' ').length; i++){
                let p = x.split(' ')[i]
                if(p.indexOf(',') !== -1){
                    broadcaster.push(p.slice(0,-1))
                }else{
                    broadcaster.push(p)
                }
            }
        }
    })
    let flipFlopModules = []
    let conjunctionModules = []
    input.map(row => {
        if(row.charAt(0) === '%'){
            flipFlopModules.push(row)
        }else if(row.charAt(0) === '&'){
            conjunctionModules.push(row)
        }
    })
    let fFMod = {}
    let conMod = {}
    flipFlopModules.forEach(row=> {
        let toPush =[]
        for(let i = 2; i < row.split(' ').length; i++){
            if(row.split(' ')[i].indexOf(',') !== -1){
                toPush.push(row.split(' ')[i].slice(0,-1))
            }else{
                toPush.push(row.split(' ')[i])
            }

        }
        fFMod[row.slice(1).split(' ')[0]] = [...toPush]
    })
    conjunctionModules.forEach(row=> {
        let toPush =[]
        for(let i = 2; i < row.split(' ').length; i++){
            if(row.split(' ')[i].indexOf(',') !== -1){
                toPush.push(row.split(' ')[i].slice(0,-1))
            }else{
                toPush.push(row.split(' ')[i])
            }
        }
        conMod[row.slice(1).split(' ')[0]] = [...toPush]
    })
    let state = flipFlopModules.map( m => [m.slice(1).split(' ')[0], false])
     state = state.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

    return [broadcaster, fFMod, conMod, state]
}

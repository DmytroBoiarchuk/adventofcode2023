/// sorry for unreadable code :(

let input = require('../input')
let example = '32T3K 765\n' +
    'T55J5 684\n' +
    'KK677 28\n' +
    'KTJJT 220\n' +
    'QQQJA 483'
let cardSet = input.split('\n').map(hand => hand.split(' ')).map(set =>
    [set[0], parseInt(set[1])]
)
const cardValues = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'T': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
    'J': 1
};

let GeneralArr = []
let fiveOfAKindArr = []
let fourOfAKindArr = []
let fullHouseArr = []
let threeOfAKindArr = []
let twoPairArr = []
let onePairArr = []
let jokerArr = []
function findJokers () {
    for (let i = 0; i < cardSet.length; i++) {

        if(cardSet[i][0].indexOf('J') !== -1) {
            jokerArr.push(cardSet[i])
            if((cardSet[i][0].split('J').length -1) === 5){
                fiveOfAKindArr.push(cardSet[i])
            }else if((cardSet[i][0].split('J').length -1) === 4){
                fiveOfAKindArr.push(cardSet[i])
            }else if((cardSet[i][0].split('J').length -1) === 3){
                let done = false
                for(key in cardValues){
                    if(!done) {
                        if (key !== 'J' && (cardSet[i][0].split(key).length - 1) === 2) {
                            fiveOfAKindArr.push(cardSet[i])
                            done = true
                        }
                    }
                }
                if(!done){
                    fourOfAKindArr.push(cardSet[i])
                    done = true
                }
            }else if((cardSet[i][0].split('J').length -1) === 2){
                let done = false;
                for(key in cardValues){
                    if( key !== 'J' && (cardSet[i][0].split(key).length -1) === 3){
                        fiveOfAKindArr.push(cardSet[i])
                        done = true
                    }else if(key !== 'J' && (cardSet[i][0].split(key).length -1) === 2){
                        fourOfAKindArr.push(cardSet[i])
                        done = true
                    }
                }
                if(!done){
                    threeOfAKindArr.push(cardSet[i])
                    done = true
                }
            }else if((cardSet[i][0].split('J').length -1) === 1){
                let done = false;
                for(key in cardValues){
                    if( key !== 'J' && (cardSet[i][0].split(key).length -1) === 4){
                        fiveOfAKindArr.push(cardSet[i])
                        done = true
                    }else if( key !== 'J' && (cardSet[i][0].split(key).length -1) === 3){
                        fourOfAKindArr.push(cardSet[i])
                        done = true
                    }else if( key !== 'J' && (cardSet[i][0].split(key).length -1) === 2){
                        for (key2 in cardValues) {
                            if(key !== key2 && !done && key2 !== 'J' && (cardSet[i][0].split(key2).length -1) === 2) {
                                fullHouseArr.push(cardSet[i])
                                done = true
                            }
                        }

                        if(!done){
                            threeOfAKindArr.push(cardSet[i])
                            done = true
                        }
                    }


                }
                if(!done) {
                    onePairArr.push(cardSet[i])
                    done = true
                }
            }
        }
    }
}

function fiveOfAKind (tempHolder) {
    for (let i = 0 ; i < cardSet.length; i++){
        for(key in cardValues){
            if((cardSet[i][0].split(key).length -1) === 5){
                tempHolder.push([cardSet[i][0], cardSet[i][1]])
            }
        }
    }
}

function fourOfAKind (tempHolder) {
    for (let i = 0 ; i < cardSet.length; i++){
        for(key in cardValues){
            if((cardSet[i][0].split(key).length -1) === 4){
                tempHolder.push([cardSet[i][0], cardSet[i][1]])
            }
        }
    }
}

function fullHouse (tempHolder) {
    for (let i = 0; i < cardSet.length; i++) {
        for (key in cardValues) {
            if ((cardSet[i][0].split(key).length - 1) === 3) {
                for (key2 in cardValues) {
                    if (key2 !== key) {
                        if ((cardSet[i][0].split(key2).length - 1) === 2) {
                            tempHolder.push([cardSet[i][0], cardSet[i][1]])
                        }
                    }
                }
            }
        }
    }

}
function threeOfAKind ( tempHolder) {
    for (let i = 0 ; i < cardSet.length; i++){
        for(key in cardValues){
            if((cardSet[i][0].split(key).length -1) === 3){
                tempHolder.push([cardSet[i][0], cardSet[i][1]])
            }
        }
    }
}
function twoPair ( tempHolder) {
    for (let i = 0; i < cardSet.length; i++) {
        let done = false;
        for (key in cardValues) {
            if ((cardSet[i][0].split(key).length - 1) === 2) {
                for (key2 in cardValues) {
                    if (key2 !== key && !done) {
                        if ((cardSet[i][0].split(key2).length - 1) === 2) {
                            tempHolder.push([cardSet[i][0], cardSet[i][1]])
                            done = true
                        }
                    }
                }
            }
        }
    }

}
function onePair (tempHolder) {
    for (let i = 0 ; i < cardSet.length; i++){
        for(key in cardValues){
            if((cardSet[i][0].split(key).length -1) === 2){
                tempHolder.push([cardSet[i][0], cardSet[i][1]])
            }
        }
    }
}

function compareHands(hand1, hand2) {
    for (let i = 0; i < hand1[0].length; i++) {
        const value1 = cardValues[hand1[0][i]];
        const value2 = cardValues[hand2[0][i]];
        if (value1 !== value2) {
            return value2 - value1;
        }
    }

    return 0;
}
function cleanArray (arr) {
    for (let i = 0; i < arr.length; i++) {
        const index = cardSet.findIndex(item => item[0] === arr[i][0]);
        if (index !== -1) {
            cardSet.splice(index, 1);
        }
    }
}

findJokers()
cleanArray(jokerArr)
fiveOfAKind(fiveOfAKindArr)
cleanArray(fiveOfAKindArr)
fourOfAKind(fourOfAKindArr)
cleanArray(fourOfAKindArr)
fullHouse( fullHouseArr)
cleanArray(fullHouseArr)
threeOfAKind(threeOfAKindArr)
cleanArray(threeOfAKindArr)
twoPair( twoPairArr)
cleanArray (twoPairArr)
onePair( onePairArr)
cleanArray (onePairArr)
GeneralArr = GeneralArr.concat(fiveOfAKindArr.sort(compareHands));
GeneralArr = GeneralArr.concat(fourOfAKindArr.sort(compareHands));
GeneralArr = GeneralArr.concat(fullHouseArr.sort(compareHands));
GeneralArr = GeneralArr.concat(threeOfAKindArr.sort(compareHands));
GeneralArr = GeneralArr.concat(twoPairArr.sort(compareHands));
GeneralArr = GeneralArr.concat(onePairArr.sort(compareHands));
GeneralArr = GeneralArr.concat(cardSet.sort(compareHands));
let sum = 0
for (let i = 0; i < GeneralArr.length; i++){
    sum += (GeneralArr[i][1] * (GeneralArr.length - i))
}
console.log(sum)

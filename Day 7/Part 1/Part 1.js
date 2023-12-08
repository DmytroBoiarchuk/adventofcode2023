let input = require('../input')
let cardSet = input.split('\n').map(hand => hand.split(' ')).map(set =>
    [set[0], parseInt(set[1])]
)
const cardValues = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'J': 11,
    'T' : 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2
};

let GeneralArr = []
let tempHolder = []
function numberOfAKind (number) {
    for (let i = 0 ; i < cardSet.length; i++){
        for(key in cardValues){
            if((cardSet[i][0].split(key).length -1) === number){
                tempHolder.push([cardSet[i][0], cardSet[i][1]])
            }
        }
    }
    GeneralArr = GeneralArr.concat(tempHolder.sort(compareHands));
    tempHolder = []
}
function fullHouseOrTwoPair (number) {
        for (let i = 0; i < cardSet.length; i++) {
            let done = false;
            for (key in cardValues) {
                if ((cardSet[i][0].split(key).length - 1) === number) {
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

    GeneralArr = GeneralArr.concat(tempHolder.sort(compareHands));
    tempHolder = []
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
function cleanArray () {
    for (let i = 0; i < GeneralArr.length; i++) {
        const index = cardSet.findIndex(item => item[0] === GeneralArr[i][0]);
        if (index !== -1) {
            cardSet.splice(index, 1);
        }
    }
}
numberOfAKind(5)
cleanArray()
numberOfAKind(4)
fullHouseOrTwoPair(3)
cleanArray()
numberOfAKind(3)
fullHouseOrTwoPair(2)
cleanArray ()
numberOfAKind(2)
cleanArray ()
GeneralArr = GeneralArr.concat(cardSet.sort(compareHands));
console.log(GeneralArr);
let sum = 0
for (let i = 0; i < GeneralArr.length; i++){
    sum += GeneralArr[i][1] * (GeneralArr.length - i)
}
console.log(sum)




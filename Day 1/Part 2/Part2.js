let data = require('../Part 1/input')
const digitTransliteration = ['one', 'two','three', 'four', 'five', 'six',
    'seven','eight', 'nine']
const digitTranslation = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven:7,
    eight: 8,
    nine: 9
}
function countMagicNumber(data) {
    let parsedData = data.split('\n');
    let resultsArr = parsedData.map((singleRow) => {
        let firstFound = false;
        let firstInt;
        let lastInt;
        for(let i=0; i< singleRow.length; i++){
            if(!isNaN(singleRow[i])){
                if(!firstFound) {
                    firstInt = +singleRow[i];
                    firstFound = true;
                }
                lastInt = singleRow[i];
            }
        }
        let indexOfLastIntByWord = 0;
        let lastIntByWord;
        for(let i=0;i<digitTransliteration.length; i++){
            if(singleRow.indexOf(digitTransliteration[i]) !==-1 && singleRow.lastIndexOf(digitTransliteration[i]) > indexOfLastIntByWord){
                indexOfLastIntByWord = singleRow.lastIndexOf(digitTransliteration[i]);
                lastIntByWord = i + 1;
            }
            if(singleRow.indexOf(digitTransliteration[i]) !==-1 && singleRow.indexOf(firstInt) > singleRow.indexOf(digitTransliteration[i])){
                firstInt = digitTransliteration[i];
            }
        }
        if(lastIntByWord !== undefined && singleRow.lastIndexOf(lastInt) < indexOfLastIntByWord){
            lastInt = lastIntByWord;
        }
        if(typeof firstInt === "string"){
            firstInt = digitTranslation[firstInt.toString()]
        }
        return parseInt(firstInt.toString() + lastInt.toString());
    })
    return resultsArr.reduce(function (result, singleElement) {
        return result + singleElement;
    });
}
console.log(countMagicNumber(data));


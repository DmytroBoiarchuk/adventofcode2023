const data = require('../input')
function countMagicNumber(data) {
    let parsedData = data.split('\n');
    let resultsArr = parsedData.map((singleRow) => {
        let firstFound = false;
        let firstInt;
        let lastInt;
        for(let i=0; i< singleRow.length; i++){
            if(!isNaN(singleRow[i])){
                if(!firstFound) {
                    firstInt = singleRow[i];
                    firstFound = true;
                }
                lastInt = singleRow[i];
            }
        }
        return parseInt(firstInt + lastInt);
    })
    return resultsArr.reduce(function (result, singleElement) {
        return result + singleElement;
    });
}
console.log(countMagicNumber(data));

fs = require('fs')

function fileToArray(filename) {
    return fs.readFileSync(filename).toString()
    .split("\n")
}

function printGrid(grid) {
    grid.forEach(row => console.log(row.join("")))
}

function extractNumbersFromString(str) {
    return Array.from(str.matchAll(/[-0-9]+/g)).map(m => parseInt(m[0]))
}

module.exports = {
    fileToArray: fileToArray,
    printGrid: printGrid,
    extractNumbersFromString: extractNumbersFromString
}
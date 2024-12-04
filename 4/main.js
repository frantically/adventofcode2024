utils = require('../utils.js')

input = utils.fileToArray('input.txt').map(line => line.split(""))

function lookForXmas(row, col, rowInc, colInc, data) {
    if(row+3*rowInc < 0 || row+3*rowInc >= data.length || col+3*colInc < 0 || col+3*colInc >= data[0].length) {
        return false
    }
    return data[row][col] == "X" && data[row+rowInc][col+colInc] == "M" && data[row+rowInc*2][col+colInc*2] == "A" && data[row+rowInc*3][col+colInc*3] == "S"
}

function lookForMasCross(row, col, data) {
    if(data[row][col] == "A") {
        axis1 = [data[row-1][col-1], data[row][col], data[row+1][col+1]].sort().join('')
        axis2 = [data[row+1][col-1], data[row][col], data[row-1][col+1]].sort().join('')
        return axis1 == "AMS" && axis2 == "AMS"
    } else {
        return false
    }
}

validDirections = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]
part1 = 0
for(row=0;row<input.length;row++) {
    for(col=0;col<input[0].length;col++) {
        found = validDirections.map(direction => lookForXmas(row, col, direction[0], direction[1], input)).filter(x => x).length
        part1 += found
    }
}

console.log(`Part 1: ${part1}`)

part2 = 0
for(row=1;row<input.length-1;row++) {
    for(col=1;col<input[0].length-1;col++) {
        if(lookForMasCross(row, col, input)) {
            part2++
        }
    }
}

console.log(`Part 2: ${part2}`)
utils = require('../utils.js')

input = utils.fileToArray('input.txt').map(line => line.split(""))

function findAntiNodes(locations, maxCol, maxRow, resonantFrequency) {
    var antiNodes = []
    if(resonantFrequency) {
        antiNodes = antiNodes.concat(locations)
    }
    locations = [...locations]
    while(locations.length > 0) {
        location1 = locations.pop()
        locations.forEach(location2 => {
            colDiff = location2[0]-location1[0]
            rowDiff = location2[1]-location1[1]
            if(resonantFrequency) {
                for(i=1;i<=Math.max(maxCol, maxRow);i++) {
                    antiNodes.push([location2[0] + i*colDiff, location2[1] + i*rowDiff])
                    antiNodes.push([location1[0] - i*colDiff, location1[1] - i*rowDiff])
                }
            } else {
                antiNodes.push([location2[0] + colDiff, location2[1] + rowDiff])
                antiNodes.push([location1[0] - colDiff, location1[1] - rowDiff])
            }
        })
    }
    return antiNodes
}

function antiNodeCount(resonantFrequency) {
    var antiNodes = []
    for (const [type, locations] of Object.entries(antennas)) {
        antiNodes = antiNodes.concat(findAntiNodes(locations, input.length, input[0].length, resonantFrequency))
    }
    antiNodes = antiNodes.filter(an => an[0] >= 0 && an[0] < input.length && an[1] >= 0 && an[1] < input[0].length)
    return Array.from(new Set([...antiNodes.map(n => n.join(","))])).length
}

var antennas = {}
for(row=0;row<input.length;row++) {
    for(col=0;col<input[0].length;col++) {
        location = input[col][row]
        if(location != ".") {
            locationInfo = [col, row]
            antennas[location] = antennas[location] ? antennas[location].concat([locationInfo]) : [locationInfo]
        }
    }
}

part1 = antiNodeCount(false, input)
console.log(`Part 1: ${part1}`)

part2 = antiNodeCount(true, input)
console.log(`Part 1: ${part2}`)
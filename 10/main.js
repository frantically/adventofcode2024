utils = require('../utils.js')

input = utils.fileToArray('input.txt').map(line => line.split("").map(n => parseInt(n)))

function walkTrails(trailSoFar, map) {
    directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    var lastPoint = trailSoFar[trailSoFar.length-1]
    var completeTrails = []
    for(direction of directions) {
        var nextPoint = [lastPoint[0]+direction[0], lastPoint[1]+direction[1]]
        if(map[nextPoint[0]] && map[nextPoint[0]][nextPoint[1]] == map[lastPoint[0]][lastPoint[1]]+1) {
            var newTrail = [...trailSoFar]
            newTrail.push(nextPoint)
            if(map[nextPoint[0]][nextPoint[1]] == 9 && newTrail.length == 10) {
                completeTrails.push(newTrail)
            } else {
                completeTrails = completeTrails.concat(walkTrails(newTrail, map))
            }
        }
    }
    return completeTrails
}

function scoreTrails(input, countPeaks) {
    score = 0
    for(row=0;row<input.length;row++) {
        for(col=0;col<input[0].length;col++) {
            if(input[row][col] == 0) {
                var trails = walkTrails([[row, col]], input)
                if(countPeaks) {
                    score += Array.from(new Set(trails.map(t => t[t.length-1].join(",")))).length
                } else {
                    score += trails.length
                }
            }
        }
    }
    return score
}

part1 = scoreTrails(input, true)
console.log(`Part 1: ${part1}`)

part2 = scoreTrails(input, false)
console.log(`Part 2: ${part2}`)

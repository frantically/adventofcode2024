utils = require('../utils.js')

input = utils.fileToArray('input.txt')
    .map(utils.extractNumbersFromString)

function getDiffs(levels) {
    result = []
    for(i = 1;i<levels.length;i++) {
        result.push(levels[i-1] - levels[i])
    }
    return result
}

function safeLevels(levels) {
    diffs = getDiffs(levels)
    tooLowOrTooHigh = diffs.filter(diff => diff == 0 || Math.abs(diff) > 3).length
    declines = diffs.filter(diff => diff < 0).length
    increases = diffs.filter(diff => diff > 0).length
    return tooLowOrTooHigh == 0 && !(declines > 0 && increases > 0)
}

function safeLevelsWithProblemDampener(levels) {
    validCombinations = [levels]
    for(i=0;i<levels.length;i++) {
        validCombinations.push([...levels.slice(0, i), ...levels.slice(i+1)])
    }
    numberOfSafeCombinations = validCombinations.map(safeLevels).filter(safe => safe).length
    return numberOfSafeCombinations > 0
}

part1 = input.map(safeLevels).filter(safety => safety).length
console.log(`Part 1: ${part1}`)

part2 = input.map(safeLevelsWithProblemDampener).filter(safety => safety).length
console.log(`Part 2: ${part2}`)
utils = require('../utils.js')

input = utils.fileToArray('input.txt').join("")

function multiply(input) {
    matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)
    return matches.map(match => parseInt(match[1]) * parseInt(match[2])).reduce((a, n) => a + n, 0)    
}

part1 = multiply(input)
console.log(`Part 1: ${part1}`)

input = "do()" + input
doMatches = input.matchAll(/do\(\).*?(don't\(\)|$)/g)
part2 = multiply(doMatches.map(m => m[0]).toArray().join(""))
console.log(`Part 2: ${part2}`)
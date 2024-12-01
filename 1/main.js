utils = require('../utils.js')

input = utils.fileToArray('input.txt')
    .map(utils.extractNumbersFromString)

team1 = input.map(locationIds => locationIds[0]).sort()
team2 = input.map(locationIds => locationIds[1]).sort()

part1 = 0
while(team1.length > 0) {
    part1 += Math.abs(team1.pop() - team2.pop())
}
console.log(`Part 1: ${part1}`)

team1 = input.map(locationIds => locationIds[0]).sort()
team2 = input.map(locationIds => locationIds[1]).sort()

team2Frequencies = {}
for (num of team2) {
    team2Frequencies[num] = team2Frequencies[num] ? team2Frequencies[num] + 1 : 1
}

part2 = 0
for(num of team1) {
    part2 += team2Frequencies[num] ? num * team2Frequencies[num] : 0
}
console.log(`Part 2: ${part2}`)

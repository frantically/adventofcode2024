utils = require('../utils.js')

stones = utils.fileToArray('input.txt')[0].split(" ").map(n => parseInt(n))

cache = {}

function blinkStone(stone, count) {
    if(count == 0) {
        return 1
    }
    var cacheKey = `${stone}_${count}`
    var stoneStr = stone.toString()
    if(cache[cacheKey]) {
        return cache[cacheKey]
    } else {
        var result = null
        if(stone == 0) {
            result = blinkStone(1, count-1)
        } else if(stoneStr.length % 2 == 0) {
            result = blinkStone(parseInt(stoneStr.slice(0, stoneStr.length / 2)), count-1)
                + blinkStone(parseInt(stoneStr.slice(stoneStr.length / 2, stoneStr.length)), count-1)
        } else {
            result = blinkStone(stone * 2024, count-1)
        }
        cache[cacheKey] = result
        return result
    }
}

part1 = stones.map(n => blinkStone(n, 25)).reduce((a,c) => a+c, 0)
console.log(`Part 1: ${part1}`)

part2 = stones.map(n => blinkStone(n, 75)).reduce((a,c) => a+c, 0)
console.log(`Part 2: ${part2}`)
const { printGrid } = require('../utils.js')

utils = require('../utils.js')

input = utils.fileToArray('input.txt').map(utils.extractNumbersFromString)

gridCols = 101
gridRows = 103

function print(cols, rows, locations) {
    result = []
    for(x=0;x<cols;x++) {
        var row = ""
        for(y=0;y<rows;y++) {
            row += locations.filter(loc => loc[0] == x && loc[1] == y).length > 0 ? "X" : " "
        }
        console.log(row)
    }
}

function moveRobots(robots, count) {
    return input
    .map(robot => [(robot[0] + count * robot[2])%gridCols, (robot[1] + count * robot[3] + gridRows)%gridRows], robots[2], robots[3])
    .map(robot => [robot[0] < 0 ? robot[0]+gridCols : robot[0], robot[1] < 0 ? robot[1]+gridRows : robot[1], robot[2], robot[3]])
}

function checkForTree(robots, iteration) {
    maxOnAnyRow = Math.max(...robots.reduce((acc, robot) => acc.set(robot[1], (acc.get(robot[1]) || 0) + 1), new Map()).values())
    if(maxOnAnyRow > 30) {
        console.log(`Candidate: ${iteration}`)
        print(gridCols, gridRows, robots)
    }
}

endLocations = moveRobots(input, 100)
    
gridColMiddle = Math.floor(gridCols / 2)
gridRowMiddle = Math.floor(gridRows / 2)

quadrants = endLocations.map(location => {
    if(location[0] < gridColMiddle) {
        if(location[1] < gridRowMiddle) {
            return 1
        } else if (location[1] > gridRowMiddle) {
            return 3
        }
    } else if(location[0] > gridColMiddle) {
        if(location[1] < gridRowMiddle) {
            return 2
        } else if (location[1] > gridRowMiddle) {
            return 4
        }
    }
    return null
})

quadrantCounts = quadrants.filter(q => q != null).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
part1 = quadrantCounts.values().reduce((a, c) => a*c, 1)

console.log(`Part 1: ${part1}`)

for(i=0;i<10000;i++) {
    checkForTree(moveRobots(input, i), i)
}

console.log(`Part 2: Look for a tree in the output!`)
const { rootCertificates } = require('tls')

utils = require('../utils.js')

grid = utils.fileToArray('input.txt').map(line => line.split(""))

DIRECTIONS = [[1, 0], [0, 1], [-1, 0], [0, -1]]

function locationKey(row, col) {
    return `${row}/${col}`
}

function findRegion(row, col, grid, regionSoFar) {
    crop = grid[row][col]
    regionSoFar.crop = crop
    regionSoFar.plots.push(locationKey(row, col))    
    DIRECTIONS.forEach(direction => {
        nextRow = row+direction[0]
        nextCol = col+direction[1]
        nextLocationKey = locationKey(nextRow, nextCol)
        if(grid[nextRow] && grid[nextRow][nextCol] == crop) {
            if(!regionSoFar.plots.includes(nextLocationKey)) {
                findRegion(nextRow, nextCol, grid, regionSoFar)
            }
        } else {
            perimeterLocationKey = locationKey(row+direction[0]*0.1, col+direction[1]*0.1)
            regionSoFar.perimeter.push(perimeterLocationKey)
        }
    })
    return regionSoFar
}

function perimeterSides(perimeter) {
    perimeter = perimeter.sort().map(p => p.split("/").map(n => parseFloat(n)))
    sides = perimeter.map(p => [p])
    
    previousLength = -1
    while(previousLength != sides.length) {
        previousLength = sides.length
        for(side1 of sides) {
            for(side2 of sides) {
                if(side1 != side2) {
                    for(node1 of side1) {
                        for(node2 of side2) {
                            rowDiff = Math.abs(node2[0]-node1[0])
                            colDiff = Math.abs(node2[1]-node1[1])
                            if(rowDiff + colDiff == 1) {
                                while(side2.length > 0) {
                                    side1.push(side2.pop())
                                }
                            }
                        }
                    }
                }
            }
        }
        sides = sides.filter(s => s.length > 0)
    }
    return sides.length
}

visited = []
regions = []
for(row=0;row<grid.length;row++) {
    for(col=0;col<grid[0].length;col++) {
        if(!visited.includes(locationKey(row, col))) {
            region = findRegion(row, col, grid, {plots: [], perimeter: []})
            regions.push(region)
            visited = visited.concat(region.plots)
        }
    }
}

part1 = regions.map(region => region.plots.length * region.perimeter.length).reduce((a, c) => a+c, 0)
console.log(`Part 1: ${part1}`)

part2 = regions.map(region => region.plots.length * perimeterSides(region.perimeter)).reduce((a, c) => a+c, 0)
console.log(`Part 2: ${part2}`)
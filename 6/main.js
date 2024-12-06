utils = require('../utils.js')

input = utils.fileToArray('input.txt').map(line => line.split(""))
console.log(input)

function walkPath(grid) {
    currentCol = 0
    currentRow = 0
    
    for(i=0;i<grid.length;i++) {
        if(grid[i].includes("^")) {
            currentRow = i
            currentCol = grid[i].indexOf("^")
        }
    }
    
    instructions = [[-1, 0], [0, 1], [1, 0], [0, -1]]
    currentInstruction = 0
    
    moves = []
    inBounds = true
    loop = false
    while(inBounds && !loop) {
        grid[currentRow][currentCol] = "X"    
        locationKey = `${currentRow}_${currentRow}_${currentInstruction}` 
        nextRow = currentRow+instructions[currentInstruction][0]
        nextCol = currentCol+instructions[currentInstruction][1]
        if(grid[nextRow] == undefined || grid[nextRow][nextCol] == undefined) {
            inBounds = false
        } else {
            nextLocation = grid[nextRow][nextCol]
            move = `${currentRow} ${currentCol} -> ${nextRow} ${nextCol} (${nextLocation})`
            if(moves.includes(move)) {
                loop = true
                continue
            } else {
                moves.push(move)
            }
            if(nextLocation == "#") {
                currentInstruction = (currentInstruction+1) % instructions.length
            } else {
                currentCol = nextCol
                currentRow = nextRow
            }
        }
    }
    return loop ? -1 : grid.map(row => row.filter(val => val == "X").length).reduce((a, c) => a+c, 0)
}

function cloneGrid(grid) {
    return input.map(row => [...row])
}

utils.printGrid(input)

part1 = walkPath(cloneGrid(input))
console.log(`Part 1: ${part1}`)

part2 = 0
for(row =0;row<input.length;row++) {
    for(col = 0;col<input[0].length;col++) {
        console.log(`Doing ${col} ${row}`)
        grid = cloneGrid(input)
        grid[row][col] = "#"
        if(walkPath(grid) < 0) {
            part2++
        }
    }
}

console.log(`Part 2: ${part2}`)
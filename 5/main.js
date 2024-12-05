utils = require('../utils.js')

input = utils.fileToArray('input.txt')

rules = input.filter(line => line.includes("|")).map(utils.extractNumbersFromString)
instructions = input.filter(line => line.includes(",")).map(utils.extractNumbersFromString)

function correctlyOrderedInstructions(instructions) {
    for(i = 0;i<instructions.length-1;i++) {
        page = instructions[i]
        for(rule of rules) {
            if(page == rule[1] && instructions[i+1] == rule[0]) {
                return false
            }
        }
    }
    return true
}

function correctInstructions(instructions) {
    for(i = 0;i<instructions.length-1;i++) {
        page = instructions[i]
        for(rule of rules) {
            if(page == rule[1] && instructions[i+1] == rule[0]) {
                modifiedInstructions = [...instructions]
                modifiedInstructions[i+1] = rule[1]
                modifiedInstructions[i] = rule[0]
                return correctInstructions(modifiedInstructions)
            }
        }
    }
    return instructions
}

part1 = instructions.filter(correctlyOrderedInstructions)
    .map(instruction => instruction[Math.floor(instruction.length/2)])
    .reduce((a, c) => a+c, 0)

console.log(`Part 1: ${part1}`)

part2 = instructions.filter(i => !correctlyOrderedInstructions(i))
    .map(correctInstructions)
    .map(instruction => instruction[Math.floor(instruction.length/2)])
    .reduce((a, c) => a+c, 0)

console.log(`Part 2: ${part2}`)
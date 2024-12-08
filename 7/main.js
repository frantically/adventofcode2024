utils = require('../utils.js')


function operatorCombinations(n, variables) {
    result = [...variables].map(x => [x])
    while(n > 1) {
        newResult = []
        variables.forEach(v => result.forEach(r => newResult.push([v].concat(r))))
        result = newResult
        n--
    }
    return result
}

function evaluate(operators, input) {
    testsWithMatch = 0
    for(test of input) {
        expectedResult = test.shift()
        combinations = operatorCombinations(test.length-1, operators)
        equations = combinations.map(combination => {
            currentTest = [...test]
            equation = []
            while(currentTest.length > 1) {
                equation.push(currentTest.shift())
                equation.push(combination.shift())
            }
            equation.push(currentTest.shift())
            return equation
        })
        equations.forEach(equation => {
            while(equation.length > 2) {
                x = equation.shift()
                op = equation.shift()
                y = equation.shift()
                if(op == "||") {
                    num = parseInt(`${x}${y}`)
                } else {
                    num = eval(`${x} ${op} ${y}`)
                }
                equation.unshift(num)
            }
        })
        
        if(equations.filter(result => result == expectedResult).length > 0) {
            testsWithMatch += expectedResult
        }
    }
    return testsWithMatch
}

file = "input.txt"

input = utils.fileToArray(file).map(utils.extractNumbersFromString)
part1 = evaluate(["+", "*"], input)
console.log(`Part 1: ${part1}`)

input = utils.fileToArray(file).map(utils.extractNumbersFromString)
part2 = evaluate(["+", "*", "||"], input)
console.log(`Part 2: ${part2}`)
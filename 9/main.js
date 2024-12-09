utils = require('../utils.js')

function addToDiskMap(diskMap, content, n) {
    for(i=0;i<n;i++) {
        diskMap.push(content)
    }
}
function moveFilesToStart() {
    input = utils.fileToArray('input.txt')[0].split("").map(n => parseInt(n))

    fileId = 0
    diskMap = []
    while(input.length > 0) {
        addToDiskMap(diskMap, fileId, input.shift())
        addToDiskMap(diskMap, null, input.shift())
        fileId++
    }
    
    currentStart = 0
    currentEnd = diskMap.length - 1
    
    while(currentStart <= currentEnd) {
        while(diskMap[currentEnd] == null) {
            currentEnd--
        }
        while(diskMap[currentStart] != null) {
            currentStart++
        }
        if(currentEnd > currentStart) {
            diskMap[currentStart] = diskMap[currentEnd]
            diskMap[currentEnd] = null
        }
    }
    part1 = diskMap.map((x, i) => x == null ? 0 : x * i).reduce((a, c) => a+c, 0)
    console.log(`Part 1: ${part1}`)
}

moveFilesToStart()

function defrag() {
    input = utils.fileToArray('input.txt')[0].split("").map(n => parseInt(n))
    diskMap2 = []
    fileId = 0
    while(input.length > 0) {
        diskMap2.push({"fileId": fileId++, "size": input.shift()})
        diskMap2.push({"fileId": null, "size": input.shift()})
    }

    currentStart = 0

    currentEnd = diskMap2.length -1
    while(currentEnd > 1) {
        while(diskMap2[currentEnd].fileId == null) {
            currentEnd--
        }
        toMove = diskMap2[currentEnd]
        for(i = 0;i<currentEnd;i++) {
            if(diskMap2[i].fileId == null && diskMap2[i].size >= toMove.size) {
                spaceLeft = diskMap2[i].size - toMove.size
                diskMap2[i] = toMove
                if(spaceLeft > 0) {
                    diskMap2.splice(i+1, 0, {"fileId": null, "size": spaceLeft})
                    currentEnd++
                }
                diskMap2[currentEnd] = {"fileId": null, "size": toMove.size}
                break
            }
        }
        currentEnd--
    }

    part2 = 0
    i = 0
    while(diskMap2.length > 0) {
        file = diskMap2.shift()
        for(j=0;j<file.size;j++) {
            part2 += i * file.fileId
            i++
        }
    }

    console.log(`Part 2: ${part2}`)
}

defrag()
const fs = require("fs")
const map = fs.readFileSync("input.txt", 'utf-8').split("\n").map((line) => line.split(""))

let limit = [map.length, map[0].length];

let guardPosition = null;
let direction = null;
let positions = [];

map.forEach((line, _y) => {
    if (guardPosition === null) {
        const _x = line.findIndex((l) => {
            if (l === '^') {
                direction = '^'
                return true;
            } else if (l === '>') {
                direction = '>';
                return true;
            } else if (l === '<') {
                direction = '<'
                return true
            } else if (l === 'v') {
                direction = 'v';
                return true;
            }
        })
        if (_x === -1) return null;

        guardPosition = [_y, _x]
        positions.push([_y, _x])
    }
})

let isInside = true
while (isInside) {
    // console.log('guardPosition ', guardPosition)
    // console.log('direction ', direction)
    if (direction === '^') {
        const _nextGuardPosition = [guardPosition[0] - 1, guardPosition[1]];
        if (overTheMap(_nextGuardPosition)) {
            isInside = false
        } else {
            const symbol = map[_nextGuardPosition[0]][_nextGuardPosition[1]]
            if (symbol === '#') {
                direction = '>'
            } else {
                guardPosition = _nextGuardPosition
                positions.push([_nextGuardPosition[0], _nextGuardPosition[1]])
            }
        }
    } else if (direction === '>') {
        const _nextGuardPosition = [guardPosition[0], guardPosition[1] + 1];
        if (overTheMap(_nextGuardPosition)) {
            isInside = false
        } else {
            const symbol = map[_nextGuardPosition[0]][_nextGuardPosition[1]]
            if (symbol === '#') {
                direction = 'v'
            } else {
                guardPosition = _nextGuardPosition
                positions.push([_nextGuardPosition[0], _nextGuardPosition[1]])
            }
        }


    } else if (direction === 'v') {
        const _nextGuardPosition = [guardPosition[0] + 1, guardPosition[1]];
        if (overTheMap(_nextGuardPosition)) {
            isInside = false
        } else {
            if (map[_nextGuardPosition[0]][_nextGuardPosition[1]] === '#') {
                direction = '<'
            } else {
                guardPosition = _nextGuardPosition
                positions.push([_nextGuardPosition[0], _nextGuardPosition[1]])
            }
        }


    } else if (direction === '<') {
        const _nextGuardPosition = [guardPosition[0], guardPosition[1] - 1];
        if (overTheMap(_nextGuardPosition)) {
            isInside = false
        } else {
            if (map[_nextGuardPosition[0]][_nextGuardPosition[1]] === '#') {
                direction = '^'
            } else {
                guardPosition = _nextGuardPosition
                positions.push([_nextGuardPosition[0], _nextGuardPosition[1]])
            }
        }


    }
}

let set  = new Set(positions.map(JSON.stringify));
let arr2 = Array.from(set).map(JSON.parse);
console.log(arr2.length)

function overTheMap(_pos) {
    return _pos[0] < 0 || _pos[0] > (limit[0] - 1) || _pos[1] < 0 || _pos[1] > (limit[1] - 1)
}
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf-8').trim().split("\n")

const expandedInput = input.map((_i) => _i.split(''))

const inputLength = input.length;
let xmasCount = 0;
let masCount_2 = 0

const isMas = (word) => {
    if (word === 'MAS' || word === 'SAM') {
        return true
    }
}

input.forEach((_row, _rowIndex) => {
    const chars = _row.split('')
    chars.forEach((_char, _charIndex) => {
        if (_char === 'X') {

            _row.substring(_charIndex, _charIndex + 4) === 'XMAS' ? xmasCount++ : null;

            // diagonal bottom right
            if (chars.length - _charIndex >= 4 && inputLength - _rowIndex >= 4) {
                let isXMAS = true
                'XMAS'.split('').forEach((_r, index) => {
                    if (isXMAS) {
                        isXMAS = _r === expandedInput[_rowIndex + index][_charIndex + index]
                    }
                })

                if (isXMAS) {
                    xmasCount++
                }
            }

            // vertical bottom
            if (inputLength - _rowIndex >= 4) {
                let isXMAS = true
                'XMAS'.split('').forEach((_r, index) => {
                    if (isXMAS) {
                        isXMAS = _r === expandedInput[_rowIndex + index][_charIndex]
                    }
                })

                if (isXMAS) {
                    xmasCount++
                }
            }

            // diagonal bottom left
            if (_charIndex >= 3 && inputLength - _rowIndex >= 4) {
                let isXMAS = true
                'XMAS'.split('').forEach((_r, index) => {
                    if (isXMAS) {
                        isXMAS = _r === expandedInput[_rowIndex + index][_charIndex - index]
                    }
                })

                if (isXMAS) {
                    xmasCount++
                }
            }

            // horizontal backward
            if (_charIndex >= 3) {
                _row.substring(_charIndex - 3, _charIndex + 1) === 'SAMX' ? xmasCount++ : null;
            }

            // diagonal top left
            if (_charIndex >= 3 && _rowIndex >= 3) {
                let isXMAS = true
                'XMAS'.split('').forEach((_r, index) => {
                    if (isXMAS) {
                        isXMAS = _r === expandedInput[_rowIndex - index][_charIndex - index]
                    }
                })

                if (isXMAS) {
                    xmasCount++
                }
            }

            // vertical top
            if (_rowIndex >= 3) {
                let isXMAS = true
                'XMAS'.split('').forEach((_r, index) => {
                    if (isXMAS) {
                        isXMAS = _r === expandedInput[_rowIndex - index][_charIndex]
                    }
                })

                if (isXMAS) {
                    xmasCount++
                }
            }

            // diagonal top right
            if (chars.length - _charIndex >= 4 && _rowIndex >= 3) {
                let isXMAS = true
                'XMAS'.split('').forEach((_r, index) => {
                    if (isXMAS) {
                        isXMAS = _r === expandedInput[_rowIndex - index][_charIndex + index]
                    }
                })

                if (isXMAS) {
                    xmasCount++
                }
            }
        }

        if (_char === 'A') {
            const firstCross = expandedInput[_rowIndex - 1]?.[_charIndex - 1] + _char + expandedInput[_rowIndex + 1]?.[_charIndex + 1]
            const secondCross = expandedInput[_rowIndex - 1]?.[_charIndex + 1] + _char + expandedInput[_rowIndex + 1]?.[_charIndex - 1]
            if (isMas(firstCross) && isMas(secondCross)) {
                masCount_2++
            }
        }
    })
})

console.log(xmasCount)
console.log(masCount_2)

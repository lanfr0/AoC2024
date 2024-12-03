const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf-8').split("\n")

const regex = /mul\(\d+,\d+\)/g
const getNumbers = /\d+/g

const regex2 = /don't\(\)|mul\(\d+,\d+\)|do\(\)/g

first(input)
second(input)

function first(_input) {
    let multiplied = 0;
    _input.forEach((_i) => {
        const multis = _i.matchAll(regex)

        for (const _m of multis) {
            multiplied += _m[0].match(getNumbers).reduce((state, value) => state * value, 1)
        }

    })

    console.log("first")
    console.log(multiplied)
}


function second(_input) {
    let multiplied = 0;
    let enabled = true;
    _input.forEach((_i) => {
        const multis = _i.matchAll(regex2)

        for (const _m of multis) {
            const action = _m[0];
            if (action.includes("don't()")) {
                enabled = false;
            } else if (action.includes("do()")) {
                enabled = true;
            } else {
                if (enabled) {
                    multiplied += action.match(getNumbers).reduce((state, value) => state * value, 1)
                }
            }
        }

    })

    console.log("second")
    console.log(multiplied)
}

const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf-8').split("\n");

const regex = /\s+/g

let locations1 = []
let locations2 = []

input.forEach((_i) => {
    const content = _i.split(regex);

    if (content.length === 2) {
        locations1.push(Number(content[0]))
        locations2.push(Number(content[1]))

        locations1.sort((a, b) => a - b)
        locations2.sort((a, b) => a - b)
    }
})

let distance = 0
locations1.forEach((_i, index) => {
    distance += Math.abs(_i - locations2[index])
})

let sumOfSimilarities = 0
locations1.forEach((_i) => {
    let _occurences = 0

    locations2.forEach((v) => (v === _i && _occurences++));

    sumOfSimilarities += _i * _occurences
})

console.log(sumOfSimilarities)
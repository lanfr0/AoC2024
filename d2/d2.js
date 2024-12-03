const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf-8').split("\n");

const regex = /\s+/g

firstProblem(input)
secondProblem(input)

function firstProblem(_input) {
    let numberOfSafe = 0

    _input.forEach((_i) => {
        const report = _i.split(regex).map(Number)

        if (isMonotonic(report)) {
            if (!hasDuplicate(report)) {
                if (checkIfSafe(report)) {
                    numberOfSafe++;
                }
            }
        }
    })

    console.log("first")
    console.log(numberOfSafe)
}

function secondProblem(_input) {
    let numberOfSafe = 0

    _input.forEach((_i) => {
        const report = _i.split(regex).map(Number)

        let i = -1;
        let resolved = false
        while (i < report.length) {
            let reportWithTolerance = i === -1 ? report : report.toSpliced(i, 1);

            if (!resolved) {
                if (isMonotonic(reportWithTolerance)) {
                    if (!hasDuplicate(reportWithTolerance)) {
                        if (checkIfSafe(reportWithTolerance)) {
                            numberOfSafe++;
                            resolved = true;
                        }
                    }
                }
            }

            i++;
        }
    })

    console.log("second")
    console.log(numberOfSafe)
}


function isMonotonic(report) {
    let isNonIncreasing = true;
    let isNonDecreasing = true;

    report.forEach((_, index) => {
        if (report[index] > report[index - 1]) {
            isNonIncreasing = false;
        }
        if (report[index] < report[index - 1]) {
            isNonDecreasing = false;
        }
    })
    return isNonIncreasing || isNonDecreasing;
}

function hasDuplicate(report) {
    const duplicates = report.filter((item, index) => report.indexOf(item) !== index);
    return duplicates.length > 0;
}

function checkIfSafe(report) {
    let res = true;

    report.forEach((_level, _index) => {
        if (_index < report.length - 1) {
            const diff = Math.abs(Number(_level) - Number(report[_index + 1]))

            if (diff < 1 || diff > 3) {
                res = false
            }
        }
    })

    return res;
}


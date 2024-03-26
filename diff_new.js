const fs = require('fs');

// Function to recursively compare objects
function compareObjects(obj1, obj2, path = '') {
    let diffs = {};

    for (let key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            let newPath = (path === '') ? key : `${path}.${key}`;

            if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                let nestedDiffs = compareObjects(obj1[key], obj2[key], newPath);
                if (Object.keys(nestedDiffs).length > 0) {
                    diffs[newPath] = nestedDiffs;
                }
            } else {
                if (obj2[key] === undefined) {
                    diffs[newPath] = {
                        old: obj1[key],
                        new: null
                    };
                } else if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
                    diffs[newPath] = {
                        old: obj1[key],
                        new: obj2[key]
                    };
                } else {
                    diffs[newPath] = {
                        old: obj1[key],
                        new: obj2[key],
                        unchanged: true
                    };
                }
            }
        }
    }

    for (let key in obj2) {
        if (obj2.hasOwnProperty(key) && obj1[key] === undefined) {
            let newPath = (path === '') ? key : `${path}.${key}`;
            diffs[newPath] = {
                old: null,
                new: obj2[key]
            };
        }
    }

    return diffs;
}

// Function to compare two JSON files
function compareJSONFiles(file1, file2) {
    const data1 = JSON.parse(fs.readFileSync(file1, 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync(file2, 'utf-8'));

    const diffs = compareObjects(data1, data2);
    return diffs;
}

// File paths
const file1Path = 'file1.json';
const file2Path = 'file2.json';

// Compare JSON files
const differences = compareJSONFiles(file1Path, file2Path);
console.log('Differences:', differences);

// Save differences to a JSON file
const outputFilePath = 'differences.json';
fs.writeFileSync(outputFilePath, JSON.stringify(differences, null, 2));
console.log('Differences saved to', outputFilePath);

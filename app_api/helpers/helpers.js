const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');

async function parseLogFile(filePath) {
    if (!fs.existsSync(filePath)) {
        return {};
    }
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const regex = /^[a-z_]+: [+-]?[0-9]*\.?[0-9]*$/;

    const dataToPlot = {};

    for await (const line of rl) {
        if (regex.test(line)) {
            const splitted = line.split(':');
            const key = splitted[0];
            const value = parseFloat(splitted[1].trim());

            if (dataToPlot.hasOwnProperty(key)) {
                dataToPlot[key].push(value);
            }
            else {
                dataToPlot[key] = [value];
            }
        }
    }
    return dataToPlot;
}

function getCommitAndRepo(source) {
    let commit;
    let repository;
    if (!source.includes('@')) {
        repository = source;
        commit = 'master';
    }
    else {
        [repository, commit] = source.split('@');
    }
    return {
        repository: repository,
        commit: commit
    }
}

function calculateHash(taskObject) {
    return crypto.createHash('sha1').update(JSON.stringify(taskObject)).digest('hex');
}

module.exports = {
    parseLogFile,
    getCommitAndRepo,
    calculateHash,
}

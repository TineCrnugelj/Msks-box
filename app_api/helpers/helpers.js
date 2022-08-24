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

    const lines = [];

    for await (const line of rl) {
        lines.push(line);
    }
    return lines;
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

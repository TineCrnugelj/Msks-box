const fs = require('fs');
const readline = require('readline');

async function parseLogFile(filePath) {
    if (!fs.existsSync(filePath)) {
        return {};
    }
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const regex = /^[a-z_]+: [0-9]*\.?[0-9]*$/;

    const dataToPlot = {};

    for await (const line of rl) {
        if (regex.test(line)) {
            const splitted = line.split(':');
            const key = splitted[0];
            const value = parseFloat(splitted[1].trim());

            if (Object.hasOwn(dataToPlot, key)) {
                dataToPlot[key].push(value);
            }
            else {
                dataToPlot[key] = [value];
            }
        }
    }
    return dataToPlot;
}

module.exports = {
    parseLogFile
}

const parseDate = (dateString) => {
    const splitted = dateString.split('T');
    const date = splitted[0];
    const hour = splitted[1].split('.')[0]
    return `${date}, ${hour}`;
};

module.exports = {
    parseDate,
}
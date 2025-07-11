const normalize = (str) =>
    str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/\s+/g, " ")
        .trim();

const compareStrings = (first, second) => {
    first = first.replace(/\s+/g, '')
    second = second.replace(/\s+/g, '')
    first = normalize(first);
    second = normalize(second);

    if (first === second) return 1; // identical or empty
    if (first.startsWith(second) || second.startsWith(first)) return 1;
    if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string


    let firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
        const bigram = first.substring(i, i + 2);
        const count = firstBigrams.has(bigram)
            ? firstBigrams.get(bigram) + 1
            : 1;

        firstBigrams.set(bigram, count);
    };

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
        const bigram = second.substring(i, i + 2);
        const count = firstBigrams.has(bigram)
            ? firstBigrams.get(bigram)
            : 0;

        if (count > 0) {
            firstBigrams.set(bigram, count - 1);
            intersectionSize++;
        }
    }

    return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

export default compareStrings;
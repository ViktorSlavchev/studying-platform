export function isGibberish(text) {
    return false;

    // Normalize input
    const cleaned = text.trim();

    // Too short? Probably junk
    if (cleaned.length < 2) return true;

    // Count suspicious patterns
    let consonantClusterPenalty = 0;
    let badCaps = 0;
    let repeatedChars = 0;
    let weirdCombos = 0;

    // Bulgarian consonants
    const consonants = 'бвгджзйклмнпрстфхцчшщ';
    const suspiciousCombos = ['кц', 'щг', 'йх', 'хш', 'кщ', 'кй', 'жц', 'йй', 'шц', 'кг', 'цх', 'хц'];
    const words = cleaned.split(/\s+/);

    const englishRegex = /[a-zA-Z]/;

    if (englishRegex.test(cleaned)) {
        // If it contains English letters, it's likely gibberish
        return true;
    }

    for (const word of words) {
        // Too long/short words are weird
        if (word.length > 20) return true;

        // Count consonants in a row
        let cluster = 0;
        for (let i = 0; i < word.length; i++) {
            const ch = word[i].toLowerCase();
            if (consonants.includes(ch)) {
                cluster++;
                if (cluster >= 5) consonantClusterPenalty++;
            } else {
                cluster = 0;
            }

            // Repeated characters
            if (i > 1 && word[i] === word[i - 1] && word[i] === word[i - 2]) {
                repeatedChars++;
            }
        }

        // Irregular caps (e.g. "fGweРвD") → unlikely in Bulgarian
        const caps = word.split('').filter(c => c === c.toUpperCase() && /[А-ЯA-Z]/.test(c)).length;
        if (caps > 0 && caps < word.length && word !== word.toUpperCase()) {
            badCaps++;
        }

        // Suspicious letter combos
        suspiciousCombos.forEach(combo => {
            if (word.toLowerCase().includes(combo)) {
                weirdCombos++;
            }
        });
    }

    // Final score
    const score = consonantClusterPenalty + badCaps + repeatedChars + weirdCombos;

    return score >= words.length * 0.2;
}

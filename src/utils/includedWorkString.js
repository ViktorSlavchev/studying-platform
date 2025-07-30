import { lit5Topics, lit6Topics, lit7Topics } from "./topics";


export default function includedWorkString(knownTopics) {
    const allLit5 = lit5Topics.every((topic) => knownTopics.includes(topic));
    const allLit6 = lit6Topics.every((topic) => knownTopics.includes(topic));
    const allLit7 = lit7Topics.every((topic) => knownTopics.includes(topic));

    const someLit5 = lit5Topics.some((topic) => knownTopics.includes(topic));
    const someLit6 = lit6Topics.some((topic) => knownTopics.includes(topic));
    const someLit7 = lit7Topics.some((topic) => knownTopics.includes(topic));

    const includedWorksString = `${allLit5 ? "от 5 клас" : someLit5 ? "някои произведения от 5 клас" : ""}, ${allLit6 ? "от 6 клас" : someLit6 ? "някои произведения от 6 клас" : ""}, ${allLit7 ? "от 7 клас" : someLit7 ? "някои произведения от 7 клас" : ""}`;
    return includedWorksString;
}
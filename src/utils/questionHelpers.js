/**
 * Utility functions for handling question logic
 */

/**
 * Get initial user answer based on question type
 */
export function getInitialUserAnswer(question) {
    if (question.type === "options" || question.type === "shortAnswer") {
        return "";
    }

    // For editing questions
    return {
        exportedText: question.text,
        stateText: question.text.split("").map((l) => {
            return {
                value: l,
                state: "normal",
                visable: l.replaceAll("*", "\u00A0"),
            };
        }),
    };
}

/**
 * Check if user has provided an answer
 */
export function hasUserAnswer(question, userAnswer) {
    if (question.type === "options" || question.type === "shortAnswer") {
        return userAnswer.trim() !== "";
    }
    if (question.type === "editing") {
        return userAnswer && typeof userAnswer === "object";
    }
    return false;
}

/**
 * Get the correct answer based on question type
 */
export function getCorrectAnswerForQuestion(question) {
    if (question.type === "options") {
        return question.answer || question.options?.[0];
    }
    if (question.type === "shortAnswer" || question.type === "editing") {
        return question.answer;
    }
    return "";
}

/**
 * Check if the user's answer is correct
 */
export function isAnswerCorrect(question, userAnswer) {
    const correctAnswer = getCorrectAnswerForQuestion(question);

    if (question.type === "options" || question.type === "shortAnswer") {
        return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    }

    if (question.type === "editing") {
        const exportedText = userAnswer?.exportedText || "";
        return exportedText === correctAnswer;
    }

    return false;
}

/**
 * Check if question needs reading text (for "Анализ на текст" questions)
 */
export function questionNeedsReading(question) {
    return !!(question.parentReading && question.topic === "Анализ на текст");
}

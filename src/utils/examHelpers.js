/**
 * Utility functions for exam logic
 */

/**
 * Get initial answers array for an exam
 */
export function getInitialExamAnswers(exam) {
    return exam.questions.map((question, index) => ({
        questionId: question._id,
        answer: question.type === "editing"
            ? {
                stateText: question.text.split("").map((l) => ({
                    value: l,
                    state: "normal",
                    visable: l.replaceAll("*", "\u00A0"),
                })),
                exportedText: question.text,
            }
            : "",
        questionNum: index,
    }));
}

/**
 * Calculate time left for exam auto-submit
 */
export function calculateTimeLeft(startedAt) {
    const startedTime = new Date(startedAt).getTime();
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    return startedTime + oneHour - now;
}

/**
 * Get unique answered questions count
 */
export function getAnsweredQuestionsCount(answers) {
    return Array.from(
        new Set(
            answers
                .filter((a) => a.answer !== "")
                .map((q) => q.questionNum)
        )
    ).length;
}

/**
 * Save answers to localStorage
 */
export function saveAnswersToLocalStorage(examId, answers) {
    if (answers.length === 0) return;
    localStorage.setItem(`exam-answers-${examId}`, JSON.stringify(answers));
}

/**
 * Load answers from localStorage
 */
export function loadAnswersFromLocalStorage(examId, expectedLength) {
    const savedAnswers = localStorage.getItem(`exam-answers-${examId}`);
    if (!savedAnswers) return null;

    try {
        const parsed = JSON.parse(savedAnswers);
        if (Array.isArray(parsed) && parsed.length === expectedLength) {
            return parsed;
        }
    } catch (err) {
        console.error("Failed to parse saved answers from localStorage:", err);
        localStorage.removeItem(`exam-answers-${examId}`);
    }
    return null;
}

/**
 * Clear exam answers from localStorage
 */
export function clearAnswersFromLocalStorage(examId) {
    localStorage.removeItem(`exam-answers-${examId}`);
}

/**
 * Find answer for a specific question
 */
export function findQuestionAnswer(answers, questionId) {
    return answers.find((a) => a.questionId === questionId);
}

/**
 * Update answer for a specific question
 */
export function updateQuestionAnswer(answers, questionId, newAnswer, questionNum) {
    const existingAnswer = answers.find((a) => a.questionId === questionId);

    if (existingAnswer) {
        return answers.map((a) =>
            a.questionId === questionId ? { ...a, answer: newAnswer } : a
        );
    } else {
        return [...answers, { questionId, answer: newAnswer, questionNum }];
    }
}

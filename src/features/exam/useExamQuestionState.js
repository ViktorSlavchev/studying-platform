import { useMemo } from "react";
import { findQuestionAnswer } from "../../utils/examHelpers";

export function useExamQuestionState(question, answers) {
    const currentAnswerObject = useMemo(
        () => findQuestionAnswer(answers, question._id),
        [answers, question._id]
    );


    const currentAnswer = currentAnswerObject?.answer;
    const points = currentAnswerObject?.points || 0;
    const maxPoints = currentAnswerObject?.maxPoints || 0;
    const correctAnswer = currentAnswerObject?.correctAnswer || "";

    return {
        currentAnswer,
        points,
        maxPoints,
        correctAnswer,
    };
}

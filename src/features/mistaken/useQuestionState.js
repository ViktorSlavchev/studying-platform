import { useState } from "react";
import {
    getInitialUserAnswer,
    hasUserAnswer,
    getCorrectAnswerForQuestion,
    isAnswerCorrect
} from "../../utils/questionHelpers";

export function useQuestionState(question) {
    const [userAnswer, setUserAnswer] = useState(() => getInitialUserAnswer(question));
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleAnswerChange = (answer) => {
        setUserAnswer(answer);
        setIsChecked(false); // Reset check status when answer changes
    };

    const checkAnswer = () => {
        const correct = isAnswerCorrect(question, userAnswer);
        setIsCorrect(correct);
        setIsChecked(true);
    };

    const hasAnswer = () => hasUserAnswer(question, userAnswer);
    const correctAnswer = getCorrectAnswerForQuestion(question);

    return {
        userAnswer,
        isChecked,
        isCorrect,
        hasAnswer,
        correctAnswer,
        handleAnswerChange,
        checkAnswer,
    };
}

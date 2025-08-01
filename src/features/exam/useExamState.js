import { useState, useEffect, useRef, useCallback } from "react";
import {
    getInitialExamAnswers,
    calculateTimeLeft,
    getAnsweredQuestionsCount,
    saveAnswersToLocalStorage,
    loadAnswersFromLocalStorage,
    clearAnswersFromLocalStorage
} from "../../utils/examHelpers";

export function useExamState(exam, examId, submitFunction) {
    const [answers, setAnswers] = useState([]);
    const answersRef = useRef([]);
    const timeoutRef = useRef(null);

    // Calculate answered questions count
    const answeredQuestionsCount = getAnsweredQuestionsCount(answers);

    // Handle exam submission
    const handleSubmit = useCallback(() => {
        clearAnswersFromLocalStorage(examId);
        submitFunction({ id: examId, answers: answersRef.current });
    }, [examId, submitFunction]);

    // Handle exam initialization
    const initializeExam = useCallback((examData) => {
        if (examData.status === "completed") {
            setAnswers(examData.answers);
            return;
        }

        // Set up auto-submit timer
        const timeLeft = calculateTimeLeft(examData.startedAt);

        if (timeLeft <= 0) {
            handleSubmit(); // Already expired
        } else {
            timeoutRef.current = setTimeout(() => {
                handleSubmit();
            }, timeLeft);
        }

        // Try to load saved answers
        const savedAnswers = loadAnswersFromLocalStorage(examData._id, examData.questions.length);

        if (savedAnswers) {
            setAnswers(savedAnswers);
        } else {
            // Initialize with empty answers
            const initialAnswers = getInitialExamAnswers(examData);
            setAnswers(initialAnswers);
            saveAnswersToLocalStorage(examData._id, initialAnswers);
        }
    }, [handleSubmit]);

    // Update answersRef and save to localStorage when answers change
    useEffect(() => {
        answersRef.current = answers;
        if (answers.length > 0) {
            saveAnswersToLocalStorage(examId, answers);
        }
    }, [answers, examId]);

    // Initialize exam when data is loaded
    useEffect(() => {
        if (exam) {
            initializeExam(exam);
        }
    }, [exam, initializeExam]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return {
        answers,
        setAnswers,
        answersRef,
        answeredQuestionsCount,
        handleSubmit,
    };
}

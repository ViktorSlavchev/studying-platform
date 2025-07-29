import { useParams } from "react-router";
import styled from "styled-components";

import Heading from "../ui/Heading";
import QuestionHolder from "../features/exam/QuestionHolder";
import Question from "../features/exam/Question";
import Row from "../ui/Row";
import Button from "../ui/Button";
import TimeLeftBox from "../features/exam/TimeLeftBox";
import { useExam } from "../features/exam/useExam";
import Spinner from "../ui/Spinner";
import SpinnerMini from "../ui/SpinnerMini";
import { useCallback, useEffect, useRef, useState } from "react";
import QuestionQuotes from "../features/exam/QuestionQuotes";
import QuestionLongAnswer from "../features/exam/QuestionLongAnswer";
import { useSubmit } from "../features/exam/useSubmit";

const RightColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;

	align-self: flex-start;
	position: sticky;
	top: 2rem;
`;

function Exam() {
	const { id } = useParams();
	const { submit, isLoading: isLoadingSubmit } = useSubmit();

	const [answers, setAnswers] = useState([]); // {questionId: string, answer: string, questionNum: number}[]
	const answersRef = useRef([]);
	const answeredQuestionsCount = Array.from(new Set(answers.filter((a) => a.answer !== "").map((q) => q.questionNum))).length;
	const timeoutRef = useRef(null);

	const { exam, isLoading } = useExam({ id });
	const handleSubmit = useCallback(() => {
		localStorage.removeItem(`exam-answers-${id}`);
		submit({ id, answers: answersRef.current });
	}, [id, submit]);

	// Set initial answers when exam data is loaded and set up the auto-submit timer
	const onExamLoaded = useCallback(
		(examData) => {
			if (examData.status === "completed") {
				setAnswers(examData.answers);
				return;
			}
			// Auto-submit timer
			const startedTime = new Date(examData.startedAt).getTime();
			const now = Date.now();
			const oneHour = 60 * 60 * 1000;
			const timeLeft = startedTime + oneHour - now;

			if (timeLeft <= 0) {
				handleSubmit(); // Already expired
			} else {
				timeoutRef.current = setTimeout(() => {
					handleSubmit();
				}, timeLeft);

				// console.log("Auto-submit timer set for:", new Date(startedTime + oneHour).toLocaleString());
			}

			// Try to load saved answers from localStorage
			// This allows resuming the exam if the user navigates away and comes back
			const savedAnswers = localStorage.getItem(`exam-answers-${examData._id}`);
			if (savedAnswers) {
				try {
					const parsed = JSON.parse(savedAnswers);
					if (Array.isArray(parsed) && parsed.length === examData.questions.length) {
						// console.log("Loaded saved answers from localStorage:", parsed, examData.questions);
						setAnswers(parsed);
						return;
					}
				} catch (err) {
					console.error("Failed to parse saved answers from localStorage:", err);
					localStorage.removeItem(`exam-answers-${examData._id}`); // Clear invalid data
				}
			}

			// If no saved answers, initialize with empty answers
			const initialAnswers = examData.questions.map((question, index) => ({
				questionId: question["_id"],
				answer:
					question.type === "editing"
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
			setAnswers(initialAnswers);
			localStorage.setItem(`exam-answers-${examData._id}`, JSON.stringify(initialAnswers));
			// console.log("Initialized answers:", initialAnswers);
		},
		[setAnswers, handleSubmit]
	);

	useEffect(() => {
		if (exam) {
			onExamLoaded(exam);
			if (exam.status === "grading") {
				setTimeout(() => {
					location.reload();
				}, 4000);
			}
		}
	}, [exam, onExamLoaded]);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	// Update answersRef whenever answers change and save to localStorage
	useEffect(() => {
		// Update answersRef whenever answers change
		answersRef.current = answers;

		// Save answers to localStorage
		if (answers.length === 0) return; // Don't save empty answers
		localStorage.setItem(`exam-answers-${id}`, JSON.stringify(answers));
		// console.log("Answers saved to localStorage:", answers);
	}, [answers, id]);

	if (isLoading) {
		return <Spinner />;
	}

	if (exam.status === "grading") {
		return (
			<>
				<Heading as="h2" style={{ textAlign: "center" }}>
					Изпитът се проверява. Моля изчакайте.
				</Heading>
				<Spinner />
			</>
		);
	}
	return (
		<>
			<Heading>Изпит #{id}</Heading>
			<Row $gap="3.2rem">
				<QuestionHolder style={{ flex: 2, minWidth: "0" }}>
					{exam.questions.map((question, ind) => (
						<Question key={question["_id"]} question={question} num={ind} answers={answers} setAnswers={setAnswers} status={exam.status} />
					))}
					{<QuestionQuotes quotes={exam.quotes?.slice(0, 4)} answers={answers} setAnswers={setAnswers} status={exam.status} />}
					{<QuestionLongAnswer question={exam.quotes?.slice(-1)[0]} answers={answers} setAnswers={setAnswers} status={exam.status} />}
				</QuestionHolder>

				<RightColumn style={{ flex: 1, minWidth: "0" }}>
					<TimeLeftBox status={exam.status} startedAt={exam.startedAt} answeredQuestionsCount={answeredQuestionsCount} score={exam.points || 0} />
					{exam.status !== "completed" && <Button onClick={handleSubmit}>{isLoadingSubmit ? <SpinnerMini /> : "Предай"}</Button>}
				</RightColumn>
			</Row>
		</>
	);
}

export default Exam;

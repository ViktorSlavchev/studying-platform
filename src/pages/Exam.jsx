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
import { useEffect, useRef, useState } from "react";
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
	const { exam, isLoading } = useExam({ id, onSuccess: onExamLoaded });
	const { submit, isLoading: isLoadingSubmit } = useSubmit();

	const [answers, setAnswers] = useState([]); // {questionId: string, answer: string, questionNum: number}[]
	const answersRef = useRef([]);
	const answeredQuestionsCount = Array.from(new Set(answers.filter((a) => a.answer !== "").map((q) => q.questionNum))).length;

	const handleSubmit = () => {
		submit({ id, answers: answersRef.current });
	};

	const timeoutRef = useRef(null);

	// Set initial answers when exam data is loaded and set up the auto-submit timer
	function onExamLoaded(examData) {
		if (examData.status === "completed") {
			setAnswers(examData.answers);
			return;
		}
		// Set initial answers based on questions
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
		}
	}

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	// Update answersRef whenever answers change
	useEffect(() => {
		// Update answersRef whenever answers change
		answersRef.current = answers;
	}, [answers]);

	if (isLoading) {
		return <Spinner />;
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
					{<QuestionLongAnswer question={exam.quotes?.slice(-1)[0]} answers={answers} setAnswers={setAnswers} />}
				</QuestionHolder>

				<RightColumn style={{ flex: 1, minWidth: "0" }}>
					<TimeLeftBox status={exam.status} startedAt={exam.startedAt} answeredQuestionsCount={answeredQuestionsCount} />
					{exam.status !== "completed" && <Button onClick={handleSubmit}>{isLoadingSubmit ? <SpinnerMini /> : "Предай"}</Button>}
				</RightColumn>
			</Row>
		</>
	);
}

export default Exam;

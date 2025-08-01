import PropTypes from "prop-types";
import styled from "styled-components";
import React from "react";

import InfoBox from "../../ui/InfoBox";
import Text from "../../ui/Text";
import QuestionRenderer from "../mistaken/QuestionRenderer";
import ExamQuestionFeedback from "./ExamQuestionFeedback";
import { useExamQuestionState } from "./useExamQuestionState";

const StyledQuestion = styled(InfoBox)`
	display: flex;
	gap: 1rem;
	flex-direction: column;
	padding-top: 1.6rem;
	padding-bottom: 1.6rem;
`;

function Question({ question, num, answers, setAnswers, status }) {
	const { currentAnswer, points, maxPoints, correctAnswer } = useExamQuestionState(question, answers);

	function handleAnswerChange(answer) {
		if (status === "completed") return; // Do not allow changes if the exam is completed

		// Update answers array
		const existingAnswer = answers.find((a) => a.questionId === question._id);

		if (existingAnswer) {
			setAnswers((prev) => prev.map((a) => (a.questionId === question._id ? { ...a, answer } : a)));
		} else {
			setAnswers((prev) => [
				...prev,
				{
					questionId: question._id,
					answer,
					questionNum: num,
				},
			]);
		}
	}

	return (
		<StyledQuestion>
			{/* Question number */}
			{question.type !== "reading" && <Text $weight="bold">{num} задача.</Text>}

			{/* Question renderer */}
			<QuestionRenderer question={question} answer={currentAnswer} onAnswer={handleAnswerChange} status={status} />

			{/* Exam feedback */}
			{question.type !== "reading" && <ExamQuestionFeedback status={status} points={points} maxPoints={maxPoints} correctAnswer={correctAnswer} />}
		</StyledQuestion>
	);
}
Question.propTypes = {
	question: PropTypes.shape({
		type: PropTypes.string.isRequired,
		_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	}).isRequired,
	num: PropTypes.number.isRequired,
	answers: PropTypes.array.isRequired,
	setAnswers: PropTypes.func.isRequired,
	status: PropTypes.string, // Add this line for status prop validation
};

export default React.memo(Question, (prevProps, nextProps) => {
	const prevAnswer = prevProps.answers.find((a) => a.questionId === prevProps.question._id)?.answer;
	const nextAnswer = nextProps.answers.find((a) => a.questionId === nextProps.question._id)?.answer;

	return prevProps.question._id === nextProps.question._id && prevAnswer === nextAnswer;
});

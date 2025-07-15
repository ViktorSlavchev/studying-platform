import PropTypes from "prop-types";
import styled from "styled-components";

import InfoBox from "../../ui/InfoBox";
import QuestionOptions from "./QuestionOptions";
import Text from "../../ui/Text";
import QuestionShortAnswer from "./QuestionShortAnswer";
import QuestionEditing from "./QuestionEditing";
import QuestionReading from "./QuestionReading";
import React from "react";

const StyledQuestion = styled(InfoBox)`
	display: flex;
	gap: 1rem;
	flex-direction: column;

	padding-top: 1.6rem;
	padding-bottom: 1.6rem;
`;

const CASpan = styled.span`
	font-weight: 700;
`;
function Question({ question, num, answers, setAnswers, status }) {
	const currentAnswerObject = answers.find((a) => a.questionId === question["_id"]);
	const currentAnswer = currentAnswerObject?.answer;

	const points = currentAnswerObject?.points || 0;
	const maxPoints = currentAnswerObject?.maxPoints || 0;
	const correctAnswer = currentAnswerObject?.correctAnswer || "";

	function handleAnswerChange(answer) {
		if (status === "completed") return; // Do not allow changes if the exam is completed

		// check if an answer is given;
		if (currentAnswerObject) {
			setAnswers((prev) => prev.map((a) => (a.questionId === question["_id"] ? { ...a, answer } : a)));
		} else {
			setAnswers((prev) => [...prev, { questionId: question["_id"], answer, questionNum: num }]);
		}
	}

	return (
		<StyledQuestion>
			{question.type !== "reading" && <Text $weight={"bold"}>{num} задача.</Text>}
			{question.type === "options" && <QuestionOptions question={question} answer={currentAnswer} onAnswer={handleAnswerChange} />}
			{question.type === "shortAnswer" && <QuestionShortAnswer question={question} answer={currentAnswer} onAnswer={handleAnswerChange} />}
			{question.type === "editing" && <QuestionEditing status={status} question={question} answer={currentAnswer} onAnswer={handleAnswerChange} />}
			{question.type === "reading" && <QuestionReading question={question} />}

			{status === "completed" && question.type !== "reading" && (
				<Text $weight="bold" $color={points === maxPoints ? "green" : points === 0 ? "red" : "orange"}>
					Точки: {points} / {maxPoints}
				</Text>
			)}
			{status === "completed" && question.type !== "reading" && points !== maxPoints && (
				<Text>
					<CASpan>Правилен отговор:</CASpan> {correctAnswer}
				</Text>
			)}
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

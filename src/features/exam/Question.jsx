import PropTypes from "prop-types";
import styled from "styled-components";

import InfoBox from "../../ui/InfoBox";
import QuestionOptions from "./QuestionOptions";
import Text from "../../ui/Text";
import QuestionShortAnswer from "./QuestionShortAnswer";
import QuestionEditing from "./QuestionEditing";
import QuestionReading from "./QuestionReading";

const StyledQuestion = styled(InfoBox)`
	display: flex;
	gap: 1rem;
	flex-direction: column;

	padding-top: 1.6rem;
	padding-bottom: 1.6rem;
`;
function Question({ question, num, answers, setAnswers }) {
	const currentAnswer = answers.find((a) => a.questionId === question["_id"])?.answer;

	function handleAnswerChange(answer) {
		// check if an answer is given;
		if (answers.find((a) => a.questionId === question["_id"])) {
			setAnswers((prev) => prev.map((a) => (a.questionId === question["_id"] ? { ...a, answer } : a)));
		} else {
			setAnswers((prev) => [...prev, { questionId: question["_id"], answer }]);
		}
	}

	return (
		<StyledQuestion>
			{question.type !== "reading" && <Text $weight={"bold"}>{num} задача.</Text>}
			{question.type === "options" && <QuestionOptions question={question} answer={currentAnswer} onAnswer={handleAnswerChange} />}
			{question.type === "shortAnswer" && <QuestionShortAnswer question={question} answer={currentAnswer} onAnswer={handleAnswerChange} />}
			{question.type === "editing" && <QuestionEditing question={question} />}
			{question.type === "reading" && <QuestionReading question={question} />}
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
};

export default Question;

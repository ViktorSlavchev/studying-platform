import PropTypes from "prop-types";
import styled from "styled-components";

import Text from "../../ui/Text";
import Input from "../../ui/Input";

const StyledQuestion = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

function QuestionShortAnswer({ question, answer, onAnswer, status }) {
	return (
		<StyledQuestion>
			<Text>{question.question}</Text>
			<Input placeholder="Напишете отговора тук ..." value={answer || ""} onChange={(e) => onAnswer(e.target.value)} style={{ pointerEvents: status === "completed" ? "none" : "auto" }} />
		</StyledQuestion>
	);
}

QuestionShortAnswer.propTypes = {
	question: PropTypes.shape({
		question: PropTypes.string.isRequired,
	}).isRequired,
	answer: PropTypes.string,
	onAnswer: PropTypes.func.isRequired,
	status: PropTypes.string.isRequired,
};

export default QuestionShortAnswer;

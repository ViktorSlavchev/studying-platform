import PropTypes from "prop-types";
import styled from "styled-components";

import Text from "../../ui/Text";
import Input from "../../ui/Input";

const StyledQuestion = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

function QuestionShortAnswer({ question }) {
	return (
		<StyledQuestion>
			<Text>{question.question}</Text>
			<Input placeholder="Напишете отговора тук ..." />
		</StyledQuestion>
	);
}

QuestionShortAnswer.propTypes = {
	question: PropTypes.shape({
		question: PropTypes.string.isRequired,
	}).isRequired,
};

export default QuestionShortAnswer;

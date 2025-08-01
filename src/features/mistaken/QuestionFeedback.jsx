import PropTypes from "prop-types";

import Text from "../../ui/Text";
import styled from "styled-components";

const CASpan = styled.span`
	font-weight: 700;
`;

function QuestionFeedback({ isChecked, isCorrect, correctAnswer }) {
	if (!isChecked) return null;

	return (
		<>
			{/* Show correct answer if wrong */}
			{!isCorrect && (
				<Text>
					<CASpan>Правилен отговор:</CASpan> {correctAnswer}
				</Text>
			)}

			{/* Show result */}
			<Text $weight="bold" $color={isCorrect ? "green" : "red"}>
				{isCorrect ? "✓ Правилно!" : "✗ Грешно"}
			</Text>
		</>
	);
}

QuestionFeedback.propTypes = {
	isChecked: PropTypes.bool.isRequired,
	isCorrect: PropTypes.bool.isRequired,
	correctAnswer: PropTypes.string.isRequired,
};

export default QuestionFeedback;

import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "../../ui/Text";

const CASpan = styled.span`
	font-weight: 700;
`;

function ExamQuestionFeedback({ status, points, maxPoints, correctAnswer }) {
	if (status !== "completed") return null;

	const isCorrect = points === maxPoints;
	const isIncorrect = points === 0;

	const color = isCorrect ? "green" : isIncorrect ? "red" : "orange";

	return (
		<>
			<Text $weight="bold" $color={color}>
				Точки: {points} / {maxPoints}
			</Text>

			{!isCorrect && correctAnswer && (
				<Text>
					<CASpan>Правилен отговор:</CASpan> {correctAnswer}
				</Text>
			)}
		</>
	);
}

ExamQuestionFeedback.propTypes = {
	status: PropTypes.string.isRequired,
	points: PropTypes.number,
	maxPoints: PropTypes.number,
	correctAnswer: PropTypes.string,
};

export default ExamQuestionFeedback;

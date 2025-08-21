import styled from "styled-components";
import PropTypes from "prop-types";

import Text from "../../ui/Text";
import Letter from "./Letter";

const StyledUl = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	padding-left: 1.2rem;
	margin: 0.8rem 0;
`;

const Option = styled.li`
	cursor: pointer;
	${({ status }) => status === "completed" && `
		pointer-events: none;
	`}
	width: fit-content;
`;

function QuestionOptions({ question, answer, onAnswer, status }) {
	return (
		<div>
			<Text>{question.question}</Text>
			<StyledUl>
				{question.options.map((option, index) => (
					<Option key={index} onClick={() => onAnswer(option)} status={status}>
						<Text>
							<Letter ind={index} $highlight={answer === option ? "true" : "false"} /> {option}
						</Text>
					</Option>
				))}
			</StyledUl>
		</div>
	);
}
QuestionOptions.propTypes = {
	question: PropTypes.shape({
		question: PropTypes.string.isRequired,
		options: PropTypes.arrayOf(PropTypes.string).isRequired,
	}).isRequired,
	onAnswer: PropTypes.func.isRequired,
	answer: PropTypes.string,
};

export default QuestionOptions;

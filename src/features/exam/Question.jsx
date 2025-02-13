import PropTypes from "prop-types";
import styled from "styled-components";

import InfoBox from "../../ui/InfoBox";
import QuestionOptions from "./QuestionOptions";
import Text from "../../ui/Text";
import QuestionShortAnswer from "./QuestionShortAnswer";

const StyledQuestion = styled(InfoBox)`
	display: flex;
	gap: 1rem;
	flex-direction: column;

	padding-top: 1.6rem;
	padding-bottom: 1.6rem;
`;
function Question({ question, num }) {
	return (
		<StyledQuestion>
			<Text weight={"bold"}>{num} задача.</Text>
			{question.type === "options" && <QuestionOptions question={question} />}
			{question.type === "shortAnswer" && <QuestionShortAnswer question={question} />}
		</StyledQuestion>
	);
}
Question.propTypes = {
	question: PropTypes.shape({
		type: PropTypes.string.isRequired,
	}).isRequired,
	num: PropTypes.number.isRequired,
};

export default Question;

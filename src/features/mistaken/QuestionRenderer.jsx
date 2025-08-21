import PropTypes from "prop-types";

import QuestionOptions from "../exam/QuestionOptions";
import QuestionShortAnswer from "../exam/QuestionShortAnswer";
import QuestionEditing from "../exam/QuestionEditing";
import QuestionReading from "../exam/QuestionReading";

function QuestionRenderer({ question, answer, onAnswer, status = "in-progress" }) {
	switch (question.type) {
		case "options":
			return <QuestionOptions question={question} answer={answer} onAnswer={onAnswer} status={status} />;

		case "shortAnswer":
			return <QuestionShortAnswer question={question} answer={answer} onAnswer={onAnswer} status={status} />;

		case "editing":
			return <QuestionEditing status={status} question={question} answer={answer} onAnswer={onAnswer} />;

		case "reading":
			return <QuestionReading question={question} />;

		default:
			return null;
	}
}

QuestionRenderer.propTypes = {
	question: PropTypes.shape({
		type: PropTypes.string.isRequired,
	}).isRequired,
	answer: PropTypes.any,
	onAnswer: PropTypes.func,
	status: PropTypes.string,
};
export default QuestionRenderer;

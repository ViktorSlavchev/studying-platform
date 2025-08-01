import PropTypes from "prop-types";

import QuestionOptions from "../exam/QuestionOptions";
import QuestionShortAnswer from "../exam/QuestionShortAnswer";
import QuestionEditing from "../exam/QuestionEditing";
import QuestionReading from "../exam/QuestionReading";

function QuestionRenderer({ question, answer, onAnswer }) {
	switch (question.type) {
		case "options":
			return <QuestionOptions question={question} answer={answer} onAnswer={onAnswer} />;

		case "shortAnswer":
			return <QuestionShortAnswer question={question} answer={answer} onAnswer={onAnswer} />;

		case "editing":
			return <QuestionEditing status="in-progress" question={question} answer={answer} onAnswer={onAnswer} />;

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
};

export default QuestionRenderer;

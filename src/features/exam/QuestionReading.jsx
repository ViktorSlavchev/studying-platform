import Text from "../../ui/Text";
import PropTypes from "prop-types";

function QuestionReading({ question }) {
	return (
		<div>
			<Text $weight="bold">{question.question}</Text>

			<div style={{ marginTop: "3rem" }}>
				{question.text.split("\n").map((line, index) => (
					<Text key={index} style={{ textIndent: "1.2em" }}>
						{line}
					</Text>
				))}
			</div>
		</div>
	);
}

QuestionReading.propTypes = {
	question: PropTypes.shape({
		question: PropTypes.string,
		text: PropTypes.string,
	}).isRequired,
};

export default QuestionReading;

import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "../../ui/Text";
import LongInput from "../../ui/LongInput";
import { useEffect, useState } from "react";
import InfoBox from "../../ui/InfoBox";

const StyledQuestion = styled(InfoBox)`
	display: flex;
	gap: 1rem;
	flex-direction: column;

	padding-top: 1.6rem;
	padding-bottom: 1.6rem;
`;

const QuoteText = styled(Text)`
	margin-bottom: 0.5rem;
	font-style: italic;
`;

function QuestionLongAnswer({ question, answers, setAnswers }) {
	const [value, setValue] = useState("");

	// Load existing answer for this question
	useEffect(() => {
		const found = answers.find((a) => a.questionId === question._id);
		setValue(found ? found.answer : "");
	}, [answers, question._id]);

	const handleChange = (val) => {
		setValue(val);
		if (answers.find((a) => a.questionId === question._id)) {
			setAnswers((prev) => prev.map((a) => (a.questionId === question._id ? { ...a, answer: val, questionNum: 25 } : a)));
		} else {
			setAnswers((prev) => [...prev, { questionId: question._id, answer: val, questionNum: 25 }]);
		}
	};

	return (
		<StyledQuestion>
			<Text $weight={"bold"}>25 задача.</Text>
			<Text>Напишете коментар в текст от 3-4 изречения по думите:</Text>
			<QuoteText>
				{question.quote.split("\n").map((t, ind) => (
					<span key={ind}>
						{t} <br />
					</span>
				))}
			</QuoteText>
			<LongInput placeholder="Напишете тезата тук ..." value={value} onChange={(e) => handleChange(e.target.value)} />
		</StyledQuestion>
	);
}

QuestionLongAnswer.propTypes = {
	question: PropTypes.shape({
		_id: PropTypes.string,
		quote: PropTypes.string.isRequired,
		type: PropTypes.string,
		thesisOk: PropTypes.bool,
	}),
	answers: PropTypes.array.isRequired,
	setAnswers: PropTypes.func.isRequired,
};

export default QuestionLongAnswer;

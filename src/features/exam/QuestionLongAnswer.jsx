import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "../../ui/Text";
import LongInput from "../../ui/LongInput";
import { useEffect, useState } from "react";
import InfoBox from "../../ui/InfoBox";
import MultipleLines from "../../ui/MultipleLines";

const StyledQuestion = styled(InfoBox)`
	display: flex;
	gap: 1rem;
	flex-direction: column;

	padding-top: 1.6rem;
	padding-bottom: 1.6rem;

	/* Mobile responsive font sizing */
	@media (max-width: 768px) {
		font-size: 1.4rem;

		/* Make all text content smaller on mobile */
		* {
			font-size: inherit;
		}
	}

	@media (max-width: 479px) {
		font-size: 1.3rem;
		padding: 1.2rem;
		gap: 0.8rem;
	}
`;

const QuoteText = styled(Text)`
	margin-bottom: 0.5rem;
	font-style: italic;
`;

function QuestionLongAnswer({ question, answers, setAnswers, status }) {
	const currentAnswerObject = answers.find((a) => a.questionId === question["_id"]);
	const currentAnswer = currentAnswerObject?.answer;

	const points = currentAnswerObject?.points || 0;
	const maxPoints = currentAnswerObject?.maxPoints || 0;
	const correctAnswer = currentAnswerObject?.correctAnswer || "";

	const [value, setValue] = useState(currentAnswer || "");

	// Load existing answer for this question
	useEffect(() => {
		const found = answers.find((a) => a.questionId === question._id);
		setValue(found ? found.answer : "");
	}, [answers, question._id]);

	const handleChange = (val) => {
		if (status === "completed") return;

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
				<MultipleLines text={question.quote} />
			</QuoteText>
			<LongInput placeholder="Напишете тезата тук ..." value={value || ""} onChange={(e) => handleChange(e.target.value)} style={{ pointerEvents: status === "completed" ? "none" : "auto" }} />

			{status === "completed" && question.type !== "reading" && (
				<Text $weight="bold" $color={points === maxPoints ? "green" : points === 0 ? "red" : "orange"}>
					Точки: {points} / {maxPoints}
				</Text>
			)}
			{status === "completed" && question.type !== "reading" && points !== maxPoints && (
				<Text>
					<span style={{ fontWeight: "700" }}>Коментар:</span> {correctAnswer}
				</Text>
			)}
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
	status: PropTypes.string.isRequired,
};

export default QuestionLongAnswer;

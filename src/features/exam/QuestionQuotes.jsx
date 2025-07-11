import Text from "../../ui/Text";
import InputAutofill from "../../ui/InputAutofill";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { litTopics } from "../../utils/topics";
import InfoBox from "../../ui/InfoBox";
import styled from "styled-components";

const StyledQuestion = styled(InfoBox)`
	display: flex;
	gap: 1rem;
	flex-direction: column;

	padding-top: 1.6rem;
	padding-bottom: 1.6rem;
`;

const QuoteHolder = styled.div`
	display: grid;
	grid-template-columns: 1fr 20fr;
	margin-bottom: 1.2rem;
`;

function QuestionQuotes({ quotes, answers, setAnswers }) {
	const [values, setValues] = useState(Array(quotes.length).fill(""));

	// Load existing answers for quotes
	useEffect(() => {
		const initialValues = quotes.map((q) => {
			const found = answers.find((a) => a.questionId === q._id);
			return found ? found.answer : "";
		});
		setValues(initialValues);
	}, [quotes, answers]);

	const handleChange = (idx, val) => {
		setValues((prev) => {
			const next = [...prev];
			next[idx] = val;
			return next;
		});
		const quoteId = quotes[idx]._id;
		if (answers.find((a) => a.questionId === quoteId)) {
			setAnswers((prev) => prev.map((a) => (a.questionId === quoteId ? { ...a, answer: val } : a)));
		} else {
			setAnswers((prev) => [...prev, { questionId: quoteId, answer: val }]);
		}
	};

	return (
		<StyledQuestion>
			<Text $weight={"bold"}>24 задача.</Text>
			<Text>Свържете всеки от цитатите / изреченията с текста, на който отговаря.</Text>

			{quotes.map((q, idx) => (
				<QuoteHolder key={q._id || idx}>
					<Text $weight={"bold"}>{String.fromCharCode(1072 + idx)})</Text>
					<Text style={{ marginBottom: "0.5rem" }}>
						{q.quote.split("\n").map((line, i) => (
							<span key={i}>
								{line}
								<br />
							</span>
						))}
					</Text>
					<InputAutofill value={values[idx]} onChange={(val) => handleChange(idx, val)} list={litTopics} style={{ width: "100%", gridColumn: "2 / 3" }} />
				</QuoteHolder>
			))}
		</StyledQuestion>
	);
}

QuestionQuotes.propTypes = {
	quotes: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			quote: PropTypes.string.isRequired,
			type: PropTypes.string,
			thesisOk: PropTypes.bool,
		})
	).isRequired,
	answers: PropTypes.array.isRequired,
	setAnswers: PropTypes.func.isRequired,
};

export default QuestionQuotes;

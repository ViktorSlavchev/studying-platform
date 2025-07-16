import Text from "../../ui/Text";
import InputAutofill from "../../ui/InputAutofill";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { litTopics } from "../../utils/topics";
import InfoBox from "../../ui/InfoBox";
import styled from "styled-components";
import MultipleLines from "../../ui/MultipleLines";

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

function QuestionQuotes({ quotes, answers, setAnswers, status }) {
	const [values, setValues] = useState(Array(quotes.length).fill(""));
	const myAnswers = quotes.map((q) => {
		const ans = answers.find((a) => a.questionId === q._id);
		return ans;
	});

	// Load existing answers for quotes
	useEffect(() => {
		const initialValues = quotes.map((q) => {
			const found = answers.find((a) => a.questionId === q._id);
			return found ? found.answer : "";
		});
		setValues(initialValues);
	}, [quotes, answers]);

	const handleChange = (idx, val) => {
		if (status === "completed") return; // Prevent changes if exam is completed

		setValues((prev) => {
			const next = [...prev];
			next[idx] = val;
			return next;
		});
		const quoteId = quotes[idx]._id;
		if (answers.find((a) => a.questionId === quoteId)) {
			setAnswers((prev) => prev.map((a) => (a.questionId === quoteId ? { ...a, answer: val } : a)));
		} else {
			setAnswers((prev) => [...prev, { questionId: quoteId, answer: val, questionNum: 24 }]);
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
						<MultipleLines text={q.quote} />
					</Text>
					<InputAutofill value={values?.[idx] || ""} onChange={(val) => handleChange(idx, val)} list={litTopics} style={{ width: "100%", gridColumn: "2 / 3" }} />
					{status === "completed" && myAnswers?.[idx]?.points === 0 && (
						<Text style={{ gridColumn: "2/3", marginTop: "0.2rem" }} $weight="bold">
							Правилен отговор: {myAnswers[idx].correctAnswer}{" "}
						</Text>
					)}
					{status === "completed" && (
						<Text style={{ gridColumn: "2/3", marginTop: "0.8rem" }} $color={myAnswers?.[idx]?.points === 1 ? "green" : "red"}>
							{myAnswers?.[idx]?.points} / 1
						</Text>
					)}
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
	status: PropTypes.string, // Add status prop validation
};

export default QuestionQuotes;

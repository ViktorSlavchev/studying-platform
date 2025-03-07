import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Text from "../../ui/Text";
import Row from "../../ui/Row";
import IconWrapper from "../../ui/IconWrapper";
import Input from "../../ui/Input";

import InsertLetterSVG from "../../assets/svgs/InsertLetterSVG";
import ReplaceSVG from "../../assets/svgs/ReplaceSVG";
import RemoveSVG from "../../assets/svgs/RemoveSVG";

const ActionWrapper = styled(IconWrapper)`
	padding: 0.8rem;
	border-radius: var(--border-radius-sm);
	border: 1.5px solid var(--color-text-dark);
	cursor: pointer;
	transition: border 0.1s;
	${({ selected }) => (selected ? "border: 3px solid var(--color-brand);" : "border: 1.5px solid var(--color-text-dark)")}
`;

const StyledEditing = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	gap: 1.8rem;
	margin-top: 1.8rem;
`;

const StyledSpan = styled.span`
	color: var(--color-text-dark);
	${({ removed }) => removed && "text-decoration: line-through; color: red;"}
	${({ added }) => added && "color: var(--color-brand);"}
`;

function QuestionEditing({ question }) {
	const [text, setText] = useState(
		question.text.split("").map((l) => {
			return {
				value: l,
				state: "normal",
				visable: l.replaceAll("*", "\u00A0"),
			};
		})
	);

	const [mode, setMode] = useState(null);
	const [awaitingLetter, setAwaitingLetter] = useState(null);

	const handleLetterClick = (index) => {
		if (mode === "remove") {
			setText((prevText) => {
				return prevText
					.map((letter, i) => {
						if (i !== index) return letter;

						if (letter.state === "removed") {
							return { ...letter, state: "normal" };
						} else if (letter.state === "added") {
							return null;
						} else {
							return { ...letter, state: "removed" };
						}
					})
					.filter((x) => x);
			});
			return;
		}

		if (mode === "insert") {
			setAwaitingLetter(index);
			return;
		}
	};

	return (
		<StyledEditing>
			<Text>Поправете допуснатите {question.mistakesCnt} грешки в текста: </Text>
			<Text>
				{text.map((txt, ind) => (
					<StyledSpan key={ind} removed={txt.state === "removed"} added={txt.state === "added"} onClick={() => handleLetterClick(ind)}>
						{txt.visable}
					</StyledSpan>
				))}
			</Text>
			<Row gap="1.2rem" align="center" justify="center" alignself="center">
				<ActionWrapper color={mode === "insert" ? "var(--color-brand)" : "var(--color-text-dark)"} sz="lg" onClick={() => setMode("insert")} selected={mode === "insert"}>
					<InsertLetterSVG />
				</ActionWrapper>
				<ActionWrapper color={mode === "replace" ? "var(--color-brand)" : "var(--color-text-dark)"} sz="lg" onClick={() => setMode("replace")} selected={mode === "replace"}>
					<ReplaceSVG />
				</ActionWrapper>
				<ActionWrapper color={mode === "remove" ? "var(--color-brand)" : "var(--color-text-dark)"} sz="lg" onClick={() => setMode("remove")} selected={mode === "remove"}>
					<RemoveSVG />
				</ActionWrapper>
			</Row>

			{awaitingLetter && (
				<Row align="center" justify="center" alignself="center">
					<Input />
				</Row>
			)}
		</StyledEditing>
	);
}

QuestionEditing.propTypes = {
	question: PropTypes.shape({
		text: PropTypes.string.isRequired,
		mistakesCnt: PropTypes.number.isRequired,
	}).isRequired,
};

export default QuestionEditing;

import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { toast } from "react-hot-toast";

import Text from "../../ui/Text";
import Row from "../../ui/Row";
import IconWrapper from "../../ui/IconWrapper";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import InsertLetterSVG from "../../assets/svgs/InsertLetterSVG";
import ReplaceSVG from "../../assets/svgs/ReplaceSVG";
import RemoveSVG from "../../assets/svgs/RemoveSVG";

import { ArrowUturnLeftIcon, CheckIcon } from "@heroicons/react/24/outline";

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
	user-select: none;
`;

const StyledSpan = styled.span`
	color: var(--color-text-dark);
	cursor: pointer;
	position: relative;

	${({ removed }) => removed && "text-decoration: line-through; color: red;"}
	${({ added }) => added && "color: var(--color-brand);"}

	${({ hovermode }) =>
		hovermode === "replace" || hovermode === "remove"
			? `&:hover {
				text-decoration: line-through;
				color: red;
			}`
			: ""}

	${({ hovermode }) =>
		hovermode === "insert"
			? `&:hover::after {
				content: "∨";
				position: absolute;
				top: 0%;
				left: 100%;
				transform: translateX(-20%);
				font-size: 1rem;
				color: var(--color-brand);
			   }
			   &:hover {
				margin-right: 0.4rem;
			   }`
			: ""}
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
	const [inputValue, setInputValue] = useState("");
	const [history, setHistory] = useState([]);

	const [hoveredIndex, setHoveredIndex] = useState(null);

	const exportText = (txt = text) => {
		let result = "";
		txt.forEach((letter) => {
			if (letter.state !== "removed") {
				result += letter.value;
			}
		});

		// Optional: Clean up consecutive spaces like in the JS version
		return result.replace(/  +/g, " ");
	};

	const saveToHistory = () => {
		setHistory((prevHistory) => [...prevHistory, JSON.stringify(text)]);
	};

	const handleUndo = () => {
		if (history.length === 0) return;

		// Get the last state from history
		const lastState = history[history.length - 1];

		// Update text to previous state
		setText(JSON.parse(lastState));

		// Remove the last state from history
		setHistory((prev) => prev.slice(0, -1));

		// Clear input state if active
		if (awaitingLetter !== null) {
			setAwaitingLetter(null);
			setInputValue("");
		}
	};

	const handleLetterClick = (index) => {
		if (mode != "insert") saveToHistory();

		// Handle removal mode
		if (mode === "remove") {
			const nextText = text
				.map((letter, i) => {
					if (i !== index) return letter;

					if (letter.state === "removed") {
						return { ...letter, state: "normal" };
					} else if (letter.state === "added") {
						return null;
					} else if (letter.value !== " ") {
						return { ...letter, state: "removed" };
					}

					return { ...letter };
				})
				.filter((x) => x);

			if (exportText(nextText).split(" ").length !== question.text.split(" ").length) {
				toast.error("Не може да премахвате цели думи.");
				return;
			}
			return setText(nextText);
		}

		// Handle insert mode
		if (mode === "insert") {
			setAwaitingLetter(index);
			return;
		}

		// Handle replace mode
		if (mode === "replace") {
			let removingSpace = false;

			const nextText = text
				.map((letter, i) => {
					if (i !== index) return letter;

					if (letter.state === "removed") {
						return { ...letter, state: "normal" };
					} else if (letter.state === "added") {
						return null;
					} else if (letter.value !== " ") {
						return { ...letter, state: "removed" };
					}

					removingSpace = true;
					return { ...letter };
				})
				.filter((x) => x);

			if (exportText(nextText).split(" ").length !== question.text.split(" ").length || removingSpace) {
				toast.error("Не може да премахвате цели думи.");
				return;
			}

			setText(nextText);
			setAwaitingLetter(index);
			return;
		}
	};

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleInputKeyDown = (e) => {
		if (e.key === "Enter" && inputValue.length > 0) {
			insertLetter();
		}
	};

	const insertLetter = () => {
		if (awaitingLetter === null || inputValue.length === 0) return;
		if (hoveredIndex === -1) return;

		saveToHistory();

		setText((prevText) => {
			const newText = [...prevText];
			const letterToInsert = {
				value: inputValue.replaceAll(" ", "*"),
				state: "added",
				visable: inputValue.replaceAll("*", "\u00A0"),
			};

			// Find the actual position to insert the new letter
			// We need to find the last non-removed letter before or at awaitingLetter index
			let insertIndex = awaitingLetter;

			// Insert after the selected character
			insertIndex = insertIndex + 1;

			newText.splice(insertIndex, 0, letterToInsert);
			return newText;
		});

		setInputValue("");
		setAwaitingLetter(null);
	};

	const handleSubmitLetter = () => {
		insertLetter();
	};

	return (
		<>
			<StyledEditing>
				<Text>Поправете допуснатите {question.mistakesCnt} грешки в текста: </Text>
				<Text>
					{text.map((txt, ind) => {
						if (txt.state === "removed" && (txt.value === "*" || txt.value === "-")) {
							return null;
						}

						return (
							<StyledSpan key={ind} removed={txt.state === "removed" ? true.toString() : undefined} added={txt.state === "added" ? true.toString() : undefined} hovermode={mode} onMouseEnter={() => setHoveredIndex(ind)} onMouseLeave={() => setHoveredIndex(null)} onClick={() => handleLetterClick(ind)}>
								{txt.visable}
							</StyledSpan>
						);
					})}
				</Text>
				<Row gap="1.2rem" align="center" justify="center" alignself="center">
					<ActionWrapper color="var(--color-text-dark)" sz="lg" onClick={handleUndo} disabled={history.length === 0} style={{ opacity: history.length === 0 ? 0.5 : 1 }}>
						<ArrowUturnLeftIcon />
					</ActionWrapper>

					<ActionWrapper
						color={mode === "insert" ? "var(--color-brand)" : "var(--color-text-dark)"}
						sz="lg"
						onClick={() => {
							setMode("insert");
							setInputValue("");
							setAwaitingLetter(null);
						}}
						selected={mode === "insert"}
					>
						<InsertLetterSVG />
					</ActionWrapper>
					<ActionWrapper
						color={mode === "replace" ? "var(--color-brand)" : "var(--color-text-dark)"}
						sz="lg"
						onClick={() => {
							setMode("replace");
							setInputValue("");
							setAwaitingLetter(null);
						}}
						selected={mode === "replace"}
					>
						<ReplaceSVG />
					</ActionWrapper>
					<ActionWrapper
						color={mode === "remove" ? "var(--color-brand)" : "var(--color-text-dark)"}
						sz="lg"
						onClick={() => {
							setMode("remove");
							setInputValue("");
							setAwaitingLetter(null);
						}}
						selected={mode === "remove"}
					>
						<RemoveSVG />
					</ActionWrapper>
				</Row>

				{awaitingLetter !== null && (
					<Row align="center" justify="center" alignself="center" gap="1rem">
						<Input value={inputValue} onChange={handleInputChange} onKeyDown={handleInputKeyDown} autoFocus placeholder="Въведете буква" maxLength={1} />
						<Button onClick={handleSubmitLetter} type="circle">
							<IconWrapper>
								<CheckIcon />
							</IconWrapper>
						</Button>
					</Row>
				)}
			</StyledEditing>
		</>
	);
}

QuestionEditing.propTypes = {
	question: PropTypes.shape({
		text: PropTypes.string.isRequired,
		mistakesCnt: PropTypes.number.isRequired,
	}).isRequired,
};

export default QuestionEditing;

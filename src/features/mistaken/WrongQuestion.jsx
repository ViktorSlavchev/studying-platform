import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import InfoBox from "../../ui/InfoBox";
import QuestionOptions from "../exam/QuestionOptions";
import Text from "../../ui/Text";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import QuestionShortAnswer from "../exam/QuestionShortAnswer";
import QuestionEditing from "../exam/QuestionEditing";
import QuestionReading from "../exam/QuestionReading";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";

import IconWrapper from "../../ui/IconWrapper";

const StyledQuestion = styled(InfoBox)`
	display: flex;
	gap: 1rem;
	flex-direction: column;
	padding-top: 1.6rem;
	padding-bottom: 1.6rem;
	margin-bottom: 2.4rem;
`;

const CASpan = styled.span`
	font-weight: 700;
`;

const ActionButtons = styled(Row)`
	margin-top: 1.6rem;
	padding-top: 1.6rem;
	border-top: 1px solid var(--color-border);
`;

const CheckButton = styled(Button)`
	background-color: var(--color-brand);

	&:hover {
		background-color: var(--color-brand-600);
	}
`;

const DeleteButton = styled(Button)`
	background-color: var(--color-red);
	color: white;

	font-size: 1.6rem;

	display: flex;

	align-items: center;
	justify-content: center;
	gap: 0.8rem;

	padding: 1rem;
	&:hover {
		background-color: var(--color-red-700);
	}
`;

function WrongQuestion({ question, num, onDelete }) {
	const [userAnswer, setUserAnswer] = useState(() => {
		if (question.type === "options" || question.type === "shortAnswer") {
			return "";
		}
		return {
			exportedText: question.text,
			stateText: question.text.split("").map((l) => {
				return {
					value: l,
					state: "normal",
					visable: l.replaceAll("*", "\u00A0"),
				};
			}),
		};
	});
	const [isChecked, setIsChecked] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);

	// Check if user has provided an answer
	const hasAnswer = () => {
		if (question.type === "options" || question.type === "shortAnswer") {
			return userAnswer.trim() !== "";
		}
		if (question.type === "editing") {
			return userAnswer && typeof userAnswer === "object";
		}
		return false;
	};

	// Get the correct answer based on question type
	const getCorrectAnswer = () => {
		if (question.type === "options") {
			return question.answer || question.options?.[0];
		}
		if (question.type === "shortAnswer") {
			return question.answer;
		}
		if (question.type === "editing") {
			return question.answer;
		}
		return "";
	};

	// Check if the user's answer is correct
	const checkAnswer = () => {
		const correctAnswer = getCorrectAnswer();
		let correct = false;

		if (question.type === "options" || question.type === "shortAnswer") {
			correct = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
		} else if (question.type === "editing") {
			// For editing questions, we need to check the exported text
			const exportedText = userAnswer?.exportedText || "";
			correct = exportedText === correctAnswer;
		}

		setIsCorrect(correct);
		setIsChecked(true);
	};

	const handleAnswerChange = (answer) => {
		setUserAnswer(answer);
		setIsChecked(false); // Reset check status when answer changes
	};

	return (
		<StyledQuestion>
			{question.type !== "reading" && <Text $weight={"bold"}>{num} задача.</Text>}

			{question.type === "options" && <QuestionOptions question={question} answer={userAnswer} onAnswer={handleAnswerChange} />}

			{question.type === "shortAnswer" && <QuestionShortAnswer question={question} answer={userAnswer} onAnswer={handleAnswerChange} />}

			{question.type === "editing" && <QuestionEditing status="in-progress" question={question} answer={userAnswer} onAnswer={handleAnswerChange} />}

			{question.type === "reading" && <QuestionReading question={question} />}

			{/* Show correct answer if checked and wrong */}
			{isChecked && !isCorrect && question.type !== "reading" && (
				<Text>
					<CASpan>Правилен отговор:</CASpan> {getCorrectAnswer()}
				</Text>
			)}

			{/* Show result if checked */}
			{isChecked && question.type !== "reading" && (
				<Text $weight="bold" $color={isCorrect ? "green" : "red"}>
					{isCorrect ? "✓ Правилно!" : "✗ Грешно"}
				</Text>
			)}

			{/* Action buttons */}
			{question.type !== "reading" && (
				<ActionButtons $gap="1.2rem" $justify="flex-start">
					{/* Check button - show only if user has answered and hasn't checked yet */}
					{hasAnswer() && !isChecked && (
						<CheckButton onClick={checkAnswer}>
							<CheckIcon style={{ width: "1.6rem", height: "1.6rem", marginRight: "0.8rem" }} />
							Провери
						</CheckButton>
					)}

					{/* Delete button - show only if checked and correct */}
					{isChecked && isCorrect && (
						<DeleteButton onClick={() => onDelete && onDelete(question._id)}>
							<IconWrapper style={{ fontSize: "2rem" }}>
								<TrashIcon />
							</IconWrapper>
							Премахни
						</DeleteButton>
					)}
				</ActionButtons>
			)}
		</StyledQuestion>
	);
}

WrongQuestion.propTypes = {
	question: PropTypes.shape({
		type: PropTypes.string.isRequired,
		_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		answer: PropTypes.string,
		options: PropTypes.array,
		text: PropTypes.string,
	}).isRequired,
	num: PropTypes.number.isRequired,
	onDelete: PropTypes.func,
};

export default WrongQuestion;

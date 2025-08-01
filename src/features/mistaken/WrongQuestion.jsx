import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import InfoBox from "../../ui/InfoBox";
import Text from "../../ui/Text";

import { useReading } from "./useReading";
import { useQuestionState } from "./useQuestionState";
import { questionNeedsReading } from "../../utils/questionHelpers";
import QuestionRenderer from "./QuestionRenderer";
import QuestionFeedback from "./QuestionFeedback";
import QuestionActions from "./QuestionActions";
import ReadingTextModal from "./ReadingTextModal";

const StyledQuestion = styled(InfoBox)`
	display: flex;
	gap: 1rem;
	flex-direction: column;
	padding-top: 1.6rem;
	padding-bottom: 1.6rem;
	margin-bottom: 2.4rem;
	position: relative;
`;

function WrongQuestion({ question, num, onDelete, isDeleting }) {
	const [showReading, setShowReading] = useState(false);

	// Question state management
	const { userAnswer, isChecked, isCorrect, hasAnswer, correctAnswer, handleAnswerChange, checkAnswer } = useQuestionState(question);

	const needsReading = questionNeedsReading(question);
	const { reading, isLoading: isLoadingReading } = useReading(needsReading ? question.parentReading : null);

	return (
		<>
			<StyledQuestion>
				{/* Reading button for text analysis questions */}
				<ReadingTextModal needsReading={needsReading} isLoadingReading={isLoadingReading} showReading={showReading} setShowReading={setShowReading} reading={reading} />

				{/* Question number */}
				<Text $weight="bold">{num} задача.</Text>

				{/* Question renderer */}
				<QuestionRenderer question={question} answer={userAnswer} onAnswer={handleAnswerChange} />

				{/* Correct answer */}
				<QuestionFeedback isChecked={isChecked} isCorrect={isCorrect} correctAnswer={correctAnswer} />

				{/* Delete / Check buttons */}
				<QuestionActions hasAnswer={hasAnswer()} isChecked={isChecked} isCorrect={isCorrect} onCheck={checkAnswer} onDelete={onDelete} isDeleting={isDeleting} questionId={question._id} />
			</StyledQuestion>
		</>
	);
}

WrongQuestion.propTypes = {
	question: PropTypes.shape({
		type: PropTypes.string.isRequired,
		_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		answer: PropTypes.string,
		options: PropTypes.array,
		text: PropTypes.string,
		topic: PropTypes.string,
		parentReading: PropTypes.string,
		correctAnswer: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	}).isRequired,
	num: PropTypes.number.isRequired,
	onDelete: PropTypes.func,
	isDeleting: PropTypes.bool,
};

export default WrongQuestion;

import PropTypes from "prop-types";
import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import QuestionHolder from "./QuestionHolder";
import Question from "./Question";
import QuestionQuotes from "./QuestionQuotes";
import QuestionLongAnswer from "./QuestionLongAnswer";
import TimeLeftBox from "./TimeLeftBox";
import Text from "../../ui/Text";
import { useEffect, useState } from "react";
import { formatTimeLeft } from "../../utils/formatDuration";

const ExamContainer = styled.div`
	width: 100%;
	max-width: 100%;
	position: relative;

	@media (max-width: 768px) {
		padding: 0;
		margin: 0;
	}
`;

const MainRow = styled(Row)`
	width: 100%;
	max-width: 100%;
	align-items: flex-start;

	margin-top: 1.2rem;

	@media (max-width: 768px) {
		flex-direction: column !important;
		gap: 0 !important;
		width: 100% !important;
		max-width: 100% !important;
	}
`;

const RightColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	align-self: flex-start;
	position: sticky;
	top: 2rem;
	height: fit-content;

	@media (max-width: 768px) {
		display: none;
	}
`;

const MobileExamHeader = styled.div`
	display: none;

	@media (max-width: 768px) {
		display: block;
		position: sticky;
		top: -1rem;
		left: 0;
		right: 0;
		background: var(--bg-color);
		border-bottom: 2px solid var(--color-border);
		padding: 1rem;
		margin: 0 0 2rem 0;
		z-index: 1000;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		width: 100%;
		border-radius: var(--border-radius-sm);
	}

	@media (max-width: 479px) {
		padding: 0.8rem;
		margin: 0 0 1.5rem 0;
	}
`;

const MobileTimeInfo = styled(Row)`
	justify-content: space-between;
	align-items: center;
	width: 100%;
	gap: 1rem;

	@media (max-width: 479px) {
		gap: 0.5rem;
	}
`;

const MobileFloatingButton = styled.div`
	display: none;

	@media (max-width: 768px) {
		display: block;
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		z-index: 50;
	}

	@media (max-width: 479px) {
		bottom: 1.5rem;
		right: 1.5rem;
	}
`;

function MobileTimeDisplay({ status, startedAt, answeredQuestionsCount, score }) {
	const [now, setNow] = useState(new Date());
	const formatedTimeLeft = formatTimeLeft(startedAt, now);
	const isCriticalTime = +formatedTimeLeft.slice(0, 2) < 5;

	useEffect(() => {
		if (status === "completed") return;

		const interval = setInterval(() => {
			setNow(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, [status]);

	return (
		<MobileTimeInfo>
			<Text $size="1.4rem" $weight="bold">
				{status === "completed" ? "Завършил" : <span style={{ color: isCriticalTime ? "var(--color-red)" : "var(--color-text-dark)" }}>⏰ {formatedTimeLeft}</span>}
			</Text>
			<Text $size="1.4rem" $weight="bold">
				{status === "completed" ? `${score} / 65 точки` : `${answeredQuestionsCount} / 25`}
			</Text>
		</MobileTimeInfo>
	);
}

function ExamLayout({ exam, answers, setAnswers, answeredQuestionsCount, onSubmit, isSubmitting }) {
	const handleSubmit = () => {
		const confirmSubmit = window.confirm(`Сигурни ли сте, че искате да предадете изпита?\n\nОтговорили сте на ${answeredQuestionsCount} от 25 въпроса.\n\nСлед предаване няма да можете да правите промени.`);

		if (confirmSubmit) {
			onSubmit();
		}
	};

	return (
		<ExamContainer>
			<Heading style={{ marginBottom: "1.2rem" }}>Изпит #1</Heading>

			{/* Mobile sticky header */}
			<MobileExamHeader>
				<MobileTimeDisplay status={exam.status} startedAt={exam.startedAt} answeredQuestionsCount={answeredQuestionsCount} score={exam.points || 0} />
			</MobileExamHeader>

			<MainRow $gap="3.2rem">
				<QuestionHolder style={{ flex: 2, minWidth: "0", width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
					{/* Regular questions */}
					{exam.questions.map((question, ind) => (
						<Question key={question._id} question={question} num={ind} answers={answers} setAnswers={setAnswers} status={exam.status} />
					))}

					{/* Quote questions */}
					{exam.quotes?.length > 0 && <QuestionQuotes quotes={exam.quotes.slice(0, 4)} answers={answers} setAnswers={setAnswers} status={exam.status} />}

					{/* Long answer question */}
					{exam.quotes?.length > 0 && <QuestionLongAnswer question={exam.quotes.slice(-1)[0]} answers={answers} setAnswers={setAnswers} status={exam.status} />}
				</QuestionHolder>

				{/* Desktop sidebar */}
				<RightColumn style={{ flex: 1, minWidth: "0" }}>
					<TimeLeftBox status={exam.status} startedAt={exam.startedAt} answeredQuestionsCount={answeredQuestionsCount} score={exam.points || 0} />

					{exam.status !== "completed" && (
						<Button onClick={handleSubmit} disabled={isSubmitting}>
							{isSubmitting ? <SpinnerMini /> : "Предай"}
						</Button>
					)}
				</RightColumn>
			</MainRow>

			{/* Mobile floating submit button */}
			{exam.status !== "completed" && (
				<MobileFloatingButton>
					<Button onClick={handleSubmit} disabled={isSubmitting}>
						{isSubmitting ? <SpinnerMini /> : "Предай"}
					</Button>
				</MobileFloatingButton>
			)}
		</ExamContainer>
	);
}

MobileTimeDisplay.propTypes = {
	status: PropTypes.string.isRequired,
	startedAt: PropTypes.string.isRequired,
	answeredQuestionsCount: PropTypes.number.isRequired,
	score: PropTypes.number.isRequired,
};

ExamLayout.propTypes = {
	exam: PropTypes.shape({
		_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		status: PropTypes.string.isRequired,
		startedAt: PropTypes.string.isRequired,
		questions: PropTypes.array.isRequired,
		quotes: PropTypes.array,
		points: PropTypes.number,
	}).isRequired,
	answers: PropTypes.array.isRequired,
	setAnswers: PropTypes.func.isRequired,
	answeredQuestionsCount: PropTypes.number.isRequired,
	onSubmit: PropTypes.func.isRequired,
	isSubmitting: PropTypes.bool,
};

export default ExamLayout;

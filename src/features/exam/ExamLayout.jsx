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

const RightColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	align-self: flex-start;
	position: sticky;
	top: 2rem;
`;

function ExamLayout({ exam, answers, setAnswers, answeredQuestionsCount, onSubmit, isSubmitting }) {
	return (
		<>
			<Heading>Изпит #{exam._id}</Heading>
			<Row $gap="3.2rem">
				<QuestionHolder style={{ flex: 2, minWidth: "0" }}>
					{/* Regular questions */}
					{exam.questions.map((question, ind) => (
						<Question key={question._id} question={question} num={ind} answers={answers} setAnswers={setAnswers} status={exam.status} />
					))}

					{/* Quote questions */}
					{exam.quotes?.length > 0 && <QuestionQuotes quotes={exam.quotes.slice(0, 4)} answers={answers} setAnswers={setAnswers} status={exam.status} />}

					{/* Long answer question */}
					{exam.quotes?.length > 0 && <QuestionLongAnswer question={exam.quotes.slice(-1)[0]} answers={answers} setAnswers={setAnswers} status={exam.status} />}
				</QuestionHolder>

				<RightColumn style={{ flex: 1, minWidth: "0" }}>
					<TimeLeftBox status={exam.status} startedAt={exam.startedAt} answeredQuestionsCount={answeredQuestionsCount} score={exam.points || 0} />

					{exam.status !== "completed" && (
						<Button onClick={onSubmit} disabled={isSubmitting}>
							{isSubmitting ? <SpinnerMini /> : "Предай"}
						</Button>
					)}
				</RightColumn>
			</Row>
		</>
	);
}

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

import { useParams } from "react-router";
import styled from "styled-components";

import Heading from "../ui/Heading";
import QuestionHolder from "../features/exam/QuestionHolder";
import Question from "../features/exam/Question";
import Row from "../ui/Row";
import Button from "../ui/Button";
import TimeLeftBox from "../features/exam/TimeLeftBox";
import { useExam } from "../features/exam/useExam";
import Spinner from "../ui/Spinner";
import SpinnerMini from "../ui/SpinnerMini";
import { useEffect, useState } from "react";
import QuestionQuotes from "../features/exam/QuestionQuotes";
import { useSubmit } from "../features/exam/useSubmit";

const RightColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;

	align-self: flex-start;
	position: sticky;
	top: 2rem;
`;

function Exam() {
	const { id } = useParams();
	const { exam, isLoading } = useExam(id);
	const { submit, isLoading: isLoadingSubmit } = useSubmit();

	const [answers, setAnswers] = useState([]); // {questionId: string, answer: string, questionNum: number}[]

	const handleSubmit = () => {
		submit({ id, answers });
	};

	useEffect(() => {
		if (exam && exam.questions) {
			if (exam.status === "completed") {
				setAnswers(exam.answers);
				return;
			}
			const initialAnswers = exam.questions.map((question, index) => ({
				questionId: question["_id"],
				answer: "",
				questionNum: index,
			}));
			setAnswers(initialAnswers);
		}
	}, [exam]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Heading>Изпит #{id}</Heading>
			<Row $gap="3.2rem">
				<QuestionHolder style={{ flex: 2, minWidth: "0" }}>
					{exam.questions.map((question, ind) => (
						<Question key={question["_id"]} question={question} num={ind} answers={answers} setAnswers={setAnswers} status={exam.status} />
					))}
					{<QuestionQuotes quotes={exam.quotes} answers={answers} setAnswers={setAnswers} />}
				</QuestionHolder>

				<RightColumn style={{ flex: 1, minWidth: "0" }}>
					<TimeLeftBox status={exam.status} startedAt={exam.startedAt} />
					<Button onClick={handleSubmit}>{isLoadingSubmit ? <SpinnerMini /> : "Предай"}</Button>
				</RightColumn>
			</Row>
		</>
	);
}

export default Exam;

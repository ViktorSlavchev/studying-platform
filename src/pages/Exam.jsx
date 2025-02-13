import { useParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { getQuestions } from "../utils/getQuestions";

import Heading from "../ui/Heading";
import QuestionHolder from "../features/exam/QuestionHolder";
import Question from "../features/exam/Question";
import Row from "../ui/Row";
import Button from "../ui/Button";
import TimeLeftBox from "../features/exam/TimeLeftBox";

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
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		setQuestions(getQuestions(id));
	}, [id]);

	console.log(questions);
	return (
		<>
			<Heading>Изпит #{id}</Heading>
			<Row gap="3.2rem">
				<QuestionHolder>
					{questions.map((question, ind) => (
						<Question key={question["_id"]} question={question} num={ind + 1} />
					))}
				</QuestionHolder>

				<RightColumn>
					<TimeLeftBox />
					<Button>Предай</Button>
				</RightColumn>
			</Row>
		</>
	);
}

export default Exam;

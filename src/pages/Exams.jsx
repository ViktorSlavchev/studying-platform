import styled from "styled-components";

import Heading from "../ui/Heading";
import Text from "../ui/Text";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Breakpoints from "../styles/breakpoints";
import InstructionsBox from "../features/exams/InstructionsBox";
import TableExams from "../features/exams/TableExams";
import { useExamHistory } from "../features/exams/useExamHistory";
import { useNavigate } from "react-router";

const EntireRow = styled.div`
	display: flex;
	gap: 10rem;

	margin-bottom: 6.4rem;

	@media (max-width: ${Breakpoints.xl}px) {
		gap: 7rem;
	}

	@media (max-width: ${Breakpoints.lg}px) {
		gap: 5rem;
	}

	@media (max-width: ${Breakpoints.md}px) {
		gap: 3rem;
	}
`;

function Exams() {
	const { examsHistory, isLoading } = useExamHistory();
	const activeExamId = examsHistory?.find((exam) => exam.status === "active")?.id;
	const navigate = useNavigate();

	const handleStartExam = () => {
		if (activeExamId) {
			navigate("/exam/" + activeExamId, { replace: true });
		} else {
			alert("Започни изпита тук! (функционалността е в процес на разработка)");
		}
	};

	return (
		<>
			<Heading>Пробни изпити</Heading>
			<EntireRow>
				<Row $direction="column" $justify="space-evenly">
					<Text>От бутона отдолу можеш да започнеш пробен изпит по формата на първия модул на НВО. Той включва текст за четене с разбиране, въпроси по български език, литература, текст за редактиране и коментар на цитат от изучавано произведение.</Text>
					<Button onClick={handleStartExam}>{activeExamId ? "Продължи" : "Започни сега"}</Button>
				</Row>
				<InstructionsBox />
			</EntireRow>
			<Heading as="h2">Предишни изпити</Heading>
			<TableExams examsHistory={examsHistory || []} isLoading={isLoading} />
		</>
	);
}

export default Exams;

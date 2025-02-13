import styled from "styled-components";

import Heading from "../ui/Heading";
import Text from "../ui/Text";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Breakpoints from "../styles/breakpoints";
import InstructionsBox from "../features/exams/InstructionsBox";
import TableExams from "../features/exams/TableExams";

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
	return (
		<>
			<Heading>Пробни изпити</Heading>
			<EntireRow>
				<Row direction="column" justify="space-evenly">
					<Text>От бутона отдолу можеш да започнеш пробен изпит по формата на първия модул на НВО. Той включва текст за четене с разбиране, въпроси по български език, литература, текст за редактиране и коментар на цитат от изучавано произведение.</Text>
					<Button onClick={() => alert("hah")}>Започни сега</Button>
				</Row>
				<InstructionsBox />
			</EntireRow>
			<Heading as="h2">Предишни изпити</Heading>
			<TableExams />
		</>
	);
}

export default Exams;

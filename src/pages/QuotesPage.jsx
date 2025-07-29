import styled from "styled-components";
import Heading from "../ui/Heading";
import Breakpoints from "../styles/breakpoints";
import Row from "../ui/Row";
import Text from "../ui/Text";
import Button from "../ui/Button";
import InstructionBox from "../features/quotes/InstructionBox";

import ResultsChart from "../features/quotes/ResultsChart";
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

function QuotesPage() {
	const navigate = useNavigate();

	return (
		<>
			<Heading>Цитати</Heading>
			<EntireRow>
				<Row $direction="column" $justify="space-evenly">
					<Text>От бутона отдолу можеш да започнеш игра с цитати и описания на герои или произведения, които трябва да познаеш. Разбери колко е най-високият резултат, който можеш да постигнеш за 3 минути.</Text>
					<Button onClick={() => navigate("game")}>Започни сега</Button>
				</Row>
				<InstructionBox />
			</EntireRow>
			<ResultsChart />
		</>
	);
}

export default QuotesPage;

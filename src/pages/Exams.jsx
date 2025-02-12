import styled from "styled-components";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

import Heading from "../ui/Heading";
import Text from "../ui/Text";
import Row from "../ui/Row";
import Button from "../ui/Button";
import InfoBox from "../ui/InfoBox";
import SLink from "../ui/SLink";
import IconWrapper from "../ui/IconWrapper";
import Breakpoints from "../styles/breakpoints";
import Center from "../ui/Center";
import Table from "../ui/Table";

const HeadingHolder = styled.div`
	margin-bottom: 2.8rem;
`;

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

const dummyExams = [
	{
		id: 123,
		timestamp: "2025-02-12",
		time: 44,
		score: 25,
	},
	{
		id: 156,
		timestamp: "2025-01-31",
		time: 32,
		score: 40,
	},
	{
		id: 120,
		timestamp: "2025-02-11",
		time: 42,
		score: 65,
	},
	{
		id: 99,
		timestamp: "2025-02-09",
		time: 52,
		score: 63,
	},

	{
		id: 300,
		timestamp: "2025-01-19",
		time: 30,
		score: 33,
	},
].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
function Exams() {
	return (
		<>
			<Heading>Пробни изпити</Heading>
			<EntireRow>
				<Row direction="column" justify="space-evenly">
					<Text>От бутона отдолу можеш да започнеш пробен изпит по формата на първия модул на НВО. Той включва текст за четене с разбиране, въпроси по български език, литература, текст за редактиране и коментар на цитат от изучавано произведение.</Text>
					<Button onClick={() => alert("hah")}>Започни сега</Button>
				</Row>
				<InfoBox>
					<HeadingHolder>
						<Heading as="h2" textalign="center">
							Формат
						</Heading>
					</HeadingHolder>
					<HeadingHolder>
						<Text>
							Време:{" "}
							<Text textstyle="italic" as="span">
								60 мин
							</Text>
						</Text>
						<Text>
							Брой задачи:{" "}
							<Text textstyle="italic" as="span">
								25
							</Text>
						</Text>
						<Text>
							Включени произведения:{" "}
							<Text textstyle="italic" as="span">
								от 5 клас, от 6 клас, от 7 клас - до Опълченците на Шипка
							</Text>
						</Text>
					</HeadingHolder>
					<Center>
						<SLink to="/" align="center">
							<Center>
								<span>Промени произведенията </span>
								<IconWrapper inheritsize={"true"}>
									<ChevronRightIcon />
								</IconWrapper>
							</Center>
						</SLink>
					</Center>
				</InfoBox>
			</EntireRow>
			<Heading as="h2">Предишни изпити</Heading>
			<Table columns="1fr 1fr 1fr 1fr">
				<Table.Header>
					<div>Опит</div>
					<div>Дата</div>
					<div>Време</div>
					<div>Резултат</div>
				</Table.Header>
				<Table.Body
					data={dummyExams}
					render={(exam, ind, { length: len }) => {
						return (
							<Table.Row key={exam.id}>
								<div>
									<SLink to={`/exam/${exam.id}`}>Изпит {len - ind}</SLink>
								</div>
								<div>{exam.timestamp}</div>
								<div>{exam.time} мин</div>
								<div>{exam.score} точки</div>
							</Table.Row>
						);
					}}
				></Table.Body>
			</Table>
		</>
	);
}

export default Exams;

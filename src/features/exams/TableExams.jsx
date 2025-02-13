import SLink from "../../ui/SLink";
import Table from "../../ui/Table";

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

function TableExams() {
	return (
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
	);
}

export default TableExams;

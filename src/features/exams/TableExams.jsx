import PropTypes from "prop-types";

import SLink from "../../ui/SLink";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";

import dayjs from "../../utils/dayjs";
import { formatDuration } from "../../utils/formatDuration";

function TableExams({ examsHistory, isLoading }) {
	if (isLoading || !examsHistory) {
		return <Spinner />;
	}

	return (
		<Table columns="1fr 1fr 1fr 1fr">
			<Table.Header>
				<div>Опит</div>
				<div>Дата</div>
				<div>Време</div>
				<div>Резултат</div>
			</Table.Header>
			<Table.Body
				data={[...examsHistory.filter((exam) => exam.status !== "active").sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt))]}
				render={(exam, ind, { length: len }) => {
					return (
						<Table.Row key={exam.id}>
							<div>
								<SLink to={`/exam/${exam.id}`}>Изпит {len - ind}</SLink>
							</div>
							<div>{dayjs(exam.startedAt).fromNow()}</div>
							<div>{formatDuration(exam.startedAt, exam.endedAt)}</div>
							<div>{exam.points} точки</div>
						</Table.Row>
					);
				}}
			></Table.Body>
		</Table>
	);
}

TableExams.propTypes = {
	examsHistory: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

export default TableExams;

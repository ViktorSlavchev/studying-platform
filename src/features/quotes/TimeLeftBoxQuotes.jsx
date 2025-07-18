import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { formatTimeLeft } from "../../utils/formatDuration";

import InfoBox from "../../ui/InfoBox";
import Text from "../../ui/Text";
import Center from "../../ui/Center";
import Row from "../../ui/Row";

function TimeLeftBox({ startedAt, status, score }) {
	const [now, setNow] = useState(new Date());
	const formatedTimeLeft = formatTimeLeft(startedAt, now, 3);
	const isCriticalTime = +formatedTimeLeft.slice(0, 2) === 0 && +formatedTimeLeft.slice(3, 5) <= 15;

	useEffect(() => {
		if (status === "completed") return;

		const interval = setInterval(() => {
			setNow(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, [status]);

	return (
		<InfoBox>
			<Center>
				<Row $direction="column" $gap="1.6rem">
					<Row $direction="column" $gap="0.2rem">
						<Text>Оставащо време:</Text>
						{status === "completed" ? (
							<Text $size="2.4rem" $weight="bold">
								Завършил
							</Text>
						) : (
							<Text $size="2.4rem" $color={isCriticalTime ? "red" : "dark"}>
								{formatedTimeLeft}
							</Text>
						)}
					</Row>

					<Text>
						{score} точк{score === 1 ? "а" : "и"}
					</Text>
				</Row>
			</Center>
		</InfoBox>
	);
}

TimeLeftBox.propTypes = {
	startedAt: PropTypes.any,
	status: PropTypes.string.isRequired,
	answeredQuestionsCount: PropTypes.number.isRequired,
	score: PropTypes.number,
};

export default TimeLeftBox;

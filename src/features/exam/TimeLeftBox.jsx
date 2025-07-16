import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { formatTimeLeft } from "../../utils/formatDuration";

import InfoBox from "../../ui/InfoBox";
import Text from "../../ui/Text";
import Center from "../../ui/Center";
import Row from "../../ui/Row";

function TimeLeftBox({ startedAt, status, answeredQuestionsCount }) {
	const [now, setNow] = useState(new Date());

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
							<Text $size="2.4rem">{formatTimeLeft(startedAt, now)}</Text>
						)}
					</Row>

					{status !== "completed" && <Text>{answeredQuestionsCount} / 25 задачи</Text>}
				</Row>
			</Center>
		</InfoBox>
	);
}

TimeLeftBox.propTypes = {
	startedAt: PropTypes.any,
	status: PropTypes.string.isRequired,
	answeredQuestionsCount: PropTypes.number.isRequired,
};

export default TimeLeftBox;

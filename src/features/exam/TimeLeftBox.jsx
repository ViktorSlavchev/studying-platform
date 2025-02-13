import InfoBox from "../../ui/InfoBox";
import Text from "../../ui/Text";
import Center from "../../ui/Center";
import Row from "../../ui/Row";

function TimeLeftBox() {
	return (
		<InfoBox>
			<Center>
				<Row direction="column" gap="1.6rem">
					<Row direction="column" gap="0.2rem">
						<Text>Оставащо време</Text>
						<Text size="2.4rem">36:03</Text>
					</Row>
					<Text>7 / 25 задачи</Text>
				</Row>
			</Center>
		</InfoBox>
	);
}

export default TimeLeftBox;

import styled from "styled-components";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

import InfoBox from "../../ui/InfoBox";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import Center from "../../ui/Center";
import SLink from "../../ui/SLink";
import IconWrapper from "../../ui/IconWrapper";

const HeadingHolder = styled.div`
	margin-bottom: 2.8rem;
`;

function InstructionsBox() {
	return (
		<InfoBox>
			<HeadingHolder>
				<Heading as="h2" $textalign="center">
					Формат
				</Heading>
			</HeadingHolder>
			<HeadingHolder>
				<Text>
					Време:{" "}
					<Text $textstyle="italic" as="span">
						60 мин
					</Text>
				</Text>
				<Text>
					Брой задачи:{" "}
					<Text $textstyle="italic" as="span">
						25
					</Text>
				</Text>
				<Text>
					Включени произведения:{" "}
					<Text $textstyle="italic" as="span">
						от 5 клас, от 6 клас, от 7 клас - до Опълченците на Шипка
					</Text>
				</Text>
			</HeadingHolder>
			<Center>
				<SLink to="/settings" $align="center">
					<span>Промени произведенията </span>
					<IconWrapper $inheritsize={"true"}>
						<ChevronRightIcon />
					</IconWrapper>
				</SLink>
			</Center>
		</InfoBox>
	);
}

export default InstructionsBox;

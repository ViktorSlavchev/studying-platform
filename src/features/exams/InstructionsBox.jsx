import styled from "styled-components";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

import Breakpoints from "../../styles/breakpoints";
import InfoBox from "../../ui/InfoBox";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import Center from "../../ui/Center";
import SLink from "../../ui/SLink";
import IconWrapper from "../../ui/IconWrapper";

import { useUser } from "../authentication/useUser";
import includedWorkString from "../../utils/includedWorkString";

const HeadingHolder = styled.div`
	margin-bottom: 2.8rem;

	&:not(:first-child) {
		margin-bottom: 2rem;
	}

	/* Better spacing on mobile */
	@media (max-width: 768px) {
		margin-bottom: 2rem;

		&:not(:first-child) {
			margin-bottom: 1.5rem;
		}
	}
`;

const InfoSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	margin-bottom: 1.5rem;

	@media (max-width: 768px) {
		gap: 0.6rem;
		margin-bottom: 1.2rem;
	}
`;

const StyledInstructionsBox = styled(InfoBox)`
	min-width: 40rem;

	@media (max-width: ${Breakpoints.xl}px) {
		min-width: 30rem;
		padding: 1rem 3rem;
	}

	@media (max-width: ${Breakpoints.md}px) {
		min-width: 24rem;
	}

	/* Mobile: Remove fixed width to prevent horizontal scroll */
	@media (max-width: 768px) {
		min-width: unset;
		width: 100%;
		max-width: 100%;
		padding: 2rem 1.5rem;
		box-sizing: border-box;
	}

	@media (max-width: 479px) {
		padding: 1.5rem 1rem;
	}
`;

function InstructionsBox() {
	const { user, isLoading } = useUser();
	const knownTopics = user?.knownTopics || [];

	const includedWorksString = includedWorkString(knownTopics);

	return (
		<StyledInstructionsBox>
			<HeadingHolder>
				<Heading as="h2" $textalign="center">
					Формат
				</Heading>
			</HeadingHolder>
			<InfoSection>
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
						{isLoading ? "Зареждане..." : includedWorksString}
					</Text>
				</Text>
			</InfoSection>
			<Center>
				<SLink to="/settings" $align="center">
					<span>Промени произведенията </span>
					<IconWrapper $inheritsize={"true"}>
						<ChevronRightIcon />
					</IconWrapper>
				</SLink>
			</Center>
		</StyledInstructionsBox>
	);
}

export default InstructionsBox;

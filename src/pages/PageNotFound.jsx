import styled from "styled-components";
import Heading from "../ui/Heading";
import SLink from "../ui/SLink";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import IconWrapper from "../ui/IconWrapper";

const StyledPageNotFound = styled.main`
	height: 100vh;
	position: relative;
`;

const HeadingHolder = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
`;

function PageNotFound() {
	return (
		<StyledPageNotFound>
			<HeadingHolder>
				<Heading>Страницата не е открита ☹️ </Heading>
				<SLink to="/">
					<span>Върни се в началото </span>
					<IconWrapper $inheritsize={true}>
						<ArrowUturnLeftIcon />
					</IconWrapper>
				</SLink>
			</HeadingHolder>
		</StyledPageNotFound>
	);
}

export default PageNotFound;

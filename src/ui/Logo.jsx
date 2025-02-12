import styled from "styled-components";

import Heading from "./Heading";

const StyledLogo = styled.div`
	text-align: center;
`;

const Img = styled.img`
	/* height: 9.6rem; */
	height: 15vh;
`;

function Logo() {
	return (
		<StyledLogo>
			<Img src="/src/assets/logo.png" alt="Logo" />
			<Heading as="h1" textalign="center">
				НВО
			</Heading>
		</StyledLogo>
	);
}

export default Logo;

import styled from "styled-components";

import Heading from "./Heading";
import { useNavigate } from "react-router";

const StyledLogo = styled.div`
	text-align: center;
	cursor: pointer;
`;

const Img = styled.img`
	/* height: 9.6rem; */
	height: 15vh;
`;

function Logo() {
	const navigate = useNavigate();

	return (
		<StyledLogo onClick={() => navigate("/home")}>
			<Img src="/src/assets/logo.png" alt="Logo" />
			<Heading as="h1" textalign="center">
				НВО
			</Heading>
		</StyledLogo>
	);
}

export default Logo;

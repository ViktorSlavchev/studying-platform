import styled from "styled-components";

import Heading from "./Heading";
import { useNavigate } from "react-router";

const StyledLogo = styled.div`
	text-align: center;
	cursor: pointer;
`;

const Img = styled.img`
	height: 15vh;

	/* Smaller logo on mobile */
	@media (max-width: 768px) {
		height: 12vh;
	}

	@media (max-width: 479px) {
		height: 10vh;
	}
`;

const ResponsiveHeading = styled(Heading)`
	/* Smaller heading on mobile */
	@media (max-width: 768px) {
		font-size: 2.4rem !important;
	}

	@media (max-width: 479px) {
		font-size: 2rem !important;
	}
`;

function Logo() {
	const navigate = useNavigate();

	return (
		<StyledLogo onClick={() => navigate("/home")}>
			<Img src="/src/assets/logo.png" alt="Logo" />
			<ResponsiveHeading as="h1" $textalign="center">
				НВО
			</ResponsiveHeading>
		</StyledLogo>
	);
}

export default Logo;

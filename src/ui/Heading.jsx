import styled, { css } from "styled-components";
import Breakpoints from "../styles/breakpoints";

const Heading = styled.h1`
	${(props) =>
		props.as === "h1" &&
		css`
			font-size: 3.8rem;
			color: var(--color-text-dark);
			letter-spacing: -0.1rem;
			font-weight: bold;

			@media (max-width: ${Breakpoints.lg}px) {
				font-size: 3.6rem;
			}
			@media (max-width: ${Breakpoints.md}px) {
				font-size: 3.2rem;
			}
		`}
	${(props) =>
		props.as === "h2" &&
		css`
			font-size: 2.4rem;
			color: var(--color-text-dark);
			letter-spacing: -0.1rem;
			font-weight: bold;
			line-height: 1.2;
		`}

	text-align: ${(props) => props.textalign || "left"};
`;
export default Heading;

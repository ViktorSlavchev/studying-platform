import styled from "styled-components";
import Breakpoints from "../styles/breakpoints";

const InfoBox = styled.div`
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-md);
	padding: 1.4rem 3.4rem;
	min-width: 40rem;

	@media (max-width: ${Breakpoints.xl}px) {
		min-width: 30rem;
		padding: 1rem 3rem;
	}

	@media (max-width: ${Breakpoints.md}px) {
		min-width: 24rem;
	}
`;

export default InfoBox;

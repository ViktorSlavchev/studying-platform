import styled from "styled-components";
import Logo from "../../ui/Logo";
import Nav from "./Nav";
import mediaQueries from "../../styles/breakpoints";

const StyledSidebar = styled.aside`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	gap: 4rem;

	height: 100vh;

	padding: 4rem 0 1.2rem;

	border-right: 2px solid var(--color-border);
	grid-row: 1 / -1;

	${mediaQueries.large} {
		gap: 2rem;
	}

	${mediaQueries.desktop} {
		gap: 1rem;
	}

	/* Hide sidebar below desktop breakpoint (1024px) */
	@media (max-width: 1023px) {
		display: none;
	}
`;

function Sidebar() {
	return (
		<StyledSidebar>
			<Logo />
			<Nav />
		</StyledSidebar>
	);
}

export default Sidebar;

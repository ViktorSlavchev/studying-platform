import styled from "styled-components";
import Logo from "../../ui/Logo";
import Nav from "./Nav";
import Breakpoints from "../../styles/breakpoints";

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

	@media (max-width: ${Breakpoints.xl}px) {
		gap: 2rem;
	}

	@media (max-width: ${Breakpoints.lg}px) {
		gap: 1rem;
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

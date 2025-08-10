import styled from "styled-components";
import Profile from "./Profile";
import MobileNav from "../navigation/MobileNav";

const StyledHeader = styled.div`
	padding: 0.8rem 1.6rem;
	border-bottom: 2px solid var(--color-border);
	display: flex;
	justify-content: flex-end;
	align-items: center;

	/* Below desktop breakpoint (1024px) - show space between for mobile nav */
	@media (max-width: 1023px) {
		justify-content: space-between;
		padding: 1.2rem 2rem;
	}

	/* Small mobile devices */
	@media (max-width: 479px) {
		padding: 1rem 1.6rem;
	}
`;

const MobileNavWrapper = styled.div`
	display: none;

	/* Show below desktop breakpoint (1024px) */
	@media (max-width: 1023px) {
		display: block;
	}
`;

function Header() {
	return (
		<StyledHeader>
			<MobileNavWrapper>
				<MobileNav />
			</MobileNavWrapper>
			<Profile />
		</StyledHeader>
	);
}

export default Header;

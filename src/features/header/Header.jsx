import styled from "styled-components";
import Profile from "./Profile";

const StyledHeader = styled.div`
	padding: 0.8rem 1.6rem;
	border-bottom: 2px solid var(--color-border);
	display: flex;
	justify-content: flex-end;
`;

function Header() {
	return (
		<StyledHeader>
			<Profile />
		</StyledHeader>
	);
}

export default Header;

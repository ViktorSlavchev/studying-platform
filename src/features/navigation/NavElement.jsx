import PropTypes from "prop-types";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import IconWrapper from "../../ui/IconWrapper";
import Row from "../../ui/Row";
import Text from "../../ui/Text";

const MobileResponsiveRow = styled(Row)`
	/* Adjust gap for smaller screens */
	@media (max-width: 768px) {
		gap: 0.8rem !important;
	}

	@media (max-width: 479px) {
		gap: 0.6rem !important;
	}
`;

const ResponsiveText = styled(Text)`
	/* Responsive font sizes */
	@media (max-width: 768px) {
		font-size: 1.6rem !important;
	}

	@media (max-width: 479px) {
		font-size: 1.4rem !important;
	}
`;

const StyledNavLink = styled(NavLink)`
	&:link,
	&:visited {
		display: flex;
		align-items: center;
		gap: 1.2rem;

		font-size: 2rem;
		line-height: 1.6;
		color: var(--color-text-dark);
		font-weight: 500;
		padding: 1.2rem 0.4rem 1.2rem 2.8rem;
		transition: all 0.3s;
	}

	&:hover,
	&:active,
	&.active:link,
	&.active:visited {
		color: var(--color-brand);
		font-weight: bold;
		background-color: var(--color-brand-50);
	}

	&:hover svg,
	&:active svg,
	&.active:link svg,
	&.active:visited svg {
		color: var(--color-brand);
	}

	/* Mobile-friendly adjustments */
	@media (max-width: 768px) {
		&:link,
		&:visited {
			font-size: 1.8rem;
			padding: 1.4rem 1.6rem;
			gap: 1rem;
		}
	}

	@media (max-width: 479px) {
		&:link,
		&:visited {
			font-size: 1.6rem;
			padding: 1.2rem 1.4rem;
			gap: 0.8rem;
		}
	}
`;

NavElement.propTypes = {
	to: PropTypes.string.isRequired,
	icon: PropTypes.node.isRequired,
	label: PropTypes.string.isRequired,
	onNavigate: PropTypes.func,
};

function NavElement({ to, icon, label, onNavigate }) {
	const handleClick = () => {
		if (onNavigate) {
			onNavigate();
		}
	};

	return (
		<li>
			<StyledNavLink to={to} onClick={handleClick}>
				<MobileResponsiveRow $justify={"flex-start"} $align={"center"} $gap={"1rem"}>
					<IconWrapper>{icon}</IconWrapper>
					<ResponsiveText $size={"1.8rem"}>{label}</ResponsiveText>
				</MobileResponsiveRow>
			</StyledNavLink>
		</li>
	);
}
export default NavElement;

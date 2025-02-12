import PropTypes from "prop-types";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import IconWrapper from "./IconWrapper";
import Row from "./Row";
import Text from "./Text";

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
`;

NavElement.propTypes = {
	to: PropTypes.string.isRequired,
	icon: PropTypes.node.isRequired,
	label: PropTypes.string.isRequired,
};

function NavElement({ to, icon, label }) {
	return (
		<li>
			<StyledNavLink to={to}>
				<Row justify={"flex-start"} align={"center"} gap={"1rem"}>
					<IconWrapper>{icon}</IconWrapper>
					<Text size={"1.8rem"}>{label}</Text>
				</Row>
			</StyledNavLink>
		</li>
	);
}
export default NavElement;

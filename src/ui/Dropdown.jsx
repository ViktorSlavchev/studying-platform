import PropTypes from "prop-types";
import styled from "styled-components";

const StyledSelect = styled.select`
	border-radius: var(--border-radius-sm);
	outline: none;
	border: 2px solid var(--color-border);
	background-color: var(--bg-color);
	padding: 0.4rem 0.8rem;
	font-style: italic;

	&:focus {
		outline: none;
		border: 2px solid var(--color-brand);
	}

	&:hover {
		outline: none;
		border: 2px solid var(--color-brand);
	}
`;

function Dropdown({ children, ...props }) {
	return <StyledSelect {...props}>{children}</StyledSelect>;
}

Dropdown.propTypes = {
	children: PropTypes.node.isRequired,
};

function Option({ value, children }) {
	return <option value={value}>{children}</option>;
}

Option.propTypes = {
	value: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

Dropdown.Option = Option;

export default Dropdown;

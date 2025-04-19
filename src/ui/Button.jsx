import styled, { css } from "styled-components";

const primaryStyles = css`
	background-color: var(--color-brand);
	color: var(--color-text-light);
	padding: 1rem 3.2rem;

	font-weight: bold;
	border: none;

	border-radius: var(--border-radius-md);

	box-shadow: var(--shadow-sm);

	&:hover {
		background-color: var(--color-brand-600);
	}
	&:focus {
		outline: none;
		box-shadow: 0 0 0 2px white, 0 0 0 4px var(--color-brand-600);
	}
`;

const Button = styled.button`
	${({ type }) => type == "primary" && primaryStyles};
`;

Button.defaultProps = {
	type: "primary",
};

export default Button;

import styled, { css } from "styled-components";

const primaryStyles = css`
	background: linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-600) 100%);
	color: var(--color-text-light);
	padding: 1rem 3.2rem;

	font-weight: bold;
	border: none;

	border-radius: var(--border-radius-md);

	box-shadow: var(--shadow-sm);
	transition: all 0.3s ease;

	&:hover {
		background: linear-gradient(135deg, var(--color-brand-600) 0%, var(--color-brand-700) 100%);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(var(--color-brand), 0.3);
	}
	&:focus {
		outline: none;
		box-shadow: 0 0 0 2px white, 0 0 0 4px var(--color-brand-600);
	}
	&:active {
		transform: translateY(0);
	}
`;

const circleStyles = css`
	background: linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-600) 100%);
	color: var(--color-text-light);

	padding: 0.5rem;

	border-radius: 100%;

	font-weight: bold;
	border: none;

	box-shadow: var(--shadow-sm);
	transition: all 0.3s ease;

	&:hover {
		background: linear-gradient(135deg, var(--color-brand-600) 0%, var(--color-brand-700) 100%);
		transform: translateY(-1px) scale(1.05);
		box-shadow: 0 4px 12px rgba(var(--color-brand), 0.3);
	}
	&:focus {
		outline: none;
		box-shadow: 0 0 0 2px white, 0 0 0 4px var(--color-brand-600);
	}
	&:active {
		transform: translateY(0) scale(1);
	}
`;

const secondaryStyles = css`
	background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 1) 100%);
	color: var(--color-brand);
	padding: 0.8rem 2.4rem;

	font-weight: bold;
	border: 1px solid var(--color-brand);

	border-radius: var(--border-radius-md);

	box-shadow: var(--shadow-sm);
	transition: all 0.3s ease;

	&:hover {
		background: linear-gradient(135deg, var(--color-brand-600) 0%, var(--color-brand-700) 100%);
		color: var(--color-text-light);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(var(--color-brand), 0.2);
	}
	&:focus {
		outline: none;
		box-shadow: 0 0 0 2px white, 0 0 0 4px var(--color-brand-600);
	}
	&:active {
		transform: translateY(0);
	}
`;

const Button = styled.button`
	${({ type }) => type == "primary" && primaryStyles};
	${({ type }) => type == "circle" && circleStyles};
	${({ type }) => type == "secondary" && secondaryStyles};
`;

Button.defaultProps = {
	type: "primary",
};

export default Button;

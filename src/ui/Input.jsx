import styled from "styled-components";

const Input = styled.input`
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

export default Input;

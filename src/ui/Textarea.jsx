import styled from "styled-components";

const Textarea = styled.textarea`
	border-radius: var(--border-radius-sm);
	outline: none;
	border: 2px solid var(--color-border);
	background-color: var(--bg-color);
	padding: 0.4rem 0.8rem;

	resize: none;
	font-style: italic;

	width: ${(props) => props.width || "auto"};
	height: ${(props) => props.height || "auto"};

	&:focus {
		outline: none;
		border: 2px solid var(--color-brand);
	}

	&:hover {
		outline: none;
		border: 2px solid var(--color-brand);
	}
`;

export default Textarea;

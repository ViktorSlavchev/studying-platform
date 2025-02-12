import styled, { css } from "styled-components";

const Text = styled.p`
	${(props) =>
		css`
			font-size: ${props.size || "1.6rem"};
		`}
	${(props) =>
		css`
			font-style: ${props.textstyle || "normal"};
		`}
	
	color: inherit;

	${(props) =>
		props.textcolor === "light" &&
		css`
			color: var(--color-text-light);
		`}

	${(props) =>
		props.textcolor === "dark" &&
		css`
			color: var(--color-text-dark);
		`}


	line-height: 1.5;
`;

export default Text;

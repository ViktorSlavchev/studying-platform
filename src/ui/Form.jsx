import styled, { css } from "styled-components";

const Form = styled.form`
	${(props) =>
		props.type === "regular" &&
		css`
			padding: 2.4rem 4rem;

			background-color: var(--bg-color);
			border: 2px solid var(--color-border);
			border-radius: var(--border-radius-md);
		`}

	${(props) =>
		props.type === "modal" &&
		css`
			width: 80rem;
		`}
	
	${(props) =>
		props.type === "full-page" &&
		css`
			padding: 2.4rem 0;
			/* width: 40rem; */
		`}

  	overflow: hidden;
	font-size: 1.4rem;
`;

Form.defaultProps = {
	type: "regular",
};

export default Form;

import styled, { css } from "styled-components";

const Form = styled.form`
	${(props) =>
		props.type === "regular" &&
		css`
			padding: 2.4rem 4rem;

			background-color: var(--bg-color);
			border: 2px solid var(--color-border);
			border-radius: var(--border-radius-md);

			/* Mobile responsive padding */
			@media (max-width: 768px) {
				padding: 2rem 2.5rem;
			}

			@media (max-width: 479px) {
				padding: 1.5rem 2rem;
				border-radius: var(--border-radius-sm);
			}
		`}

	${(props) =>
		props.type === "modal" &&
		css`
			width: 80rem;

			/* Mobile responsive modal */
			@media (max-width: 768px) {
				width: 90vw;
				max-width: 50rem;
			}

			@media (max-width: 479px) {
				width: 95vw;
				max-width: 40rem;
			}
		`}
	
	${(props) =>
		props.type === "full-page" &&
		css`
			padding: 2.4rem 0;
			/* width: 40rem; */

			/* Mobile responsive full-page */
			@media (max-width: 768px) {
				padding: 2rem 0;
			}

			@media (max-width: 479px) {
				padding: 1.5rem 0;
			}
		`}

  	overflow: hidden;
	font-size: 1.4rem;
`;

Form.defaultProps = {
	type: "regular",
};

export default Form;

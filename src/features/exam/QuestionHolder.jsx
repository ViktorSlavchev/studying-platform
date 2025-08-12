import styled from "styled-components";

const QuestionHolder = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	width: 100%;
	max-width: 100%;
	overflow-x: hidden;

	/* Mobile responsive */
	@media (max-width: 768px) {
		gap: 2rem;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	@media (max-width: 479px) {
		gap: 1.5rem;
	}
`;

export default QuestionHolder;

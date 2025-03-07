import styled from "styled-components";

const Row = styled.div`
	display: flex;
	flex-direction: ${(props) => props.direction || "row"};
	justify-content: ${(props) => props.justify || "space-between"};
	align-items: ${(props) => props.align || "center"};
	gap: ${(props) => props.gap || "1.5rem"};
	flex-grow: ${(props) => props.grow || 0};
	align-self: ${(props) => props.alignself || "auto"};
`;

export default Row;

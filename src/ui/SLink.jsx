import { Link } from "react-router-dom";
import styled from "styled-components";

const SLink = styled(Link)`
	color: var(--color-brand);
	text-decoration: none;
	text-align: ${(props) => props.align || "left"};

	transition: all 0.3s;

	&:hover {
		text-decoration: underline;
		color: var(--color-text-dark);
	}
`;

export default SLink;

import PropTypes from "prop-types";
import styled, { keyframes, css } from "styled-components";

import CircleSVG from "./CircleSVG";

const letters = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л"];

// Counterclockwise draw animation
const drawCircle = keyframes`
    0% {
        stroke-dasharray: 126;
        stroke-dashoffset: -126;  /* Start hidden but reversed */
    }
    100% {
        stroke-dasharray: 126;
        stroke-dashoffset: 0;    /* Fully drawn */
    }

`;

const StyledSpan = styled.span`
	font-size: 1.6rem;
	font-weight: bold;
	position: relative;
	display: inline-block;
	padding: 0.2rem 0.4rem;

	${({ highlight }) =>
		highlight &&
		css`
			&::after {
				content: "";
				position: absolute;
				top: -2px;
				left: -6px;
				width: 32px;
				height: 32px;
				background: none;
			}

			& svg path {
				transform: rotate(-90deg);
				transform-origin: center;
				stroke-dasharray: 126, 126;
				stroke-dashoffset: 126;
				animation: ${drawCircle} 0.5s ease-out forwards;
			}
		`}
`;

function Letter({ ind, highlight }) {
	return (
		<StyledSpan highlight={highlight}>
			{letters[ind]}){highlight === "true" && <CircleSVG />}
		</StyledSpan>
	);
}

Letter.propTypes = {
	ind: PropTypes.number.isRequired,
	highlight: PropTypes.string.isRequired, // Use boolean instead of string
};

export default Letter;

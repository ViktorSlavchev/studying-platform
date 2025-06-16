import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "./Text";

const ExpandableTextWrapper = styled.div`
	position: relative;
`;

const SeeMoreButton = styled.span`
	color: var(--color-brand);
	cursor: pointer;
	display: inline;
	font-size: 80%;
`;

function ExpandableText({ children, maxLength = 80, ...props }) {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	const shouldTruncate = children.length > maxLength && !isExpanded;
	const displayText = shouldTruncate ? `${children.slice(0, maxLength)}...` : children;

	return (
		<ExpandableTextWrapper>
			<Text {...props}>
				{displayText} {shouldTruncate && <SeeMoreButton onClick={toggleExpand}>Виж повече</SeeMoreButton>}
				{isExpanded && <SeeMoreButton onClick={toggleExpand}>Виж по-малко</SeeMoreButton>}
			</Text>
		</ExpandableTextWrapper>
	);
}
ExpandableText.propTypes = {
	children: PropTypes.node.isRequired,
	maxLength: PropTypes.number,
};

export default ExpandableText;

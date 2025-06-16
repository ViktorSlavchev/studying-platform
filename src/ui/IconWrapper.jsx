import styled, { css } from "styled-components";

const IconWrapper = styled.span`
	display: inline-flex;
	justify-content: center;
	align-items: center;

	color: inherit;
	width: var(--icon-sz-sm);
	height: var(--icon-sz-sm);

	${({ $inheritsize }) =>
		$inheritsize &&
		css`
			width: 1em;
			height: 1em;
		`}

	${({ $sz }) =>
		$sz === "sm" &&
		css`
			width: var(--icon-sz-sm);
			height: var(--icon-sz-sm);
		`}

	${({ $sz }) =>
		$sz === "md" &&
		css`
			width: var(--icon-sz-md);
			height: var(--icon-sz-md);
		`}
	${({ $sz }) =>
		$sz === "lg" &&
		css`
			width: var(--icon-sz-lg);
			height: var(--icon-sz-lg);
		`}

	${({ $color }) =>
		$color &&
		css`
			color: ${$color};
			stroke: ${$color};
			fill: ${$color};
		`}
`;

export default IconWrapper;

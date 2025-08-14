import styled from "styled-components";
import InfoBox from "../../ui/InfoBox";
import Text from "../../ui/Text";
import Heading from "../../ui/Heading";
import mediaQueries from "../../styles/breakpoints";

// Layout Components
export const MainContainer = styled.div`
	display: flex;
	gap: 3.2rem;
	width: 100%;
	
	${mediaQueries.tablet} {
		gap: 2.4rem;
	}
	
	${mediaQueries.mobileOnly} {
		flex-direction: column;
		gap: 1.6rem;
	}
`;

export const ContentColumn = styled.div`
	flex: 2;
	min-width: 0;
	
	${mediaQueries.mobileOnly} {
		order: 2;
		flex: 1;
	}
`;

export const RightColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	align-self: flex-start;
	flex: 1;
	min-width: 0;
	position: sticky;
	top: 2rem;
	
	${mediaQueries.tabletOnly} {
		gap: 1.2rem;
		position: static;
	}
	
	${mediaQueries.mobileOnly} {
		order: 1;
		position: static;
		flex: none;
		gap: 1.2rem;
		margin-bottom: 0.8rem;
		width: 100%;
	}
`;

// Sidebar Components
export const TopicsBox = styled(InfoBox)`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	padding: 2rem;
	width: 100%;
	
	${mediaQueries.tablet} {
		padding: 1.6rem;
		gap: 1rem;
	}
	
	${mediaQueries.mobileOnly} {
		padding: 1.2rem;
		gap: 1rem;
		width: 100%;
	}
`;

export const TopicButton = styled.button`
	background: ${({ $active }) => ($active ? "var(--color-brand-50)" : "transparent")};
	border: 1px solid ${({ $active }) => ($active ? "var(--color-brand)" : "var(--color-border)")};
	border-radius: var(--border-radius-sm);
	padding: 0.8rem 1.2rem;
	color: ${({ $active }) => ($active ? "var(--color-brand)" : "var(--color-text-dark)")};
	font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
	cursor: pointer;
	text-align: left;
	font-size: 1.4rem;
	transition: all 0.2s;
	min-height: 4rem;
	display: flex;
	align-items: center;
	width: 100%;

	&:hover {
		background: var(--color-brand-50);
		border-color: var(--color-brand);
		color: var(--color-brand);
	}
	
	${mediaQueries.mobileOnly} {
		padding: 0.8rem 1rem;
		font-size: 1.3rem;
		min-height: 3.6rem;
		justify-content: center;
		text-align: center;
	}
	
	${mediaQueries.smallMobile} {
		padding: 0.8rem 1rem;
		font-size: 1.2rem;
		min-height: 3.6rem;
	}
`;

export const CategoryButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	
	${mediaQueries.mobileOnly} {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		width: 100%;
	}
	
	${mediaQueries.smallMobile} {
		grid-template-columns: 1fr;
		gap: 0.8rem;
	}
`;

// Content Components
export const TopicSection = styled.div`
	margin-bottom: 3.2rem;
	
	${mediaQueries.tablet} {
		margin-bottom: 2.4rem;
	}
	
	${mediaQueries.mobileOnly} {
		margin-bottom: 2rem;
	}
`;

export const TopicTitle = styled(Text)`
	font-size: 1.8rem;
	font-weight: bold;
	margin-bottom: 1.6rem;
	padding: 1.2rem 0;
	border-bottom: 2px solid var(--color-border);
	
	${mediaQueries.tablet} {
		font-size: 1.7rem;
		margin-bottom: 1.4rem;
		padding: 1rem 0;
	}
	
	${mediaQueries.mobileOnly} {
		font-size: 1.6rem;
		margin-bottom: 1.2rem;
		padding: 0.8rem 0;
	}
`;

export const ResponsiveHeading = styled(Heading)`
	${mediaQueries.mobileOnly} {
		font-size: 2.4rem;
		margin-bottom: 1.6rem;
	}
	
	${mediaQueries.smallMobile} {
		font-size: 2.2rem;
		margin-bottom: 1.2rem;
	}
`;

export const SidebarTitle = styled(Text)`
	${mediaQueries.mobileOnly} {
		font-size: 1.4rem !important;
	}
	
	${mediaQueries.smallMobile} {
		font-size: 1.3rem !important;
	}
`;

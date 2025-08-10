import styled from "styled-components";
import Header from "../features/header/Header";
import Sidebar from "../features/navigation/Sidebar";
import { Outlet } from "react-router";

import mediaQueries from "../styles/breakpoints";
import Row from "./Row";

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 34rem 1fr;
	grid-template-rows: auto 1fr;
	max-height: 100vh;

	${mediaQueries.large} {
		grid-template-columns: 32rem 1fr;
		grid-template-rows: auto 1fr;
	}

	${mediaQueries.desktop} {
		grid-template-columns: 26rem 1fr;
		grid-template-rows: auto 1fr;
	}

	/* Single column layout below desktop breakpoint (1024px) */
	@media (max-width: 1023px) {
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
	}
`;

const Main = styled.main`
	padding: 4rem 4.8rem 2rem;
	max-height: 100vh;
	overflow: scroll;

	${mediaQueries.large} {
		padding: 3.2rem 3.6rem 2rem;
	}

	${mediaQueries.desktop} {
		padding: 2.4rem 3.2rem 2rem;
	}

	/* Below desktop breakpoint (1024px) */
	@media (max-width: 1023px) {
		padding: 2rem 2.4rem 1.6rem;
	}

	/* Small mobile devices */
	@media (max-width: 479px) {
		padding: 1.6rem 1.2rem 1.2rem;
	}
`;

const ResponsiveRow = styled(Row)`
	/* Reduce gap on mobile */
	@media (max-width: 768px) {
		gap: 2rem !important;
	}

	@media (max-width: 479px) {
		gap: 1.6rem !important;
	}
`;

function AppLayout() {
	return (
		<StyledAppLayout>
			<Header />
			<Sidebar />
			<Main>
				<ResponsiveRow $gap="2.6rem" $direction="column" $align="flex-start">
					<Outlet />
				</ResponsiveRow>
			</Main>
		</StyledAppLayout>
	);
}

export default AppLayout;

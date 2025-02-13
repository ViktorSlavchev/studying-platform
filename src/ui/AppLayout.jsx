import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

import Breakpoints from "../styles/breakpoints";
import Row from "./Row";

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 34rem 1fr;
	grid-template-rows: auto 1fr;
	max-height: 100vh;

	@media (max-width: ${Breakpoints.xl}px) {
		grid-template-columns: 32rem 1fr;
		grid-template-rows: auto 1fr;
	}

	@media (max-width: ${Breakpoints.lg}px) {
		grid-template-columns: 26rem 1fr;
		grid-template-rows: auto 1fr;
	}
`;

const Main = styled.main`
	padding: 4rem 4.8rem 2rem;
	max-height: 100vh;
	overflow: scroll;

	@media (max-width: ${Breakpoints.xl}px) {
		padding: 3.2rem 3.6rem 2rem;
	}

	@media (max-width: ${Breakpoints.lg}px) {
		padding: 2.4rem 3.2rem 2rem;
	}
`;

function AppLayout() {
	return (
		<StyledAppLayout>
			<Header />
			<Sidebar />
			<Main>
				<Row gap="2.6rem" direction="column" align="flex-start">
					<Outlet />
				</Row>
			</Main>
		</StyledAppLayout>
	);
}

export default AppLayout;

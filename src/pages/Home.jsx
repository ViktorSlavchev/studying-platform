import styled from "styled-components";
import Heading from "../ui/Heading";

const StyledHome = styled.main`
	padding: 0 1.6rem;
`;
function Home() {
	return (
		<StyledHome>
			<Heading as="h1">Начало</Heading>
		</StyledHome>
	);
}

export default Home;

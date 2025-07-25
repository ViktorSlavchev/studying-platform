import styled from "styled-components";

import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import SLink from "../ui/SLink";

const LoginLayout = styled.main`
	min-height: 100vh;
	display: grid;
	grid-template-columns: 48rem;
	align-content: center;
	justify-content: center;
	gap: 3.2rem;
	background-color: var(--bg-color);
`;

function Login() {
	return (
		<LoginLayout>
			<Logo />
			<Heading as="h2" $textalign="center">
				Влезте във вашия акаунт
			</Heading>
			<LoginForm />
			<Text>
				Нямате акаунт? <SLink to="/signup">Създай акаунт</SLink>
			</Text>
		</LoginLayout>
	);
}

export default Login;

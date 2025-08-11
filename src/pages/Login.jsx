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
	padding: 2rem;

	/* Mobile responsive */
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		max-width: 42rem;
		width: 100%;
		padding: 2rem 1.5rem;
		gap: 2.5rem;
	}

	@media (max-width: 479px) {
		padding: 1.5rem 1rem;
		gap: 2rem;
		max-width: 100%;
	}
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

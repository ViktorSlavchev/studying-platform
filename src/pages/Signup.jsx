import styled from "styled-components";

import SignupForm from "../features/authentication/SignupForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import SLink from "../ui/SLink";

const SignupLayout = styled.main`
	min-height: 100vh;
	display: grid;
	grid-template-columns: 48rem;
	align-content: center;
	justify-content: center;
	gap: 3.2rem;
	background-color: var(--bg-color);
`;

function Signup() {
	return (
		<SignupLayout>
			<Logo />
			<Heading as="h2" $textalign="center">
				Създайте вашият акаунт
			</Heading>
			<SignupForm />
			<Text>
				Вече имате акаунт? <SLink to="/login">Вход</SLink>
			</Text>
		</SignupLayout>
	);
}

export default Signup;

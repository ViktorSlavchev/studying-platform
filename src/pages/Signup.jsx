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

import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { useSignup } from "./useSignup";

function LoginForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signup, isLoading } = useSignup();

	function handleSubmit(e) {
		e.preventDefault();
		if (!email || !password || !name) return;
		signup(
			{ email, password, name },
			{
				onSettled: () => {
					setPassword("");
					setEmail("");
				},
			}
		);
	}

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<FormRowVertical label="Име">
					<Input type="text" id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
				</FormRowVertical>

				<FormRowVertical label="Имейл">
					<Input type="email" id="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
				</FormRowVertical>

				<FormRowVertical label="Парола">
					<Input type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
				</FormRowVertical>
				<FormRowVertical>
					<Button size="large" disabled={isLoading}>
						{!isLoading ? "Създай акаунт" : <SpinnerMini />}
					</Button>
				</FormRowVertical>
			</Form>
		</>
	);
}

export default LoginForm;

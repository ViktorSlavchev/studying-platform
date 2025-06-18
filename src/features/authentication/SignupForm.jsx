import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { useSignup } from "./useSignup";

const nameOptions = {
	required: "Името е задължително",
	minLength: {
		value: 2,
		message: "Името трябва да е поне 2 символа",
	},
	maxLength: {
		value: 50,
		message: "Името не трябва да е по-дълго от 50 символа",
	},
};

const emailOptions = {
	required: "Имейлът е задължителен",
	pattern: {
		value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		message: "Моля, въведете валиден имейл адрес",
	},
};

const passwordOptions = {
	required: "Паролата е задължителна",
	minLength: {
		value: 8,
		message: "Паролата трябва да е поне 8 символа",
	},
	maxLength: {
		value: 50,
		message: "Паролата не трябва да е по-дълга от 100 символа",
	},
};

function LoginForm() {
	const { signup, isLoading } = useSignup();
	const { handleSubmit, register, formState } = useForm();
	const { errors } = formState;

	const onSubmit = (data) => {
		signup(data);
	};

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormRowVertical label="Име" error={errors?.name?.message}>
					<Input type="text" id="name" autoComplete="name" disabled={isLoading} {...register("name", nameOptions)} />
				</FormRowVertical>

				<FormRowVertical label="Имейл" error={errors?.email?.message}>
					<Input type="email" id="email" autoComplete="email" disabled={isLoading} {...register("email", emailOptions)} />
				</FormRowVertical>

				<FormRowVertical label="Парола" error={errors?.password?.message}>
					<Input type="password" id="password" autoComplete="current-password" disabled={isLoading} {...register("password", passwordOptions)} />
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

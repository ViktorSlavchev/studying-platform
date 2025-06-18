import { useForm } from "react-hook-form";
import styled from "styled-components";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";

import { useUser } from "../authentication/useUser";
import { useEffect } from "react";
import { useUpdate } from "./useUpdate";

const ButtonHolder = styled.div`
	margin-top: 1.2rem;
`;

function PersonalDataForm() {
	const { register, formState, reset, handleSubmit } = useForm();
	const { errors } = formState;

	const { user, isLoading: isLoadingUser } = useUser();
	const { updateUser, isLoading: isUpdating } = useUpdate();

	useEffect(() => {
		if (user) {
			reset({
				name: user.name || "",
				email: user.email || "",
			});
		}
	}, [user, reset]);

	function onSubmit(data) {
		updateUser(data);
	}

	if (isLoadingUser) {
		return <Spinner />;
	}

	return (
		<Form type="full-page" onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Име" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					autoComplete="name"
					{...register("name", {
						required: "Името е задължително",
						minLength: {
							value: 2,
							message: "Името трябва да е поне 2 символа",
						},
						maxLength: {
							value: 50,
							message: "Името не може да е по-дълго от 50 символа",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Имейл" error={errors?.email?.message}>
				<Input
					type="email"
					id="email"
					autoComplete="email"
					{...register("email", {
						required: "Имейлът е задължителен",
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message: "Моля, въведете валиден имейл адрес",
						},
					})}
				/>
			</FormRow>

			<ButtonHolder>
				<Button type="secondary" disabled={isUpdating}>
					{isUpdating ? <SpinnerMini /> : "Запази"}
				</Button>
			</ButtonHolder>
		</Form>
	);
}

export default PersonalDataForm;

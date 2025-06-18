import { useForm } from "react-hook-form";
import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useChangePassword } from "./useChangePassword";
import SpinnerMini from "../../ui/SpinnerMini";

const ButtonHolder = styled.div`
	margin-top: 1.2rem;
`;

function PersonalDataForm() {
	const { register, formState, handleSubmit, getValues } = useForm();
	const { errors } = formState;

	const { changePassword, isLoading } = useChangePassword();

	const onSubmit = ({ currentPassword, newPassword }) => {
		changePassword({ currentPassword, newPassword });
	};

	return (
		<Form type="full-page" onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Стара парола" error={errors?.currentPassword?.message}>
				<Input
					type="password"
					id="currentPassword"
					autoComplete="current-password"
					{...register("currentPassword", {
						minLength: {
							value: 8,
							message: "Паролата трябва да е поне 8 символа",
						},
						maxLength: {
							value: 30,
							message: "Паролата не може да е по-дълга от 30 символа",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Нова парола" error={errors?.newPassword?.message}>
				<Input
					type="password"
					id="newPassword"
					autoComplete="new-password"
					{...register("newPassword", {
						minLength: {
							value: 8,
							message: "Паролата трябва да е поне 8 символа",
						},
						maxLength: {
							value: 30,
							message: "Паролата не може да е по-дълга от 30 символа",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Потвърди паролата" error={errors?.confirmPassword?.message}>
				<Input
					type="password"
					id="confirmPassword"
					autoComplete="confirm-password"
					{...register("confirmPassword", {
						required: "Потвърдете паролата",
						validate: (value) => {
							if (value !== getValues().newPassword) {
								return "Паролите не съвпадат";
							}
						},
					})}
				/>
			</FormRow>

			<ButtonHolder>
				<Button type="secondary" disabled={isLoading}>
					{isLoading ? <SpinnerMini /> : "Промени паролата"}
				</Button>
			</ButtonHolder>
		</Form>
	);
}

export default PersonalDataForm;

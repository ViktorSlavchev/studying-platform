import styled from "styled-components";
import Heading from "../ui/Heading";
import PersonalDataForm from "../features/settings/PersonalDataForm";
import PasswordChangeForm from "../features/settings/PasswordChangeForm";

const SettingsSection = styled.section`
	margin-top: 2rem;
	border-bottom: 1px solid var(--color-border);
	/* margin-left: 1.2rem; */

	width: 100%;
`;

function SettingsPage() {
	return (
		<>
			<Heading>Насторойки</Heading>
			<SettingsSection>
				<Heading as="h2">Лични настройки</Heading>
				<PersonalDataForm />
			</SettingsSection>
			<SettingsSection>
				<Heading as="h2">Промяна на парола</Heading>
				<PasswordChangeForm />
			</SettingsSection>
		</>
	);
}

export default SettingsPage;

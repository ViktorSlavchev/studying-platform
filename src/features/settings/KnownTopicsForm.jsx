import styled from "styled-components";
import { useState, useEffect } from "react";

import Text from "../../ui/Text";
import Spinner from "../../ui/Spinner";

import { useUser } from "../authentication/useUser";
import { belTopics, lit5Topics, lit6Topics, lit7Topics } from "../../utils/topics";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUpdate } from "./useUpdate";

const TopicsWrapper = styled.div`
	margin-top: 2rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 3rem;
`;

const TopicGroup = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const TopicHeader = styled(Text)`
	margin-bottom: 0.8rem;
	margin-top: 1.6rem;
`;

const CheckboxLabel = styled.label`
	display: flex;
	align-items: center;
	gap: 0.6rem;
	margin-bottom: 0.4rem;
	font-size: 1.4rem;
`;

const ButtonHolder = styled.div`
	margin-top: 1.2rem;
	margin-bottom: 2rem;
`;

function KnownTopicsForm() {
	const { user, isLoading } = useUser();
	const [selectedTopics, setSelectedTopics] = useState([]);

	const { updateUser, isLoading: isUpdating } = useUpdate();

	useEffect(() => {
		if (user?.knownTopics) {
			setSelectedTopics(user.knownTopics);
		}
	}, [user]);

	function toggleTopic(topic) {
		setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]));
	}

	function renderGroup(title, topics) {
		return (
			<TopicGroup>
				<TopicHeader $weight="bold">{title}</TopicHeader>
				{topics.map((topic) => (
					<CheckboxLabel key={topic}>
						<input type="checkbox" checked={selectedTopics.includes(topic)} onChange={() => toggleTopic(topic)} />
						{topic}
					</CheckboxLabel>
				))}
			</TopicGroup>
		);
	}

	function handleSubmit() {
		updateUser({ knownTopics: selectedTopics });
		console.log("Selected topics:", selectedTopics);
	}

	if (isLoading) return <Spinner />;

	return (
		<>
			<TopicsWrapper>
				{renderGroup("БЕЛ", belTopics)}

				<div>
					{renderGroup("Литература 5 клас", lit5Topics)}
					{renderGroup("Литература 6 клас", lit6Topics)}
				</div>

				{renderGroup("Литература 7 клас", lit7Topics)}
			</TopicsWrapper>

			<ButtonHolder>
				<Button type="secondary" disabled={isUpdating} onClick={handleSubmit}>
					{isUpdating ? <SpinnerMini /> : "Запази"}
				</Button>
			</ButtonHolder>
		</>
	);
}

export default KnownTopicsForm;

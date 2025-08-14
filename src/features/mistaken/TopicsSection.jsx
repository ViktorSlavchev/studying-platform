import React from "react";
import { TopicsBox, TopicButton, CategoryButtonContainer, SidebarTitle } from "./WrongQuestions.styles";

const TopicsSection = ({ questionsGrouped, currentTopics, activeCategory, onTopicScroll }) => {
	const hasQuestions = Object.keys(questionsGrouped).length > 0;
	
	if (!hasQuestions) return null;

	return (
		<TopicsBox>
			<SidebarTitle $weight="bold" $size="1.6rem" style={{ marginBottom: "0.8rem" }}>
				Теми в {activeCategory}
			</SidebarTitle>
			<CategoryButtonContainer>
				{currentTopics
					.filter((topic) => questionsGrouped[topic])
					.map((topic) => (
						<TopicButton key={topic} onClick={() => onTopicScroll(topic)}>
							{topic} ({questionsGrouped[topic]?.length || 0})
						</TopicButton>
					))}
			</CategoryButtonContainer>
		</TopicsBox>
	);
};

export default TopicsSection;

import React from "react";
import { TopicsBox, TopicButton, CategoryButtonContainer, SidebarTitle } from "./WrongQuestions.styles";

const CategoriesSection = ({ availableCategories, activeCategory, onCategoryChange }) => {
	if (availableCategories.length === 0) return null;

	return (
		<TopicsBox>
			<SidebarTitle $weight="bold" $size="1.6rem" style={{ marginBottom: "0.8rem" }}>
				Категории
			</SidebarTitle>
			<CategoryButtonContainer>
				{availableCategories.map((category) => (
					<TopicButton 
						key={category} 
						$active={activeCategory === category} 
						onClick={() => onCategoryChange(category)}
					>
						{category}
					</TopicButton>
				))}
			</CategoryButtonContainer>
		</TopicsBox>
	);
};

export default CategoriesSection;

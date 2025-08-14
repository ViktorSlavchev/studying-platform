import { useRef } from "react";

import QuestionHolder from "../features/exam/QuestionHolder";
import Spinner from "../ui/Spinner";
import { useMistakenQuestions, useDeleteMistakenQuestion } from "../features/mistaken/useMistakenQuestions";

// Import from features/mistaken
import { useWrongQuestionsLogic } from "../features/mistaken/useWrongQuestionsLogic";
import CategoriesSection from "../features/mistaken/CategoriesSection";
import TopicsSection from "../features/mistaken/TopicsSection";
import QuestionsContent from "../features/mistaken/QuestionsContent";
import EmptyState from "../features/mistaken/EmptyState";
import {
	MainContainer,
	ContentColumn,
	RightColumn,
	ResponsiveHeading,
} from "../features/mistaken/WrongQuestions.styles";

function WrongQuestions() {
	const { mistakenQuestions, isLoading } = useMistakenQuestions();
	const { deleteMistaken, isDeleting } = useDeleteMistakenQuestion();
	const sectionRefs = useRef({});

	// Custom hook for business logic
	const {
		activeCategory,
		setActiveCategory,
		questionsGrouped,
		currentTopics,
		availableCategories,
	} = useWrongQuestionsLogic(mistakenQuestions);

	// Event handlers
	const handleDeleteQuestion = (questionId) => {
		deleteMistaken(questionId);
	};

	const scrollToTopic = (topic) => {
		const element = sectionRefs.current[topic];
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	const hasQuestions = mistakenQuestions?.length > 0 && Object.keys(questionsGrouped).length > 0;

	return (
		<>
			<ResponsiveHeading>Предишни грешки</ResponsiveHeading>
			<MainContainer>
				<ContentColumn>
					<QuestionHolder>
						<EmptyState 
							mistakenQuestions={mistakenQuestions}
							questionsGrouped={questionsGrouped}
							activeCategory={activeCategory}
						/>
						{hasQuestions && (
							<QuestionsContent
								questionsGrouped={questionsGrouped}
								currentTopics={currentTopics}
								sectionRefs={sectionRefs}
								onDeleteQuestion={handleDeleteQuestion}
								isDeleting={isDeleting}
							/>
						)}
					</QuestionHolder>
				</ContentColumn>

				<RightColumn>
					<CategoriesSection
						availableCategories={availableCategories}
						activeCategory={activeCategory}
						onCategoryChange={setActiveCategory}
					/>
					<TopicsSection
						questionsGrouped={questionsGrouped}
						currentTopics={currentTopics}
						activeCategory={activeCategory}
						onTopicScroll={scrollToTopic}
					/>
				</RightColumn>
			</MainContainer>
		</>
	);
}

export default WrongQuestions;
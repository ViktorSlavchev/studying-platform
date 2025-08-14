import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Text from "../ui/Text";
import InfoBox from "../ui/InfoBox";
import WrongQuestion from "../features/mistaken/WrongQuestion";
import QuestionHolder from "../features/exam/QuestionHolder";
import Spinner from "../ui/Spinner";
import mediaQueries from "../styles/breakpoints";
import { belTopics, litTopics } from "../utils/topics";
import { useMistakenQuestions, useDeleteMistakenQuestion } from "../features/mistaken/useMistakenQuestions";

const MainContainer = styled.div`
	display: flex;
	gap: 3.2rem;
	width: 100%;
	
	${mediaQueries.tablet} {
		gap: 2.4rem;
	}
	
	${mediaQueries.mobileOnly} {
		flex-direction: column;
		gap: 1.6rem;
	}
`;

const ContentColumn = styled.div`
	flex: 2;
	min-width: 0;
	
	${mediaQueries.mobileOnly} {
		order: 2;
		flex: 1;
	}
`;

const RightColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	align-self: flex-start;
	flex: 1;
	min-width: 0;
	position: sticky;
	top: 2rem;
	
	${mediaQueries.tabletOnly} {
		gap: 1.2rem;
		position: static;
	}
	
	${mediaQueries.mobileOnly} {
		order: 1;
		position: static;
		flex: none;
		gap: 1.2rem;
		margin-bottom: 0.8rem;
		width: 100%;
	}
`;

const TopicsBox = styled(InfoBox)`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	padding: 2rem;
	width: 100%;
	
	${mediaQueries.tablet} {
		padding: 1.6rem;
		gap: 1rem;
	}
	
	${mediaQueries.mobileOnly} {
		padding: 1.2rem;
		gap: 1rem;
		width: 100%;
	}
`;

const TopicButton = styled.button`
	background: ${({ $active }) => ($active ? "var(--color-brand-50)" : "transparent")};
	border: 1px solid ${({ $active }) => ($active ? "var(--color-brand)" : "var(--color-border)")};
	border-radius: var(--border-radius-sm);
	padding: 0.8rem 1.2rem;
	color: ${({ $active }) => ($active ? "var(--color-brand)" : "var(--color-text-dark)")};
	font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
	cursor: pointer;
	text-align: left;
	font-size: 1.4rem;
	transition: all 0.2s;
	min-height: 4rem;
	display: flex;
	align-items: center;
	width: 100%;

	&:hover {
		background: var(--color-brand-50);
		border-color: var(--color-brand);
		color: var(--color-brand);
	}
	
	${mediaQueries.mobileOnly} {
		padding: 0.8rem 1rem;
		font-size: 1.3rem;
		min-height: 3.6rem;
		justify-content: center;
		text-align: center;
	}
	
	${mediaQueries.smallMobile} {
		padding: 0.8rem 1rem;
		font-size: 1.2rem;
		min-height: 3.6rem;
	}
`;

const CategoryButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	
	${mediaQueries.mobileOnly} {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		width: 100%;
	}
	
	${mediaQueries.smallMobile} {
		grid-template-columns: 1fr;
		gap: 0.8rem;
	}
`;

const TopicSection = styled.div`
	margin-bottom: 3.2rem;
	
	${mediaQueries.tablet} {
		margin-bottom: 2.4rem;
	}
	
	${mediaQueries.mobileOnly} {
		margin-bottom: 2rem;
	}
`;

const TopicTitle = styled(Text)`
	font-size: 1.8rem;
	font-weight: bold;
	margin-bottom: 1.6rem;
	padding: 1.2rem 0;
	border-bottom: 2px solid var(--color-border);
	
	${mediaQueries.tablet} {
		font-size: 1.7rem;
		margin-bottom: 1.4rem;
		padding: 1rem 0;
	}
	
	${mediaQueries.mobileOnly} {
		font-size: 1.6rem;
		margin-bottom: 1.2rem;
		padding: 0.8rem 0;
	}
`;

const ResponsiveHeading = styled(Heading)`
	${mediaQueries.mobileOnly} {
		font-size: 2.4rem;
		margin-bottom: 1.6rem;
	}
	
	${mediaQueries.smallMobile} {
		font-size: 2.2rem;
		margin-bottom: 1.2rem;
	}
`;

const SidebarTitle = styled(Text)`
	${mediaQueries.mobileOnly} {
		font-size: 1.4rem !important;
	}
	
	${mediaQueries.smallMobile} {
		font-size: 1.3rem !important;
	}
`;

function WrongQuestions() {
	const { mistakenQuestions, isLoading } = useMistakenQuestions();
	const { deleteMistaken, isDeleting } = useDeleteMistakenQuestion();
	const [activeCategory, setActiveCategory] = useState("Български език");
	const sectionRefs = useRef({});

	// Handle deleting a question
	const handleDeleteQuestion = (questionId) => {
		deleteMistaken(questionId);
	};

	// Categorize questions based on topic
	const categorizeQuestion = (question) => {
		if (!question.topic) return "Други";

		if (belTopics.includes(question.topic) || ["Връзки между думи", "Анализ на текст", "Редактиране на текст"].includes(question.topic)) {
			return "Български език";
		} else if (litTopics.includes(question.topic)) {
			// Check if showTheme is false for literature questions
			if (question.showTheme === false) {
				return "Други";
			}
			return "Литература";
		}
		return "Други";
	};

	// Get all available categories from mistaken questions
	const getAvailableCategories = () => {
		if (!mistakenQuestions || mistakenQuestions.length === 0) return [];

		const categories = new Set();
		mistakenQuestions.forEach((question) => {
			categories.add(categorizeQuestion(question));
		});

		return Array.from(categories);
	};

	// Get all topics for current category
	const getTopicsForCategory = (category) => {
		if (category === "Български език") return [...belTopics, "Анализ на текст", "Редактиране на текст", "Връзки между думи"];
		if (category === "Литература") return litTopics;
		return [];
	};

	// Get questions grouped by topic for the active category
	const getQuestionsGroupedByTopic = (category) => {
		if (!mistakenQuestions || mistakenQuestions.length === 0) return {};

		const questionsInCategory = mistakenQuestions.filter((question) => categorizeQuestion(question) === category);

		const grouped = {};
		questionsInCategory.forEach((question) => {
			const topic = question.topic || "Без тема";
			if (!grouped[topic]) {
				grouped[topic] = [];
			}
			grouped[topic].push(question);
		});

		return grouped;
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

	const questionsGrouped = getQuestionsGroupedByTopic(activeCategory);
	const currentTopics = getTopicsForCategory(activeCategory);
	const availableCategories = getAvailableCategories();

	// Set default category to first available category if current one has no questions
	useEffect(() => {
		if (availableCategories.length > 0 && !availableCategories.includes(activeCategory)) {
			setActiveCategory(availableCategories[0]);
		}
	}, [availableCategories, activeCategory]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<ResponsiveHeading>Предишни грешки</ResponsiveHeading>
			<MainContainer>
				<ContentColumn>
					<QuestionHolder>
						{!mistakenQuestions || mistakenQuestions.length === 0 ? (
							<InfoBox>
								<Text style={{ textAlign: "center", padding: "2rem" }}>Няма регистрирани грешни отговори</Text>
							</InfoBox>
						) : Object.keys(questionsGrouped).length === 0 ? (
							<InfoBox>
								<Text style={{ textAlign: "center", padding: "2rem" }}>Няма грешни отговори за категория &ldquo;{activeCategory}&rdquo;</Text>
							</InfoBox>
						) : (
							currentTopics
								.filter((topic) => questionsGrouped[topic])
								.map((topic) => (
									<TopicSection key={topic} ref={(el) => (sectionRefs.current[topic] = el)}>
										<TopicTitle>{topic}</TopicTitle>
										{questionsGrouped[topic].map((question, index) => (
											<WrongQuestion key={question._id} question={question} num={index + 1} onDelete={handleDeleteQuestion} isDeleting={isDeleting} />
										))}
									</TopicSection>
								))
						)}
					</QuestionHolder>
				</ContentColumn>

				<RightColumn>
					{availableCategories.length > 0 && (
						<TopicsBox>
							<SidebarTitle $weight="bold" $size="1.6rem" style={{ marginBottom: "0.8rem" }}>
								Категории
							</SidebarTitle>
							<CategoryButtonContainer>
								{availableCategories.map((category) => (
									<TopicButton key={category} $active={activeCategory === category} onClick={() => setActiveCategory(category)}>
										{category}
									</TopicButton>
								))}
							</CategoryButtonContainer>
						</TopicsBox>
					)}

					{Object.keys(questionsGrouped).length > 0 && (
						<TopicsBox>
							<SidebarTitle $weight="bold" $size="1.6rem" style={{ marginBottom: "0.8rem" }}>
								Теми в {activeCategory}
							</SidebarTitle>
							<CategoryButtonContainer>
								{currentTopics
									.filter((topic) => questionsGrouped[topic])
									.map((topic) => (
										<TopicButton key={topic} onClick={() => scrollToTopic(topic)}>
											{topic} ({questionsGrouped[topic]?.length || 0})
										</TopicButton>
									))}
							</CategoryButtonContainer>
						</TopicsBox>
					)}
				</RightColumn>
			</MainContainer>
		</>
	);
}

export default WrongQuestions;

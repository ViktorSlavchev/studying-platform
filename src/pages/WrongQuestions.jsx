import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Text from "../ui/Text";
import InfoBox from "../ui/InfoBox";
import WrongQuestion from "../features/mistaken/WrongQuestion";
import QuestionHolder from "../features/exam/QuestionHolder";
import Spinner from "../ui/Spinner";
import { belTopics, litTopics } from "../utils/topics";
import { useMistakenQuestions, useDeleteMistakenQuestion } from "../features/mistaken/useMistakenQuestions";

const RightColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	align-self: flex-start;
	/* position: sticky; */
	top: 2rem;
`;

const TopicsBox = styled(InfoBox)`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	padding: 2rem;
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

	&:hover {
		background: var(--color-brand-50);
		border-color: var(--color-brand);
		color: var(--color-brand);
	}
`;

const TopicSection = styled.div`
	margin-bottom: 3.2rem;
`;

const TopicTitle = styled(Text)`
	font-size: 1.8rem;
	font-weight: bold;
	margin-bottom: 1.6rem;
	padding: 1.2rem 0;
	border-bottom: 2px solid var(--color-border);
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
			<Heading>Предишни грешки</Heading>
			<Row $gap="3.2rem" style={{ width: "100%" }}>
				<QuestionHolder style={{ flex: 2, minWidth: "0" }}>
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

				<RightColumn style={{ flex: 1, minWidth: "0" }}>
					{availableCategories.length > 0 && (
						<TopicsBox>
							<Text $weight="bold" $size="1.6rem" style={{ marginBottom: "0.8rem" }}>
								Категории
							</Text>
							{availableCategories.map((category) => (
								<TopicButton key={category} $active={activeCategory === category} onClick={() => setActiveCategory(category)}>
									{category}
								</TopicButton>
							))}
						</TopicsBox>
					)}

					{Object.keys(questionsGrouped).length > 0 && (
						<TopicsBox>
							<Text $weight="bold" $size="1.6rem" style={{ marginBottom: "0.8rem" }}>
								Теми в {activeCategory}
							</Text>
							{currentTopics
								.filter((topic) => questionsGrouped[topic])
								.map((topic) => (
									<TopicButton key={topic} onClick={() => scrollToTopic(topic)}>
										{topic} ({questionsGrouped[topic]?.length || 0})
									</TopicButton>
								))}
						</TopicsBox>
					)}
				</RightColumn>
			</Row>
		</>
	);
}

export default WrongQuestions;

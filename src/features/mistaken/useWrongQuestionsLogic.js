import { useState, useEffect } from "react";
import { belTopics, litTopics } from "../../utils/topics";

export const useWrongQuestionsLogic = (mistakenQuestions) => {
	const [activeCategory, setActiveCategory] = useState("Български език");

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

	const questionsGrouped = getQuestionsGroupedByTopic(activeCategory);
	const currentTopics = getTopicsForCategory(activeCategory);
	const availableCategories = getAvailableCategories();

	// Set default category to first available category if current one has no questions
	useEffect(() => {
		if (availableCategories.length > 0 && !availableCategories.includes(activeCategory)) {
			setActiveCategory(availableCategories[0]);
		}
	}, [availableCategories, activeCategory]);

	return {
		activeCategory,
		setActiveCategory,
		questionsGrouped,
		currentTopics,
		availableCategories,
	};
};

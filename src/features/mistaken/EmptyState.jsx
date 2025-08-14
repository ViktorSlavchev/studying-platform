import React from "react";
import Text from "../../ui/Text";
import InfoBox from "../../ui/InfoBox";

const EmptyState = ({ mistakenQuestions, questionsGrouped, activeCategory }) => {
	if (!mistakenQuestions || mistakenQuestions.length === 0) {
		return (
			<InfoBox>
				<Text style={{ textAlign: "center", padding: "2rem" }}>
					Няма регистрирани грешни отговори
				</Text>
			</InfoBox>
		);
	}

	if (Object.keys(questionsGrouped).length === 0) {
		return (
			<InfoBox>
				<Text style={{ textAlign: "center", padding: "2rem" }}>
					Няма грешни отговори за категория &ldquo;{activeCategory}&rdquo;
				</Text>
			</InfoBox>
		);
	}

	return null;
};

export default EmptyState;

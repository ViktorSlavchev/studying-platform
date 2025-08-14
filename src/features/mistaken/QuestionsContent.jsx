import React from "react";
import { TopicSection, TopicTitle } from "./WrongQuestions.styles";
import WrongQuestion from "./WrongQuestion";

const QuestionsContent = ({ 
	questionsGrouped, 
	currentTopics, 
	sectionRefs, 
	onDeleteQuestion, 
	isDeleting 
}) => {
	const questionsWithTopics = currentTopics.filter((topic) => questionsGrouped[topic]);
	
	return (
		<>
			{questionsWithTopics.map((topic) => (
				<TopicSection key={topic} ref={(el) => (sectionRefs.current[topic] = el)}>
					<TopicTitle>{topic}</TopicTitle>
					{questionsGrouped[topic].map((question, index) => (
						<WrongQuestion 
							key={question._id} 
							question={question} 
							num={index + 1} 
							onDelete={onDeleteQuestion} 
							isDeleting={isDeleting} 
						/>
					))}
				</TopicSection>
			))}
		</>
	);
};

export default QuestionsContent;

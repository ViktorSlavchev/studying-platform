import { useParams } from "react-router";

import Spinner from "../ui/Spinner";
import { useExam } from "../features/exam/useExam";
import { useSubmit } from "../features/exam/useSubmit";
import { useExamState } from "../features/exam/useExamState";
import ExamLayout from "../features/exam/ExamLayout";
import ExamStatus from "../features/exam/ExamStatus";

function Exam() {
	const { id } = useParams();
	const { submit, isLoading: isLoadingSubmit } = useSubmit();
	const { exam, isLoading } = useExam({ id });

	// Use exam state management hook
	const { answers, setAnswers, answeredQuestionsCount, handleSubmit } = useExamState(exam, id, submit);

	if (isLoading) {
		return <Spinner />;
	}

	// Handle special exam states
	if (exam.status === "grading") {
		return <ExamStatus status={exam.status} />;
	}

	return <ExamLayout exam={exam} answers={answers} setAnswers={setAnswers} answeredQuestionsCount={answeredQuestionsCount} onSubmit={handleSubmit} isSubmitting={isLoadingSubmit} />;
}

export default Exam;

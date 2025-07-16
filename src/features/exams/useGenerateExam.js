import { useQuery } from '@tanstack/react-query';
import { generateExam as generateExamApi } from '../../services/apiExams';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '../../utils/handleApiError';

export function useGenerateExam() {
    const navigate = useNavigate();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['generateExam'],
        queryFn: generateExamApi,
        enabled: false,
        retry: (failureCount, error) => {
            if (error?.message?.toLowerCase().includes("unseen material")) return false;
            return failureCount < 2;
        },

        onSuccess: (exam) => {
            console.log(exam);
            toast.success('Изпитът е генериран успешно!');
            navigate(`/exam/${exam.examId}`, { replace: true });
        },
        onError: (error) => {
            console.error('Error generating exam:', error);
            if (error.message.toLowerCase().includes("unseen material")) {
                toast.error("Не сте отбелязали достатъчно теми като взети, за да генерираме изпит.")
            } else {
                toast.error('Грешка при генериране на изпита. Моля, опитайте отново. Ако проблемът продължава, свържете се с администратора.');
            }
            handleApiError(error, navigate, '/exams', false);
        },
    });

    return { generateExam: refetch, isLoading, exam: data };
}
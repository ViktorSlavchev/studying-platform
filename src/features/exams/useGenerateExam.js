import { useQuery } from '@tanstack/react-query';
import { generateExam as generateExamApi } from '../../services/apiExams';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useGenerateExam() {
    const navigate = useNavigate();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['generateExam'],
        queryFn: generateExamApi,
        enabled: false,
        onSuccess: (exam) => {
            toast.success('Изпитът е генериран успешно!');
            navigate(`/exam/${exam.examId}`, { replace: true });
        },
        onError: (error) => {
            console.error('Error generating exam:', error);
            toast.error('Грешка при генериране на изпита. Моля, опитайте отново.');
        },
    });

    return { generateExam: refetch, isLoading, exam: data };
}
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useSignup() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();


    const { mutate: signup, isLoading } = useMutation({
        mutationFn: ({ email, password, name }) => signupApi({ email, password, name }),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user);
            navigate('/home', { replace: true });

        },
        onError: (err) => {
            console.log('ERROR', err);
            toast.error('Вече съществува акаунт с този имейл адрес.');
        },
    });



    return { signup, isLoading };
}
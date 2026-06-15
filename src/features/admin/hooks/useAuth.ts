import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { apiFetch } from '@/lib/api';

interface LoginResponse {
    access_token: string;
}

export function useAuth() {
    const navigate = useNavigate();

    const login = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            apiFetch<LoginResponse>('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            }),
        onSuccess: ({ access_token }) => {
            localStorage.setItem('admin_token', access_token);
            void navigate('/admin');
        },
    });

    function logout() {
        localStorage.removeItem('admin_token');
        void navigate('/admin/login');
    }

    return { login, logout };
}

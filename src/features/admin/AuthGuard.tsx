import { Navigate } from 'react-router';
import type { ReactNode } from 'react';

export function AuthGuard({ children }: { children: ReactNode }) {
    const token = localStorage.getItem('admin_token');
    if (!token) return <Navigate to="/admin/login" replace />;
    return <>{children}</>;
}

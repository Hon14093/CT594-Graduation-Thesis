import React from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function PersonalPage() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <Button variant='destructive' onClick={() => {
                logout();
                navigate('/');
            }}>
                Log out
            </Button>
        </div>
    )
}

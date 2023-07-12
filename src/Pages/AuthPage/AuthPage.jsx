import './AuthPage.css'
import { useState } from 'react';
import SignUpForm from '../../Components/SignUpForm/SignUpForm'
import LoginForm from '../../Components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {
    const [showAuthPage, setShowAuthPage] = useState(true)

    return (
        <>
            {showAuthPage ? <SignUpForm setUser={setUser} /> : <LoginForm setUser={setUser} />}
            <button className="login-option-btn" onClick={() => setShowAuthPage(!showAuthPage)}>
                {showAuthPage ? 'Login' : 'Sign Up'}
            </button>
        </>
    );
}
import './AuthPage.css'
import { useState } from 'react';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';
import LoginForm from '../../Components/LoginForm/LoginForm';

export default function AuthPage({ setUser, fetchUser }) {
    const [showAuthPage, setShowAuthPage] = useState(true);

    return (
        <div className='auth-page'>
            <br />
            <div className='landing-page-message'>
                <h1 className='auth-page-title'>ALLY</h1>
                <h3>Discover Ally, your personal relationship companion.</h3>
                <p>
                    Harness the power of AI-generated resources to strengthen your connections and become the ultimate support system for your loved ones. Sign up for free and elevate your relationships to new heights.
                </p>
            </div>
            <div className='auth-page-forms'>
                {showAuthPage ? <SignUpForm setUser={setUser} fetchUser={fetchUser} /> : <LoginForm fetchUser={fetchUser} />}
                <button className='login-option-btn' onClick={() => setShowAuthPage(!showAuthPage)}>
                    {showAuthPage ? 'Login' : 'Sign Up'}
                </button>
            </div>
        </div>
    );
}
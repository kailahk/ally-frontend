import './AuthPage.css'
import { useState } from 'react';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';
import LoginForm from '../../Components/LoginForm/LoginForm';

export default function AuthPage({ setUser, fetchUser }) {
    const [showAuthPage, setShowAuthPage] = useState(true);

    return (
        <div className='auth-page'>
            <h1>ALLY</h1>
            <div className='auth-page-forms'>
                {showAuthPage ? <SignUpForm setUser={setUser} fetchUser={fetchUser} /> : <LoginForm fetchUser={fetchUser} />}
               <p>{showAuthPage ? 'Already have an account?' : 'Don\'t have an account yet?'}</p> 
                <p className='login-option-btn' onClick={() => setShowAuthPage(!showAuthPage)}>
                    {showAuthPage ? 'Login' : 'Sign Up'}
                </p>
            </div>
        </div>
    );
}
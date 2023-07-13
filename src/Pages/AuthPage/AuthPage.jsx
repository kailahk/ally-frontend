import './AuthPage.css'
import { useState } from 'react';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';
import LoginForm from '../../Components/LoginForm/LoginForm';

export default function AuthPage({ fetchUser }) {
	const [showAuthPage, setShowAuthPage] = useState(true);

	return (
		<>
			{showAuthPage ? <SignUpForm fetchUser={fetchUser} /> : <LoginForm fetchUser={fetchUser} />}
			<button className='login-option-btn' onClick={() => setShowAuthPage(!showAuthPage)}>
				{showAuthPage ? 'Login' : 'Sign Up'}
			</button>
		</>
	);
}
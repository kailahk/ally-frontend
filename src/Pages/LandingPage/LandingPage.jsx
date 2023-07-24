import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './LandingPage.css'

const SERVER_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'https://web-production-caf1c.up.railway.app';

export default function LandingPage({ fetchUser }) {
    const [friend, setFriend] = useState('friend');
    const [error, setError] = useState('');
    const friendOptions = ['sister', 'mother', 'brother', 'father', 'parent', 'partner', 'ally', 'grandparent', 'BFF', 'person', 'sibling', 'supporter']
    useEffect(() => {
        const interval = setInterval(() => {
            setFriend(friendOptions[Math.floor(Math.random() * 11)]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    const credentials = { email: 'guest@email.com', password: 'guest' };

    async function handleSubmit() {
        console.log(credentials, JSON.stringify(credentials))
        try {
            const res = await fetch(SERVER_URL + '/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            const tokenObj = await res.json();
            const token = tokenObj['token'];
            localStorage.setItem('token', token);
            fetchUser(token);
        } catch (err) {
            console.log(err);
            setError('Log In Failed - Try Again');
        }
    }
    return (
        <div className='landing-page'>
            <h1 className='title'>ALLY</h1>
            <h3>BE THE BEST / {friend.toLocaleUpperCase()} / YOU CAN BE.</h3>
            <p>
                Harness the power of AI to get book, article, and podcast recommendations to give you insight into your / person's / unique circumstances and help you do what you already do: support your loved ones.</p>
            <div className="landing-btns">
                <Link to="/authpage">Sign Up for Free</Link>
                <button onClick={handleSubmit} className="guest-login-btn">Guest Login</button>
            </div>
        </div>
    )
}
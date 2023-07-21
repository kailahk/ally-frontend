import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './LandingPage.css'

export default function LandingPage() {
    const [friend, setFriend] = useState('friend');
    const friendOptions = ['sister', 'mother', 'brother', 'father', 'parent', 'partner', 'ally', 'grandparent', 'BFF', 'person', 'sibling', 'supporter']
    useEffect(() => {
        const interval = setInterval(() => {
            setFriend(friendOptions[Math.floor(Math.random() * 11)]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className='landing-page'>
            <h1 className='title'>ALLY</h1>
            <h3>BE THE BEST / {friend.toLocaleUpperCase()} / YOU CAN BE.</h3>
            <p>
                Harness the power of AI to get book, article, and podcast recommendations to give you insight into your / person's / unique circumstances and help you do what you already do: support your loved ones.</p>
            <Link to="/authpage">Sign Up for Free</Link>
        </div>
    )
}
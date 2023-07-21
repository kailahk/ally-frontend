import { Link } from 'react-router-dom'
import { useState } from 'react';
import './LandingPage.css'

export default function LandingPage() {
    const [friend, setFriend] = useState('friend');
    return (
        <div className='landing-page'>
            <h1 className='title'>ALLY</h1>
            <h3>BE THE BEST / {friend.toLocaleUpperCase()} / YOU CAN BE.</h3>
            <p>
                Harness the power of AI to get book, article, and podcast recommendations to give you insight into your / partner's / unique circumstances and help you do what you already do: support your loved ones.</p>
            <Link to="/authpage">Sign Up for Free</Link>
        </div>
    )
}
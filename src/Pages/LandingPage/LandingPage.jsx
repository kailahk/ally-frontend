import { Link } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage() {
    return (
        <div className='landing-page-message'>
            <h1 className='auth-page-title'>ALLY</h1>
            <h3>Discover Ally, your personal relationship companion.</h3>
            <p>
                Harness the power of AI-generated resources to strengthen your connections and become the ultimate support system for your loved ones. Sign up for free and elevate your relationships to new heights.
            </p>
            <Link to="/authpage">Sign Up for Free</Link>
        </div>
    )
}
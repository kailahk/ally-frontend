import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar({ user, setUser}) {

    return (
        <nav>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/about'>About</Link>
            <Link to=''>Log Out</Link>
            <p className='welcome-user'>Welcome, {(user.name).charAt(0).toUpperCase() + (user.name).slice(1)}!</p>
        </nav>
    )
}
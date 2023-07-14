import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar({ user, handleLogout }) {
    return (
        <nav className='navbar'>
            <h1 className='nav-logo'>ALLY</h1>
            <Link className='dash-link' to='/'>Dashboard</Link>
            <p className='welcome-user'>
                Welcome, {user?.name}!
            </p>
            <Link className='logout-btn' to='' onClick={handleLogout}>
                LOG OUT
            </Link>
        </nav>
    );
}
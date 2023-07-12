import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar({ user, setUser }) {
    return (
        <nav>
            <Link to='/'>Home</Link>
        </nav>
    )
}
import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar({ user, handleLogout }) {
	return (
		<nav>
			<Link to='/'>Dashboard</Link>
			<Link to='/about'>About</Link>
			<Link to='' onClick={handleLogout}>
				Log Out
			</Link>
			<p className='welcome-user'>
				{/* Welcome, {user?.name.charAt(0).toUpperCase() + user.name.slice(1)}! */}
				Welcome, {user?.name}
			</p>
		</nav>
	);
}
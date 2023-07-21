import './NavBar.css';
import { Link, useParams } from 'react-router-dom';

export default function NavBar({ user, handleLogout }) {
    const url = window.location.href.split('/')[3];
    return (
        <nav className='navbar'>
            <h1 className='nav-logo'>ALLY</h1>
            <div>
                <Link className={url === '' ? 'dash-link active-nav' : 'dash-link'} to='/'>dashboard</Link>
                <Link className={url === 'newfile' ? 'dash-link active-nav' : 'dash-link'} to='/newfile'>new file</Link>
                <Link className={url === 'about' ? 'dash-link active-nav' : 'dash-link'} to='/about'>about</Link>
                <Link className='logout-btn dash-link' to='' onClick={handleLogout}>
                    LOG OUT
                </Link>
            </div>
        </nav>
    );
}
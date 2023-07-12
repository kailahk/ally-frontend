import './DashboardPage.css'
import { Link } from 'react-router-dom';


export default function DashboardPage() {
    return (
        <>
            <h1>Dashboard Page</h1>
            <Link to='/newfile'>
                <button>New File</button>
            </Link>
        </>
    )
}
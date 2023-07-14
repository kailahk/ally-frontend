import './DashboardPage.css'
import { Link } from 'react-router-dom';
import FileList from '../../Components/File/File';


export default function DashboardPage({ files, user }) {

    return (
        <div className='dashboard-page'>
            <h2>People</h2>
            <FileList user={user} />
            <Link to='/newfile'>
                <button className='new-file-btn'>Add Person</button>
            </Link>
        </div>
    )
}
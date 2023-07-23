import './DashboardPage.css'
import { Link } from 'react-router-dom';
import FileList from '../../Components/File/File';


export default function DashboardPage({ files, user }) {

    return (
        <div className='dashboard-page'>
            <h2>People</h2>
            <img className='img-left' src="https://i.imgur.com/TQ9tQSC.png" alt="hand in the sunset" />
            <FileList user={user} />
            <img className='img-right' src="https://i.imgur.com/BV16woX.png" alt="hand in the sunset" />
            <Link to='/newfile'>
                <button className='new-file-btn'>new file</button>
            </Link>
        </div>
    )
}
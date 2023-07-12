import './DashboardPage.css'
import { Link } from 'react-router-dom';
import File from '../../Components/File/File';


export default function DashboardPage({ files }) {
    const filesList = files.map((file, idx) => <File
        key={idx}
        file={file}
    />)
    return (
        <>
            <h1>Dashboard Page</h1>
            {filesList}
            <Link to='/newfile'>
                <button>New File</button>
            </Link>
        </>
    )
}
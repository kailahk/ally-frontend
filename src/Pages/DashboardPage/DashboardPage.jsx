import './DashboardPage.css'
import { Link } from 'react-router-dom';
import FileList from '../../Components/File/File';


export default function DashboardPage({ files, user}) {
    // const filesList = files.map((file, idx) => <File
    //     key={idx}
    //     file={file}
    // />)
    return (
        <>
            <h1>Dashboard Page</h1>

            <FileList user={user}/>
            <Link to='/newfile'>
                <button>New File</button>
            </Link>
        </>
    )
}
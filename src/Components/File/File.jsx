import './File.css'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// export default function File() {
//     const PostList = () => {
//         const [posts, setPosts] = useState([]);
//     console.log(file)
// }

const SERVER_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8000'
		: 'https://web-production-caf1c.up.railway.app';

export default function FileList({ user }) {
    const [Files, setFiles] = useState([]);

    const getFiles = async () => {
        try {
            const response = await fetch(SERVER_URL + '/info/getFiles', {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                },
                body: JSON.stringify({ userid: user._id }),
            });
            const allFiles = await response.json();
            setFiles(allFiles);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getFiles();
    }, []);

    return (
        <ul className='file'>
            {Files &&
                Files.map((file) => (
                    <div className="file-summary" key={file._id}>
                        <Link to={`/filedetails/${file._id}`}>
                            <div className="title">
                                <div className='icon-summary'></div>
                                <p><span>{file.title}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                <p className='relationship-summary'>{file.relationship}</p>
                            </div>
                        </Link>
                        <hr />
                    </div>
                ))}
        </ul>
    );
};


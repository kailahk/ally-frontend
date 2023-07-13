import './FileDetailsPage.css'
import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function FileDetailsPage({user}) {
    const BASE_URL = "http://localhost:8000";
    const { id } = useParams();
    const [File, setFile] = useState([]);
    const getFile = async () => {
        try {
            const response = await fetch(BASE_URL + `/info/getFile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userid: user._id,
                    fileid: id
                })
            });
            const result = await response.json();
            setFile(result[0]);
        } catch (err) {
          console.error(err);
        }
    };
    useEffect(() => {
        getFile();
    }, []);

    const deleteFile = async () => {
        try {
            const response = await fetch(BASE_URL + `/info/deleteFile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userid: user._id,
                    fileid: id
                })
            });
            const result = await response.json();
            setFile(result[0]);
        } catch (err) {
          console.error(err);
        }
    };

    return(
        <div>
            <h1>File Details Page</h1>
            <p>Title: {File.title}</p>
            <p>Date: {File.date}</p>
            <p>Relationship: {File.relationship}</p>
            <p>Age: {File.age}</p>
            <p>Circustances: {File.circumstances}</p>
            <p>Notes: {File.notes}</p>
            <Link to='/dashboard'>
                <button className="" onClick={() => deleteFile()}>
                    Delete
                </button>
            </Link>
        </div>
    )
}
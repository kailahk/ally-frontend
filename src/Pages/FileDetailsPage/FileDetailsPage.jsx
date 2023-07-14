import './FileDetailsPage.css'
import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import ChatResponse from '../../Components/ChatResponse/ChatResponse';

export default function FileDetailsPage({ user }) {
    const BASE_URL = "http://localhost:8000";
    const { id } = useParams();
    const [File, setFile] = useState([]);
    const [chatRes, setChatRes] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const prompt = [
        { role: 'system', content: 'You are a helpful chat bot in a web application. The application is called Ally, and it is a platform where people can keep track of their personal relationships. The app allows users to create a file for each important person in their life, which contains the person\'s age, the relationship of the person to the user, circumstances that the person is experiencing (good or bad), and notes that the user has written about the person. When the user clicks a button that says \'get AI-generated resources to help you support your person\', you will be provided information about one of the people that the user has a relationship with. Your job is to provide helpful resources (books, podcasts, articles, recent research, etc.) that educate the user and gives them insight into the circumstances the person is dealing with. The intention of this functionality is to help empower the user to be the best friend and/or family member that they can be to the import people in their life.', },
        { role: 'user', content: `My ${File.relationship || 'person'} is dealing with the following circumstances: ${File.circumstances || 'none'}. They are ${File.age || 'I don\'t know'} years old. Here are my personal notes about them: ${File.notes || 'no notes'}. I last interacted with them on ${File.date || 'I\'m not sure'}. Can you please provide me with some resources that will help me understand their situation(s) and better support them?` }
        ]

    async function handleClick() {
        setLoading(true);
        try {
          const res = await fetch(BASE_URL + '/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: prompt }),
          });
          const result = await res.json();
          setLoading(false);
          setChatRes(result.content);
        } catch (error) {
          setError('Error Generating Resources - Try again.');
        }
    }

    const getFile = async () => {
        try {
            const response = await fetch(BASE_URL + `/info/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const result = await response.json();
            console.log(result)
            setFile(result);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getFile();
    }, []);

    const editFile = async () => {
        
    }

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
    const fileDate = new Date(File.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    const arrChatRes = chatRes.split('\n').filter((line) => line !== "");
    const chatResponses = arrChatRes.map((line, idx) => <ChatResponse line={line} key={idx}/>)
    return (
        <div className='file-details-page'>
            <h1>File Details Page</h1>
            <p>Name or Description: {File.title}</p>
            <p>Last Interacted: {fileDate}</p>
            <p>Relationship: {File.relationship}</p>
            <p>Age: {File.age}</p>
            <p>Circustances: {File.circumstances}</p>
            <p>Notes: {File.notes}</p>
            <Link to='/dashboard'>
                <button className="" onClick={() => deleteFile()}>
                    Delete
                </button>
                <button className="" onClick={() => editFile()}>
                    Edit
                </button>
            </Link>
            <button onClick={handleClick}>Get AI-Generated resources</button>
            <p>{error}</p>
            <p>{loading ? 'Gathering Resources' : ''}</p>
            {chatResponses}
        </div>
    )
}
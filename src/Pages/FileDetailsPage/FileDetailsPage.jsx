import './FileDetailsPage.css'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"

export default function FileDetailsPage({files}) {
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [chatRes, setChatRes] = useState('')
    const [error, setError] = useState('')
    const prompt = [
        { role: 'system', content: 'You are a helpful chat bot in a web application. The application is called Ally, and it is a platform where people can keep track of their personal relationships. The app allows users to create a file for each important person in their life, which contains the person\'s age, the relationship of the person to the user, circumstances that the person is experiencing (good or bad), and notes that the user has written about the person. When the user clicks a button that says \'get AI-generated resources to help you support your person\', you will be provided information about one of the people that the user has a relationship with. Your job is to provide helpful resources (books, podcasts, articles, recent research, etc.) that educate the user and gives them insight into the circumstances the person is dealing with. The intention of this functionality is to help empower the user to be the best friend and/or family member that they can be to the import people in their life.', },
        // { role: 'user', content: `My ${file.relationship} is dealing with the following circumstances: ${file.circumstances}. They are ${file.age} years old. Here are my personal notes about them ${file.notes}. I last interacted with them on ${file.date}. Can you please provide me with some resources that will help me understand their situation(s) and better support them?` }
        { role: 'user', content: `who was the president in 1972?`}]

    async function handleClick() {
        const res = await fetch('http://localhost:8000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: prompt }),
        })
            .then((response) => {
                response.json()
            })
            .then((data) => {
                setChatRes(data)
            })
            .catch((err) => {
                setError('Error Generating Resources - Try again.')
            });
    }

    return (
        <>
            <h1>File Details Page</h1>
            <button onClick={handleClick}>Get AI-generated resources!</button>
            {/* <p className="error-message">{error || chatRes}</p> */}
        </>
    )
}
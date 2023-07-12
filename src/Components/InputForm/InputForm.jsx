import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './InputForm.css';
import PropTypes from 'prop-types'

export default function InputForm (){
    const [posts, setPosts] = useState([])
    const navigate = useNavigate();
    const [postForm, setPostform] = useState({
        title: "",
        relationship:"",
        circumstances: "",
        age: "",
        dates: "",
        userNotes: ""
    });

    const BASE_URL = "http://localhost:8000";

    const handleChange = (e) => {
        const userInput = {...postForm};
        userInput[e.target.name] = e.target.value;
        setPostform(userInput);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentState = {...postForm }
        try {
           const requestOptions = {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify(currentState),
           };
           const response = await fetch(BASE_URL + "/info/createFile", requestOptions);
           const newPost = await response.json();
           setPostform([...posts, newPost]);
           setPostform({
            title: "",
            relationship:"",
            circumstances: "",
            age: "",
            dates: "",
            notes: ""
           })
           navigate("/")
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="post-wrapper">
            <h1>Create file</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Title</p>
                    <textarea type="text" name="title" value={postForm.title} onChange={handleChange} />

                </label>
                <label>
                    <p>relationship</p>
                    <textarea type="text" name="relationship" value={postForm.relationship} onChange={handleChange} />
                    
                </label>
                <label>
                    <p>circumstance</p>
                    <textarea type="text" name="circumstances" value={postForm.circumstances} onChange={handleChange} />
                 
                </label>
                <label>
                    <p>age</p>
                    <input type="number" name="age" value={postForm.age} onChange={handleChange} />
                    
                </label>
                <label>
                    <p>dates</p>
                    <textarea type="text" name="dates" value= {postForm.dates} onChange={handleChange} />
                    
                </label>
                <label>
                    <p>notes</p>
                    <textarea type="text" name="notes" value = {postForm.notes} onChange={handleChange} />
                    
                </label>
                <div className="btn postbtn1">
              <input className="postBtn" type="submit" value="Sav File" />
              </div>
            </form>
        </div>
    )
    }

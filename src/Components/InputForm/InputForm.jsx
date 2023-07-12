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

    const BASE_URL = "http:localhost:8000";

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
           const response = await fetch(BASE_URL + "/info/updateUser", requestOptions);
           const newPost = await response.json();
           setPostform([...posts, newPost]);
           setPostform({
            title: "",
            relationship:"",
            circumstances: "",
            age: "",
            dates: "",
            userNotes: ""
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
                    <textarea type="text" onChange={ handleChange} />

                </label>
                <label>
                    <p>relationship</p>
                    <textarea type="text" onChange={ handleChange} />
                    
                </label>
                <label>
                    <p>circumstance</p>
                    <textarea type="text" onChange={ handleChange} />
                 
                </label>
                <label>
                    <p>age</p>
                    <input type="number" onChange={ handleChange} />
                    
                </label>
                <label>
                    <p>dates</p>
                    <textarea type="text" onChange={ handleChange} />
                    
                </label>
                <label>
                    <p>notes</p>
                    <textarea type="text" onChange={ handleChange} />
                    
                </label>
                <div className="btn postbtn1">
              <input className="postBtn" type="submit" value="Sav File" />
              </div>
            </form>
        </div>
    )
    }

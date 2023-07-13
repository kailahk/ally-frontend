import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import './InputForm.css';
import PropTypes from 'prop-types'
import "react-datepicker/dist/react-datepicker.css";


export default function InputForm({user}) {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate();
    const [dateValue, setDateValue] = useState(new Date());
    const [postForm, setPostform] = useState({
        title: "",
        relationship: "",
        circumstances: "",
        age: "",
        date: dateValue,
        notes: "",
        userid: user._id
    });

    const BASE_URL = "http://localhost:8000";

    const handleChange = (e) => {
        const userInput = { ...postForm };
        userInput[e.target.name] = e.target.value;
        setPostform(userInput);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentState = { ...postForm }
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
            userNotes: ""
           })
           navigate("/dashboard")
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="post-wrapper">
            <form onSubmit={handleSubmit} className="new-file-form">
                <label>
                    <h4>Title</h4>
                    <p>name or description</p>
                    <textarea name="title" value={postForm.title} type="text" onChange={handleChange} />

                </label>
                <label>
                    <h4>Relationship</h4>
                    <p>who they are to you</p>
                    <textarea name="relationship" value={postForm.relationship} type="text" onChange={handleChange} />
                </label>
                <label>
                    <h4>Circumstances</h4>
                    <p>major life events</p>
                    <textarea name="circumstances" value={postForm.circumstances} type="text" onChange={handleChange} />

                </label>
                <label>
                    <h4>Age</h4>
                    <input name="age" value={postForm.age} type="number" onChange={handleChange} />

                </label>
                <div className="calendar-container">
                    <label>
                        <h4>Date</h4>
                    </label>
                    <p>last time you interacted</p>
                    <DatePicker onChange={(date) => setDateValue(date)} selected={dateValue} className="date-picker" />
                </div>
                <label>
                    <h4>Notes</h4>
                    <textarea name="notes" value={postForm.notes} type="text" onChange={handleChange} />

                </label>
                <div className="btn postbtn1">
                    <input className="postBtn" type="submit" value="Save File" />
                </div>
            </form>
        </div>
    )
}

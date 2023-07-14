import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InputForm from '../../Components/InputForm/InputForm';
import './NewFilePage.css';

const SERVER_URL = import.meta.env.REACT_APP_SERVER_URL;

export default function NewFilePage({ user }) {
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();
	const [dateValue, setDateValue] = useState(new Date());
	const [birthday, setBirthday] = useState(new Date());
	const [postForm, setPostform] = useState({
		title: '',
		relationship: '',
		circumstances: '',
		birthday: new Date(),
		date: new Date(),
		notes: '',
		userid: user._id,
	});

	const handleChange = (e) => {
		const userInput = { ...postForm };
		userInput[e.target.name] = e.target.value;
		setPostform(userInput);
	};

	const handleCreateFile = async (e) => {
		e.preventDefault();
		const currentState = { ...postForm, birthday, date: dateValue };
		try {
			const requestOptions = {
				method: 'POST',
				headers: {
					'content-Type': 'application/json',
				},
				body: JSON.stringify(currentState),
			};
			const response = await fetch(SERVER_URL + '/info/createFile', requestOptions);
			const newPost = await response.json();
			setPostform([...posts, newPost]);
			setPostform({
				title: '',
				relationship: '',
				circumstances: '',
				birthday: '',
				date: '',
				notes: '',
			});
			navigate('/dashboard');
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className='new-file-page'>
			<h1>New File Page</h1>
			<InputForm
				user={user}
				fileData={postForm}
				handleSubmit={handleCreateFile}
				handleChange={handleChange}
				setDateValue={setDateValue}
				dateValue={dateValue}
				birthday={birthday}
				setBirthday={setBirthday}
			/>
		</div>
	);
}

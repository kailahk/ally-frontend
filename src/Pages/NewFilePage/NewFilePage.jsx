import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InputForm from '../../Components/InputForm/InputForm';
import './NewFilePage.css';

export default function NewFilePage({ user }) {
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();
	const [dateValue, setDateValue] = useState(new Date());
	const [postForm, setPostform] = useState({
		title: '',
		relationship: '',
		circumstances: '',
		age: '',
		date: dateValue,
		notes: '',
		userid: user._id,
	});

	const BASE_URL = 'http://localhost:8000';

	const handleChange = (e) => {
		const userInput = { ...postForm };
		userInput[e.target.name] = e.target.value;
		setPostform(userInput);
	};

	const handleCreateFile = async (e) => {
		e.preventDefault();
		try {
			const requestOptions = {
				method: 'POST',
				headers: {
					'content-Type': 'application/json',
				},
				body: JSON.stringify(postForm),
			};
			const response = await fetch(BASE_URL + '/info/createFile', requestOptions);
			const newPost = await response.json();
			setPostform([...posts, newPost]);
			setPostform({
				title: '',
				relationship: '',
				circumstances: '',
				age: '',
				dates: '',
				userNotes: '',
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
			/>
		</div>
	);
}

import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import InputForm from '../../Components/InputForm/InputForm';
import './EditFilePage.css';

const dateConversationOptions = {
	timeZone: 'America/Los_Angeles',
	weekday: 'short',
	year: 'numeric',
	month: 'short',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
	timeZoneName: 'short',
};

export default function EditFilePage({ user }) {
	const [puts, setPuts] = useState([]);
	const navigate = useNavigate();
	const [dateValue, setDateValue] = useState(null);
	const [putForm, setPutForm] = useState({
		title: '',
		relationship: '',
		circumstances: '',
		age: '',
		date: dateValue,
		notes: '',
		userid: user._id,
	});

	const { id } = useParams();

	const BASE_URL = 'http://localhost:8000';

	const handleChange = (e) => {
		const userInput = { ...putForm };
		userInput[e.target.name] = e.target.value;
		setPutForm(userInput);
	};

	const handlePutFile = async (e) => {
		e.preventDefault();
		try {
			const requestOptions = {
				method: 'PUT',
				headers: {
					'content-Type': 'application/json',
					// authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({ ...putForm, date: dateValue }),
			};
			const response = await fetch(BASE_URL + '/info/putFile/' + id, requestOptions);
			const newPut = await response.json();
			setPutForm([...puts, newPut]);
			setPutForm({
				title: '',
				relationship: '',
				circumstances: '',
				age: '',
				date: '',
				notes: '',
			});
			navigate('/fileDetails/' + id);
		} catch (err) {
			console.log(err);
		}
	};

	const getFile = async () => {
		try {
			const response = await fetch(BASE_URL + `/info/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await response.json();
			const newForm = {
				title: result.title,
				relationship: result.relationship,
				circumstances: result.circumstances,
				age: result.age,
				notes: result.notes,
			};
			console.log('Before', result.date);
			const date = new Date(result.date);
			// console.log('After', date.toLocaleDateString('en-us', dateConversationOptions));

			setPutForm(newForm);
			setDateValue(date);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getFile();
	}, []);

	console.log({ putForm });
	console.log({ dateValue });

	return (
		<div className='edit-file-page'>
			<h1>Edit File Page</h1>
			<InputForm
				user={user}
				fileData={putForm}
				handleSubmit={handlePutFile}
				handleChange={handleChange}
				setDateValue={setDateValue}
				dateValue={dateValue}
			/>
		</div>
	);
}

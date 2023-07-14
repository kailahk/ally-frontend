import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import InputForm from '../../Components/InputForm/InputForm';
import './EditFilePage.css';

const SERVER_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8000'
		: 'https://ally-fj80.onrender.com';

export default function EditFilePage({ user }) {
	const [puts, setPuts] = useState([]);
	const navigate = useNavigate();
	const [dateValue, setDateValue] = useState(null);
	const [birthday, setBirthday] = useState(null);
	const [putForm, setPutForm] = useState({
		title: '',
		relationship: '',
		circumstances: '',
		birthday: birthday,
		date: dateValue,
		notes: '',
		userid: user._id,
	});

	const { id } = useParams();

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
				},
				body: JSON.stringify({ ...putForm, birthday: birthday, date: dateValue }),
			};
			const response = await fetch(SERVER_URL + '/info/putFile/' + id, requestOptions);
			const newPut = await response.json();
			setPutForm([...puts, newPut]);
			setPutForm({
				title: '',
				relationship: '',
				circumstances: '',
				birthday: '',
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
			const response = await fetch(SERVER_URL + `/info/${id}`, {
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
				notes: result.notes,
			};
			const date = new Date(result.date);
			const bday = new Date(result.birthday);

			setPutForm(newForm);
			setDateValue(date);
			setBirthday(bday);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getFile();
	}, []);

	return (
		<div className='edit-file-page'>
			<h1>Edit Person</h1>
			<hr />
			<br />
			<InputForm
				user={user}
				fileData={putForm}
				handleSubmit={handlePutFile}
				handleChange={handleChange}
				setDateValue={setDateValue}
				dateValue={dateValue}
				birthday={birthday}
				setBirthday={setBirthday}
			/>
		</div>
	);
}

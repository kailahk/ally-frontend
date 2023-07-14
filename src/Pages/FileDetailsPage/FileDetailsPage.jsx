import './FileDetailsPage.css';
import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import ChatResponse from '../../Components/ChatResponse/ChatResponse';

const SERVER_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8000'
		: 'https://ally-fj80.onrender.com';

export default function FileDetailsPage({ user }) {
	const { id } = useParams();
	const [File, setFile] = useState([]);
	const [chatRes, setChatRes] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [reminderBday, setReminderBday] = useState(false);
	const [reminderCheckIn, setReminderCheckIn] = useState(false);
	const today = new Date();
	const oneWeekAgo = new Date(
		Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7))
	);
	const fileDate = new Date(File.date).toLocaleDateString('en-us', {
		weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
	const birthday = new Date(File.birthday).toLocaleDateString('en-us', {
		weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
	const arrChatRes = chatRes.split('\n').filter((line) => line !== '');
	const chatResponses = arrChatRes.map((line, idx) => <ChatResponse line={line} key={idx} />);

	const prompt = [
		{
			role: 'system',
			content:
				"You are a helpful chat bot in a web application. The application is called Ally, and it is a platform where people can keep track of their personal relationships. The app allows users to create a file for each important person in their life, which contains the person's age, the relationship of the person to the user, circumstances that the person is experiencing (good or bad), and notes that the user has written about the person. When the user clicks a button that says 'get AI-generated resources to help you support your person', you will be provided information about one of the people that the user has a relationship with. Your job is to provide helpful resources (books, podcasts, articles, recent research, etc.) that educate the user and gives them insight into the circumstances the person is dealing with. The intention of this functionality is to help empower the user to be the best friend and/or family member that they can be to the import people in their life.",
		},
		{
			role: 'user',
			content: `My ${File.relationship || 'person'} is dealing with the following circumstances: ${
				File.circumstances || 'none'
			}. Their birthday is ${
				birthday || "I don't know"
			}, which will tell you how old they are. Here are my personal notes about them: ${
				File.notes || 'no notes'
			}. I last interacted with them on ${
				fileDate || "I'm not sure"
			}. Can you please provide me with some resources that will help me understand their situation(s) and better support them?`,
		},
	];

	async function handleClick() {
		setLoading(true);
		try {
			const res = await fetch(SERVER_URL + '/chat', {
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
			const response = await fetch(SERVER_URL + `/info/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await response.json();
			setFile(result);
		} catch (err) {
			console.error(err);
		}
	};

	function getReminders() {
		const birthdayCheck = new Date().toLocaleDateString('en-us', {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
		const bdayAndMonth = birthday.split(', ')[1];
		const bdayAndMonthCheck = birthdayCheck.split(', ')[1];
		if (bdayAndMonth === bdayAndMonthCheck) {
			setReminderBday(true);
		} else {
			setReminderBday(false);
		}
		if (new Date(oneWeekAgo) > new Date(File.date)) {
			setReminderCheckIn(true);
		} else {
			setReminderCheckIn(false);
		}
	}

	useEffect(() => {
		getFile();
	}, []);

	const deleteFile = async () => {
		try {
			const response = await fetch(SERVER_URL + `/info/deleteFile`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userid: user._id,
					fileid: id,
				}),
			});
			const result = await response.json();
			setFile(result[0]);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className='file-details-page'>
			<h1>File Details Page</h1>
			<p>Name or Description: {File.title}</p>
			<p>Last Interacted: {fileDate}</p>
			<p>Relationship: {File.relationship}</p>
			<p>Birthday: {birthday}</p>
			<p>Circumstances: {File.circumstances}</p>
			<p>Notes: {File.notes}</p>
			<Link to='/dashboard'>
				<button className='' onClick={() => deleteFile()}>
					Delete
				</button>
			</Link>
			<Link to={`/editfile/${id}`}>
				<button className=''>Edit</button>
			</Link>
			<button onClick={handleClick}>Get AI-Generated resources</button>
			<button onClick={getReminders}>see reminders</button>
			<p>{reminderBday || reminderCheckIn ? 'Reminders:' : ''}</p>
			<p>{reminderBday ? `It\'s ${File.title}'s birthday!` : ''}</p>
			<p>{reminderCheckIn ? `Check in on ${File.title}` : ''}</p>
			<p>{error}</p>
			<p>{loading ? 'Gathering Resources' : ''}</p>
			{chatResponses}
		</div>
	);
}

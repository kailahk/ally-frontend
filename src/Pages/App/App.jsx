import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../Components/NavBar/NavBar';
import AboutPage from '../AboutPage/AboutPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import FileDetailsPage from '../FileDetailsPage/FileDetailsPage';
import NewFilePage from '../NewFilePage/NewFilePage';

export default function App() {
	const [user, setUser] = useState(null);
	const [files, setFiles] = useState([]);

	// useEffect(() => {
	//   async function getFiles() {
	//     const allListItems = await
	//     setFiles(files);
	//   };
	//   if (user) getFiles();
	//   console.log(files)
	// }, [user]
	// )

	function handleLogout() {
		setUser(null);
		setFiles([]);

		localStorage.removeItem('token');
		alert('You have been logged out!');
		navigate('/');
	}

	// async function getUser(token) {
	// 	try {
	// 		const res = await fetch('http://localhost:8000/users/me', {

	//     });
	// 	} catch (err) {}
	// }

	// useEffect(() => {
	// 	if (localStorage.getItem('token')) {
	// 		setUser(null);
	// 	}
	// }, []);

	return (
		<main className='App'>
			{user ? (
				<div>
					<NavBar user={user} setUser={setUser} handleLogout={handleLogout} />
					<Routes>
						<Route exact path='/newfile' element={<NewFilePage />} />
						<Route exact path='/about' element={<AboutPage />} />
						<Route exact path='/dashboard' element={<DashboardPage files={files} />} />
						<Route exact path='/filedetails' element={<FileDetailsPage />} />
					</Routes>
				</div>
			) : (
				<AuthPage setUser={setUser} />
			)}
		</main>
	);
}
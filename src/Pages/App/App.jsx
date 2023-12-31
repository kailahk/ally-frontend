import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import NavBar from '../../Components/NavBar/NavBar';
import DashboardPage from '../DashboardPage/DashboardPage';
import FileDetailsPage from '../FileDetailsPage/FileDetailsPage';
import NewFilePage from '../NewFilePage/NewFilePage';
import EditFilePage from '../EditFilePage/EditFilePage';
import LandingPage from '../LandingPage/LandingPage';
import AuthPage from '../AuthPage/AuthPage';
import AboutPage from '../AboutPage/AboutPage';
import Footer from '../../Components/Footer/Footer';

const SERVER_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8000'
		: 'https://web-production-caf1c.up.railway.app';

export default function App() {
	const [user, setUser] = useState(null);
	const [files, setFiles] = useState([]);
	const navigate = useNavigate();

	function handleLogout() {
		setUser(null);
		setFiles([]);
		localStorage.removeItem('token');
		navigate('/');
	}

	async function fetchUser(token) {
		try {
			const res = await fetch(SERVER_URL + '/users/me', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			});

			if (res.status === 200) {
				const resObj = await res.json();
				console.log({ 'GetUser status 200': resObj });
				setUser(resObj);
				navigate('/');
			}
		} catch (err) {
			handleLogout();
			console.log(err);
		}
	}

	useEffect(() => {
		if (localStorage.getItem('token')) {
			fetchUser(localStorage.getItem('token'));
		}
	}, []);

	return (
		<main className='App'>
			{user ? (
				<div>
					<NavBar user={user} setUser={setUser} handleLogout={handleLogout} />
					<Routes>
						<Route exact path='/' element={<DashboardPage user={user} files={files} />} />
						<Route exact path='/newfile' element={<NewFilePage user={user} />} />
						<Route exact path='/editfile/:id' element={<EditFilePage user={user} />} />
						<Route exact path='/filedetails/:id' element={<FileDetailsPage user={user} />} />
						<Route exact path='/about' element={<AboutPage />} />
						<Route path='*' element={<DashboardPage user={user} files={files} />} />
					</Routes>
				</div>
			) : (
				<Routes>
					<Route exact path='/' element={<LandingPage fetchUser={fetchUser}/>}></Route>
					<Route exact path='/authpage' element={<AuthPage setUser={setUser} fetchUser={fetchUser}/>}></Route>
					<Route exact path='/*' element={<AuthPage setUser={setUser} fetchUser={fetchUser}/>}></Route>
				</Routes>
			)}
			<Footer/>
		</main>
	);
};

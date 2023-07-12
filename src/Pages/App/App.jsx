import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../Components/NavBar/NavBar';
import AboutPage from '../AboutPage/AboutPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import FileDetailsPage from '../FileDetailsPage/FileDetailsPage';
import NewFilePage from '../NewFilePage/NewFilePage';

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <main className="App">
      {user ?
        <div>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route exact path="/newfile" element={<NewFilePage />} />
            <Route exact path="/about" element={<AboutPage />} />
            <Route exact path="/dashboard" element={<DashboardPage />} />
            <Route exact path="/filedetails" element={<FileDetailsPage />} />
          </Routes>
        </div>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
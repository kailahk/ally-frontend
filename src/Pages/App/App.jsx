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
  const [user, setUser] = useState(true);
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

  return (
    <main className="App">
      {user ?
        <div>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route exact path="/newfile" element={<NewFilePage />} />
            <Route exact path="/about" element={<AboutPage />} />
            <Route exact path="/" element={<DashboardPage files={files} />} />
            <Route exact path="/filedetails" element={<FileDetailsPage />} />
          </Routes>
        </div>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
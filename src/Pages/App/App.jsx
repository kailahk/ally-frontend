import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import InputForm from '../../Components/InputForm/InputForm';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../Components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <main className="App">
      {user ?
        <div>
          <NavBar user={user} setUser={setUser} />
          <h1>Logged In</h1>
          <Routes>
            <Route exact path="/userinfo" element={<InputForm />} />
          </Routes>
        </div>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
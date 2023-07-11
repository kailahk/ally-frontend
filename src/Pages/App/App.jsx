import { Routes, Route } from 'react-router-dom';
import './App.css';
import InputForm from '../InputForm';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Routes>
        <Route exact path="/userinfo" element={<InputForm/>}/>
       </Routes>
      </header>
    </div>
  );
}
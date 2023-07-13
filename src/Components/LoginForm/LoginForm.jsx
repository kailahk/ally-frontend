import './LoginForm.css'
import { useState } from 'react';

export default function LoginForm({ setUser }) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    function handleChange(evt) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/users/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(credentials),
            });
            const tokenObj = await res.json();
            const token = tokenObj['token'];
            localStorage.setItem('token', token);
            const userRes = await fetch('http://localhost:8000/users/me', {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
            })
            const user = await userRes.json();
            setUser(user)
        } catch {
            setError('Log In Failed - Try Again');
        }
    }

    return (
        <div>
            <div className="login-form">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                    <br />
                    <button type="submit">LOG IN</button>
                </form>
            </div >
            <p className="error-message">{error}</p>
        </div >
    );
}
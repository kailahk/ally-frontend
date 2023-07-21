import './LoginForm.css'
import { useState } from 'react';

const SERVER_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'https://web-production-caf1c.up.railway.app';

export default function LoginForm({ fetchUser }) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    function handleChange(evt) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const res = await fetch(SERVER_URL + '/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            const tokenObj = await res.json();
            const token = tokenObj['token'];
            localStorage.setItem('token', token);
            fetchUser(token);
        } catch (err) {
            console.log(err);
            setError('Log In Failed - Try Again');
        }
    }

    return (
        <div className='login-form'>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <div className='form-fields'>
                    <label className='email'>Email:
                    </label>
                    <input
                        className='email-input'
                        type='text'
                        name='email'
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                    <label className='password'>Password:
                    </label>
                    <input
                        type='password'
                        name='password'
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="login-btn" type='submit'>LOG IN</button>
            </form>
            <p className='error-message'>{error}</p>
        </div >
    );
}
import { useState } from 'react'
import './SignUpForm.css'

export default function SignUpForm({ setUser }) {
    const [signUpForm, setSignUpForm] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    });
    const [error, setError] = useState('');

    function handleChange(evt) {
        setSignUpForm({ ...signUpForm, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const { name, email, password } = signUpForm;
            const formData = { name, email, password };
            console.log(formData)
            const res = await fetch('http://localhost:8000/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const resObj = await fetch('http://localhost:8000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const tokenObj = await resObj.json();
            const token = tokenObj['token'];
            localStorage.setItem('token', token);
            const userRes = await fetch('http://localhost:8000/users/me', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            })
            const user = await userRes.json();
            setUser(user)
        } catch (err) {
            console.log(err)
            setError('Sign Up Failed - Try Again');
        }
    }

    return (
        <div className='signup-form'>
            <div className="form-container">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" value={signUpForm.name} onChange={handleChange} required />
                    <label>Email</label>
                    <input type="email" name="email" value={signUpForm.email} onChange={handleChange} required />
                    <label>Password</label>
                    <input type="password" name="password" value={signUpForm.password} onChange={handleChange} required />
                    <label>Confirm</label>
                    <input type="password" name="confirm" value={signUpForm.confirm} onChange={handleChange} required />
                    <br />
                    <button className="signup-btn" type="submit">SIGN UP</button>
                </form>
            </div>
            <p className="error-message"> {error}</p>
        </div>
    )
}
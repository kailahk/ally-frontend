import { useState } from 'react'
import './SignUpForm.css'

export default function SignUpForm({ setUser }) {
    const [signUpForm, setSignUpForm] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    });
    const [error, setError] = useState('');

    function handleChange(evt) {
        setSignUpForm({ ...signUpForm, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            // comment out the below once we can import the signUp 
            // const user = await ... (signUpForm);
            // setUser(user);
        } catch {
            setError('Sign Up Failed - Try Again');
        }
    }

    return (
        <div>
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
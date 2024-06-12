import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e: any) => setEmail(e.target.value);
    const handlePasswordChange = (e: any) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e: any) => setConfirmPassword(e.target.value);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (email && password) {
            try {
                const response = await axios.post('http://localhost:8000/register/', {
                    email: email,
                    password: password
                });
                setMessage(response.data.message);
                setError('');
            } catch (error: any) {
                setMessage('');
                setError(error.response.data.detail);
            }
        } else {
            setError('All fields are required');
        }
    };

    return (
        <div className="signInContainer">
            <div className='signInInfo'>
                <p style={{marginBottom: 20}}>
                    Join our waitlist to gain early access to The Trace's Beta Development Discord server. Soon, you will have the opportunity 
                    to upgrade your membership for $5/month and enjoy an array of premium features, including:
                </p>
                <ul>
                    <li style={{marginBottom: 20}}>Tracing any news article from its URL</li>
                    <li style={{marginBottom: 20}}>Saving article Trees for future reference</li>
                    <li style={{marginBottom: 20}}>Tracing articles or secondary subjects within a Tree</li>
                    <li style={{marginBottom: 20}}>Incorporating scientific journal articles cited in news articles, along with conflict of interest assessments</li>
                    <li style={{marginBottom: 20}}>RAG-empowered summaries of the primary timelines within Trees</li>
                </ul>
                <p>
                    Membership fees will support our server costs and enable us to license additional articles, thereby expanding 
                    The Trace's comprehensive news catalog.
                </p>
            </div>
            <div>
                <h1 style={{marginBottom: 10}}>Join the Waitlist</h1>
                <form onSubmit={handleSubmit}>
                    <div className='contactFormField'>
                        <label className='contactFormLabel' htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className='contactInputSmall'
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className='contactFormField'>
                        <label className='contactFormLabel' htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className='contactInputSmall'
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className='contactFormField'>
                        <label className='contactFormLabel' htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className='contactInputSmall'
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    {message && <p className="message">{message}</p>}
                    <button className='contactSubmitButton' type="submit">Join the Waitlist</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;

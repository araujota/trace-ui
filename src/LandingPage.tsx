import './App.css';
import emailjs from 'emailjs-com';
import React, { useState } from 'react';

function LandingPage() {
    const [formData, setFormData] = useState({
        from_name: 'new user',
        from_email: '',
        message: 'new user'
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        emailjs.send('service_w12dkm4', 'template_yv4psi9', formData, 'OGjQeJo5AUPGakgFi')
            .then((response) => {
                alert("Signed up successfully!");
                setFormData({ from_name: '', from_email: '', message: '' });
            })
            .catch((err) => {
                alert('There was an issue signing you up. Please try again.');
            });
    };

    return (
        <div className='contactFormContainer'>
            <div className='header'>
                <img className='logoImage' src={require('./assets/tracelogotransparent.png')}></img>
            </div>
            <div className='contactFormColumn'>
                <p style={{marginBottom: '20px'}}>
                    Readily accessible news just isn't enough to keep Informed Citizenship alive. The articles you turn to for truth are beset with bias and bereft of context.
                </p>
                <p style={{marginBottom: '20px'}}>
                    Want the full picture? 
                </p>
                <p style={{marginBottom: '20px'}}>
                    Introducing The Trace, a next-generation news aggregator and analytics platform designed to give you a more comprehensive and long-term perspective of the news, and the sources that provide it.
                </p>
                <p style={{marginBottom: '20px'}}>
                    The Trace provides more than deeper insights into news stories and their sources. By leveraging AI technologies, we offer detailed analysis on news reporting and public discourse about the issues that matter to you. Every story. Every angle. Every time.
                </p>
                <p style={{marginBottom: '20px'}}>
                    Be among the first to access The Trace by joining our waitlist below.
                </p>
                <p style={{marginBottom: '20px'}}>
                    Have suggestions to help shape The Trace? <a target="_blank" href='https://discord.com/invite/jrgaSwJ5'>Join our Discord</a> 
                </p>
            </div>
            <div className='contactFormColumn'>
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div className='contactFormField'>
                        <input
                            type="email"
                            name="from_email"
                            className='contactInputSmall'
                            value={formData.from_email}
                            onChange={handleChange}
                            required
                            placeholder='email'
                        />
                    </div>
                    <button className='contactSubmitButton' type="submit">Join the Waitlist</button>
                </form>
            </div>
            <div className='footer'>
                <text style={{marginLeft: '30px'}}>&copy; Trace Media LLC</text>
            </div>
        </div>
    );
}

export default LandingPage;
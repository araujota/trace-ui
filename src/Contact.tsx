import './App.css';
import emailjs from 'emailjs-com';
import React, { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        from_name: '',
        from_email: '',
        message: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        emailjs.send('service_w12dkm4', 'template_yv4psi9', formData, 'OGjQeJo5AUPGakgFi')
            .then((response) => {
                alert("Message sent successfully! We will be in touch with you soon.");
                setFormData({ from_name: '', from_email: '', message: '' });
            })
            .catch((err) => {
                alert('Failed to send the message. Please try again.');
            });
    };

    return (
        <div className='contactFormContainer'>
            <div className='contactFormColumn'>
                <form onSubmit={handleSubmit}>
                    <div className='contactFormField'>
                        <label className='contactFormLabel'>Name</label>
                        <input
                            type="text"
                            name="from_name"
                            className='contactInputSmall'
                            value={formData.from_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='contactFormField'>
                        <label className='contactFormLabel'>Email</label>
                        <input
                            type="email"
                            name="from_email"
                            className='contactInputSmall'
                            value={formData.from_email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='contactFormField'>
                        <label className='contactFormLabel'>Message</label>
                        <textarea
                            name="message"
                            rows={8}
                            cols={30}
                            className='contactMsg'
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button className='contactSubmitButton' type="submit">Send</button>
                </form>
            </div>
            <div className='contactFormColumn'>
                <ul>
                    <li style={{ marginBottom: 20 }}>Have an idea on how we can improve our product?</li>
                    <li style={{ marginBottom: 20 }}>Have any questions or general feedback?</li>
                    <li style={{ marginBottom: 20 }}>Interested in joining our team?</li>
                </ul>
                <p style={{ marginBottom: 20 }}>This is the form for you!</p>
                <p style={{ width: 400 }}>
                    You might also want to consider <a target="_blank" href='https://discord.com/invite/jrgaSwJ5'>joining our Discord </a> 
                    to stay updated and engage with our developers and other beta users. Please note that you must sign up to join the Discord.
                </p>
            </div>
        </div>
    );
}

export default Contact;

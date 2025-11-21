import React from 'react';
import { profile } from '../data';
import { Mail, Linkedin, Github } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="section" style={{ minHeight: '50vh', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Get In Touch</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--secondary-color)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <a href={`mailto:${profile.email}`} className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '15px 30px' }}>
                Say Hello
            </a>

            <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '30px' }}>
                <a href={profile.github} target="_blank" rel="noreferrer" style={{ color: 'var(--secondary-color)', transition: 'color 0.2s' }}>
                    <Github size={30} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--secondary-color)', transition: 'color 0.2s' }}>
                    <Linkedin size={30} />
                </a>
                <a href={`mailto:${profile.email}`} style={{ color: 'var(--secondary-color)', transition: 'color 0.2s' }}>
                    <Mail size={30} />
                </a>
            </div>
        </section>
    );
};

export default Contact;

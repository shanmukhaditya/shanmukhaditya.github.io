import React from 'react';
import { profile } from '../data';
import { Mail, Linkedin, Github, FileDown } from 'lucide-react';
import LeetCodeIcon from './LeetCodeIcon';

const Contact = () => {
    return (
        <section id="contact" className="section" style={{ minHeight: '50vh', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Get In Touch</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--secondary-color)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={`mailto:${profile.email}`} className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '14px 28px' }}>
                    Say Hello
                </a>
                {profile.resumeUrl && (
                    <a
                        href={profile.resumeUrl}
                        download
                        className="btn btn-outline"
                        style={{ fontSize: '1.1rem', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <FileDown size={20} />
                        Resume
                    </a>
                )}
            </div>

            <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '30px' }}>
                <a href={profile.github} target="_blank" rel="noreferrer" style={{ color: 'var(--secondary-color)', transition: 'color 0.2s' }}>
                    <Github size={30} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--secondary-color)', transition: 'color 0.2s' }}>
                    <Linkedin size={30} />
                </a>
                <a href={profile.leetcode} target="_blank" rel="noreferrer" style={{ color: 'var(--secondary-color)', transition: 'color 0.2s' }}>
                    <LeetCodeIcon size={32} />
                </a>
                <a href={`mailto:${profile.email}`} style={{ color: 'var(--secondary-color)', transition: 'color 0.2s' }}>
                    <Mail size={30} />
                </a>
            </div>
        </section>
    );
};

export default Contact;

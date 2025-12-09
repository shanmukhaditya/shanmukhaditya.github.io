import React, { useState, useEffect } from 'react';
import { Sun, Moon, Github, Linkedin, Mail, FileText, Box, Dna, Globe } from 'lucide-react';
import LeetCodeIcon from './components/LeetCodeIcon';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';
import ScrollNavigation from './components/ScrollNavigation';
import { profile } from './data';

function App() {
    const [theme, setTheme] = useState('dark');
    const [shape, setShape] = useState('random');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="app">
            <CommandPalette theme={theme} toggleTheme={toggleTheme} />
            <ScrollNavigation />

            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 100,
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid var(--border-color)'
            }}>
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                    }}
                >
                    SY.
                    <span style={{
                        fontSize: '0.8rem',
                        padding: '2px 6px',
                        background: 'var(--accent-color)',
                        color: '#fff',
                        borderRadius: '4px',
                        opacity: 0.8,
                        fontFamily: 'var(--font-mono)'
                    }}>
                        Ctrl+K
                    </span>
                </button>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    {/* Shape Controls */}
                    <div style={{ display: 'flex', gap: '10px', marginRight: '20px', borderRight: '1px solid var(--border-color)', paddingRight: '20px' }}>
                        <button onClick={() => setShape('random')} title="Random Field" style={{ background: 'none', border: 'none', cursor: 'pointer', color: shape === 'random' ? 'var(--accent-color)' : 'var(--secondary-color)' }}><Box size={18} /></button>
                        <button onClick={() => setShape('dna')} title="DNA Helix" style={{ background: 'none', border: 'none', cursor: 'pointer', color: shape === 'dna' ? 'var(--accent-color)' : 'var(--secondary-color)' }}><Dna size={18} /></button>
                        <button onClick={() => setShape('sphere')} title="Sphere" style={{ background: 'none', border: 'none', cursor: 'pointer', color: shape === 'sphere' ? 'var(--accent-color)' : 'var(--secondary-color)' }}><Globe size={18} /></button>
                    </div>

                    <a href={profile.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-color)' }}><Github size={20} /></a>
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--text-color)' }}><Linkedin size={20} /></a>
                    <a href={profile.leetcode} target="_blank" rel="noreferrer" style={{ color: 'var(--text-color)' }}><LeetCodeIcon size={22} /></a>

                    <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </nav>

            <Hero theme={theme} shape={shape} />

            <main className="container">
                <Experience />
                <Projects />
                <Contact />
            </main>

            <footer style={{ textAlign: 'center', padding: '40px', color: 'var(--secondary-color)' }}>
                <p>© {new Date().getFullYear()} Shanmukh Yenikapati. Built with React & Three.js.</p>
            </footer>
        </div>
    );
}

export default App;

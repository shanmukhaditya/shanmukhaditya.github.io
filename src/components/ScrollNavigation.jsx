import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

const sections = [
    { id: 'hero', label: 'HOME' },
    { id: 'experience', label: 'EXP.' },
    { id: 'projects', label: 'PROJ.' },
    { id: 'contact', label: 'MAIL' }
];

const ScrollNavigation = () => {
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            // Simple section detection
            const hero = document.getElementById('hero');
            const experience = document.getElementById('experience');
            const projects = document.getElementById('projects');
            const contact = document.getElementById('contact');

            const heroTop = hero ? hero.offsetTop : 0;
            const experienceTop = experience ? experience.offsetTop : 99999;
            const projectsTop = projects ? projects.offsetTop : 99999;
            const contactTop = contact ? contact.offsetTop : 99999;

            if (scrollPosition < experienceTop) setActiveSection(0);
            else if (scrollPosition < projectsTop) setActiveSection(1);
            else if (scrollPosition < contactTop) setActiveSection(2);
            else setActiveSection(3);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            right: '30px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0px',
            background: '#0a0a0a', // Dark background
            border: '1px solid #333',
            borderRadius: '50px', // Pill shape
            padding: '20px 10px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
            {/* Active Indicator Pill */}
            <motion.div
                animate={{
                    top: activeSection * 50 + 30 // Centered: 20px padding + 10px offset
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                    position: 'absolute',
                    right: '-2px',
                    width: '4px',
                    height: '30px',
                    background: 'var(--accent-color)', // Cyan
                    borderRadius: '4px',
                    boxShadow: '0 0 10px var(--accent-color)'
                }}
            />

            {sections.map((section, index) => (
                <motion.div
                    key={section.id}
                    onClick={() => {
                        const element = document.getElementById(section.id);
                        if (element) {
                            window.scrollTo({
                                top: element.offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    }}
                    animate={{
                        opacity: activeSection === index ? 1 : 0.4,
                        color: activeSection === index ? 'var(--accent-color)' : '#888'
                    }}
                    style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '50px', // Fixed height for calculation
                        width: '30px',
                        pointerEvents: 'auto',
                        letterSpacing: '1px'
                    }}
                >
                    {section.label}
                </motion.div>
            ))}
        </div>
    );
};

export default ScrollNavigation;

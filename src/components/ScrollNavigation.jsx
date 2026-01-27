import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

const sections = [
    { id: 'hero', label: 'HOME' },
    { id: 'featured', label: 'FEAT.' },
    { id: 'skills', label: 'SKILL' },
    { id: 'experience', label: 'EXP.' },
    { id: 'projects', label: 'PROJ.' },
    { id: 'contact', label: 'MAIL' }
];

const ScrollNavigation = () => {
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            // Get all section elements
            const sectionElements = sections.map(s => document.getElementById(s.id));
            const tops = sectionElements.map(el => el ? el.offsetTop : 99999);

            // Find active section
            let active = 0;
            for (let i = sections.length - 1; i >= 0; i--) {
                if (scrollPosition >= tops[i]) {
                    active = i;
                    break;
                }
            }
            setActiveSection(active);
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

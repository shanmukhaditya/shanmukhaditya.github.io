import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const sections = [
    { id: 'hero', label: 'HOME', title: 'Home' },
    { id: 'featured', label: 'FEAT.', title: 'Featured projects' },
    { id: 'skills', label: 'SKILL', title: 'Skills' },
    { id: 'experience', label: 'EXP.', title: 'Experience' },
    { id: 'projects', label: 'PROJ.', title: 'Projects' },
    { id: 'contact', label: 'MAIL', title: 'Contact' }
];

const ScrollNavigation = () => {
    const [activeSection, setActiveSection] = useState(0);
    const reduceMotion = usePrefersReducedMotion();

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

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="portfolio-rail" aria-label="Page sections" style={{
            position: 'fixed',
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
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
            {/* Active Indicator Pill */}
            <div
                className="portfolio-rail-indicator"
                aria-hidden="true"
                style={{
                    transform: `translateY(calc(var(--rail-step) * ${activeSection}))`,
                    position: 'absolute',
                    right: '-2px',
                    width: '4px',
                    background: 'var(--accent-color)', // Cyan
                    borderRadius: '4px',
                    boxShadow: '0 0 10px var(--accent-color)'
                }}
            />

            {sections.map((section, index) => (
                <motion.a
                    key={section.id}
                    className="portfolio-rail-link"
                    href={`#${section.id}`}
                    aria-label={section.title}
                    aria-current={activeSection === index ? 'location' : undefined}
                    animate={{
                        opacity: activeSection === index ? 1 : 0.85,
                        color: activeSection === index ? 'var(--accent-color)' : '#888'
                    }}
                    transition={reduceMotion ? { duration: 0 } : undefined}
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
                        pointerEvents: 'auto',
                        letterSpacing: '1px'
                    }}
                >
                    {section.label}
                </motion.a>
            ))}
        </nav>
    );
};

export default ScrollNavigation;

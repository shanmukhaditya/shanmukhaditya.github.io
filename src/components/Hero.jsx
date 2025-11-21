import React, { useState, useEffect } from 'react';
import ParticleBackground from './ParticleBackground';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const TypingEffect = ({ text, speed = 100, delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                setDisplayedText(text.substring(0, i + 1));
                i++;
                if (i > text.length) clearInterval(interval);
            }, speed);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(startTimeout);
    }, [text, speed, delay]);

    return <span>{displayedText}<span className="cursor">|</span></span>;
};

const Hero = ({ theme, shape }) => {
    return (
        <section id="hero" style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ParticleBackground theme={theme} shape={shape} />

            <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--accent-color)',
                        marginBottom: '20px',
                        fontSize: '1.2rem'
                    }}>
                        &lt;Hello world /&gt;
                    </h2>

                    <h1 style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        marginBottom: '20px',
                        fontWeight: 800,
                        letterSpacing: '-2px'
                    }}>
                        I'm <span style={{
                            background: 'linear-gradient(to right, var(--accent-color), #a855f7)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Shanmukh</span>
                    </h1>

                    <p style={{
                        fontSize: '1.5rem',
                        color: 'var(--secondary-color)',
                        marginBottom: '40px',
                        fontFamily: 'var(--font-mono)',
                        minHeight: '1.5em'
                    }}>
                        <TypingEffect text="Building scalable systems & AI agents." speed={50} delay={1000} />
                    </p>

                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <a href="#experience" className="btn btn-primary">
                            View Work
                        </a>
                        <a href="#contact" className="btn btn-outline">
                            Contact Me
                        </a>
                    </div>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ position: 'absolute', bottom: '40px', color: 'var(--secondary-color)' }}
            >
                <ArrowDown size={24} />
            </motion.div>

            <style>{`
        .cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
        </section>
    );
};

export default Hero;

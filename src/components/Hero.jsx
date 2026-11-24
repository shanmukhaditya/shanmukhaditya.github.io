import React, { useState, useEffect, useRef } from 'react';
import ParticleBackground from './ParticleBackground';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const tagline = 'Shipping production AI systems at speed.';

const TypingEffect = ({ text, speed = 100, delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let interval;
        const startTimeout = setTimeout(() => {
            let i = 0;
            interval = setInterval(() => {
                setDisplayedText(text.substring(0, i + 1));
                i++;
                if (i > text.length) clearInterval(interval);
            }, speed);
        }, delay);
        return () => {
            clearTimeout(startTimeout);
            clearInterval(interval);
        };
    }, [text, speed, delay]);

    return <span aria-hidden="true">{displayedText}<span className="cursor">|</span></span>;
};

const Hero = ({ theme, shape }) => {
    const reduceMotion = usePrefersReducedMotion();
    const viewpoint = useRef({ x: 0, y: 0 });

    function followPointer(event) {
        if (reduceMotion || event.pointerType !== 'mouse' ||
            !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return;
        }

        const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
        viewpoint.current.x = (event.clientX - left) / width - 0.5;
        viewpoint.current.y = (event.clientY - top) / height - 0.5;
    }

    return (
        <section id="hero" className="portfolio-hero" onPointerMove={followPointer}
            onPointerLeave={() => { viewpoint.current.x = 0; viewpoint.current.y = 0; }}
            style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ParticleBackground theme={theme} shape={shape} viewpoint={viewpoint} reduceMotion={reduceMotion} />

            <div className="container hero-content" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
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

                    <h1 className="hero-title" style={{
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
                        {reduceMotion ? tagline : (
                            <>
                                <span className="hero-tagline-text">{tagline}</span>
                                <TypingEffect text={tagline} speed={50} delay={1000} />
                            </>
                        )}
                    </p>

                    <div className="hero-actions">
                        <a href="#experience" className="btn btn-primary">
                            View Work
                        </a>
                        <a href="#contact" className="btn btn-outline">
                            Contact Me
                        </a>
                    </div>
                    <a href="#justnutrition" className="hero-launch">
                        <span><strong>JustNutrition</strong> · Live on the App Store</span>
                        <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                </motion.div>
            </div>

            <motion.div
                animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="hero-scroll-cue"
                aria-hidden="true"
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

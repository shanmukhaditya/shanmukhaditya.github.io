import React from 'react';
import { featuredProject } from '../data';
import { motion } from 'framer-motion';
import { Rocket, ExternalLink, Github, Zap, Clock, Code, Server } from 'lucide-react';

// Squadfire brand colors
const SQUADFIRE_COLORS = {
    primary: '#D97B4A',      // Burnt orange
    secondary: '#E8A46C',    // Light peach/coral
    accent: '#C26B42',       // Darker rust
    gradient: 'linear-gradient(135deg, #D97B4A, #E8A46C, #C26B42)'
};

const FeaturedProject = () => {
    const iconMap = {
        "Lines of Code": <Code size={20} />,
        "API Endpoints": <Server size={20} />,
        "Schedule Types": <Clock size={20} />,
        "Dev Time": <Zap size={20} />
    };

    return (
        <section id="featured" className="section" style={{ paddingTop: '80px' }}>
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
                    <Rocket size={40} color={SQUADFIRE_COLORS.primary} />
                    <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Featured Project</h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'var(--card-bg)',
                        borderRadius: '16px',
                        border: '1px solid var(--border-color)',
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    {/* Gradient accent bar - Squadfire colors */}
                    <div style={{
                        height: '4px',
                        background: SQUADFIRE_COLORS.gradient,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0
                    }} />

                    <div style={{ padding: '40px' }}>
                        {/* Header with Logo */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            gap: '20px',
                            marginBottom: '30px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                {/* Squadfire Logo */}
                                <motion.img
                                    src="/squadfire.png"
                                    alt="Squadfire Logo"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 4px 12px rgba(217, 123, 74, 0.3))'
                                    }}
                                />
                                <div>
                                    <h3 style={{
                                        fontSize: '2.5rem',
                                        marginBottom: '8px',
                                        background: SQUADFIRE_COLORS.gradient,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        display: 'inline-block'
                                    }}>
                                        {featuredProject.title}
                                    </h3>
                                    <p style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: 'var(--secondary-color)',
                                        fontSize: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <Zap size={16} color={SQUADFIRE_COLORS.primary} />
                                        {featuredProject.tagline}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <a
                                    href={featuredProject.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '1rem',
                                        background: SQUADFIRE_COLORS.primary,
                                        color: '#fff',
                                        textDecoration: 'none',
                                        boxShadow: `0 0 20px rgba(217, 123, 74, 0.4)`,
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 0 30px rgba(217, 123, 74, 0.6)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 0 20px rgba(217, 123, 74, 0.4)';
                                    }}
                                >
                                    <ExternalLink size={18} />
                                    View Live
                                </a>
                                <a
                                    href={featuredProject.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-outline"
                                    style={{
                                        display: 'none',
                                        alignItems: 'center',
                                        gap: '8px',
                                        borderColor: SQUADFIRE_COLORS.primary,
                                        color: SQUADFIRE_COLORS.primary
                                    }}
                                >
                                    <Github size={18} />
                                    Source
                                </a>
                            </div>
                        </div>

                        {/* Description */}
                        <p style={{
                            fontSize: '1.15rem',
                            color: 'var(--secondary-color)',
                            lineHeight: '1.7',
                            marginBottom: '30px',
                            maxWidth: '800px'
                        }}>
                            {featuredProject.description}
                        </p>

                        {/* Metrics */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                            gap: '16px',
                            marginBottom: '30px'
                        }}>
                            {featuredProject.metrics.map((metric, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    style={{
                                        background: 'rgba(217, 123, 74, 0.08)',
                                        padding: '20px',
                                        borderRadius: '12px',
                                        textAlign: 'center',
                                        border: `1px solid rgba(217, 123, 74, 0.2)`
                                    }}
                                >
                                    <div style={{ color: SQUADFIRE_COLORS.primary, marginBottom: '8px' }}>
                                        {iconMap[metric.label] || <Zap size={20} />}
                                    </div>
                                    <div style={{
                                        fontSize: '1.5rem',
                                        fontWeight: '700',
                                        color: 'var(--text-color)',
                                        marginBottom: '4px'
                                    }}>
                                        {metric.value}
                                    </div>
                                    <div style={{
                                        fontSize: '0.85rem',
                                        color: 'var(--secondary-color)',
                                        fontFamily: 'var(--font-mono)'
                                    }}>
                                        {metric.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Tech Stack */}
                        <div style={{ marginBottom: '30px' }}>
                            <h4 style={{
                                fontSize: '0.9rem',
                                color: 'var(--secondary-color)',
                                marginBottom: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Tech Stack
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {featuredProject.tech.map((tech, i) => (
                                    <span key={i} style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.9rem',
                                        color: SQUADFIRE_COLORS.primary,
                                        background: 'rgba(217, 123, 74, 0.1)',
                                        border: `1px solid ${SQUADFIRE_COLORS.primary}`,
                                        padding: '6px 14px',
                                        borderRadius: '20px'
                                    }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Highlights */}
                        <div>
                            <h4 style={{
                                fontSize: '0.9rem',
                                color: 'var(--secondary-color)',
                                marginBottom: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Key Features
                            </h4>
                            <ul style={{
                                listStyle: 'none',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '10px'
                            }}>
                                {featuredProject.highlights.map((highlight, i) => (
                                    <li key={i} style={{
                                        color: 'var(--secondary-color)',
                                        paddingLeft: '24px',
                                        position: 'relative',
                                        lineHeight: '1.6'
                                    }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: 0,
                                            color: SQUADFIRE_COLORS.primary,
                                            fontWeight: 'bold'
                                        }}>→</span>
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedProject;

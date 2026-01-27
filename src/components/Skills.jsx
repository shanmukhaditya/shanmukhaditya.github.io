import React from 'react';
import { skills } from '../data';
import { motion } from 'framer-motion';
import { Cpu, Code, Database, Cloud, Layout, Brain } from 'lucide-react';

const categoryConfig = {
    languages: { icon: <Code size={24} />, label: 'Languages', color: '#3b82f6' },
    backend: { icon: <Cpu size={24} />, label: 'Backend & APIs', color: '#10b981' },
    aiml: { icon: <Brain size={24} />, label: 'AI/ML & LLMs', color: '#a855f7' },
    data: { icon: <Database size={24} />, label: 'Data Engineering', color: '#f59e0b' },
    devops: { icon: <Cloud size={24} />, label: 'DevOps & Infra', color: '#ef4444' },
    frontend: { icon: <Layout size={24} />, label: 'Frontend', color: '#06b6d4' }
};

const Skills = () => {
    return (
        <section id="skills" className="section" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '50px' }}>
                    <Cpu size={40} color="var(--accent-color)" />
                    <h2 style={{ fontSize: '2.5rem', margin: 0 }}>./skills</h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '24px'
                }}>
                    {Object.entries(skills).map(([category, items], index) => {
                        const config = categoryConfig[category] || {
                            icon: <Code size={24} />,
                            label: category,
                            color: 'var(--accent-color)'
                        };

                        return (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                style={{
                                    background: 'var(--card-bg)',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)',
                                    padding: '24px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Accent line */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '3px',
                                    background: config.color
                                }} />

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '16px'
                                }}>
                                    <div style={{ color: config.color }}>
                                        {config.icon}
                                    </div>
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        fontFamily: 'var(--font-mono)',
                                        color: 'var(--text-color)',
                                        margin: 0
                                    }}>
                                        {config.label}
                                    </h3>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '8px'
                                }}>
                                    {items.map((skill, i) => (
                                        <motion.span
                                            key={i}
                                            whileHover={{ scale: 1.05 }}
                                            style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '0.85rem',
                                                color: 'var(--text-color)',
                                                background: 'rgba(0,0,0,0.1)',
                                                border: '1px solid var(--border-color)',
                                                padding: '6px 12px',
                                                borderRadius: '6px',
                                                cursor: 'default',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.borderColor = config.color;
                                                e.target.style.color = config.color;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.borderColor = 'var(--border-color)';
                                                e.target.style.color = 'var(--text-color)';
                                            }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;

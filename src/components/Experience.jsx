import React from 'react';
import { experience } from '../data';
import { motion } from 'framer-motion';
import { GitCommit, GitBranch } from 'lucide-react';

const Experience = () => {
    return (
        <section id="experience" className="section">
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '60px' }}>
                    <GitBranch size={40} color="var(--accent-color)" />
                    <h2 style={{ fontSize: '2.5rem', margin: 0 }}>git log --experience</h2>
                </div>

                <div style={{ position: 'relative', paddingLeft: '20px' }}>
                    {/* Vertical Line */}
                    <div style={{
                        position: 'absolute',
                        left: '49px',
                        top: '0',
                        bottom: '0',
                        width: '2px',
                        background: 'var(--border-color)',
                        zIndex: 0
                    }} />

                    {experience.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            style={{ marginBottom: '60px', position: 'relative', paddingLeft: '50px' }}
                        >
                            {/* Commit Node */}
                            <div style={{
                                position: 'absolute',
                                left: '0',
                                top: '0',
                                width: '60px',
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'var(--bg-color)',
                                zIndex: 1
                            }}>
                                <GitCommit size={24} color="var(--accent-color)" />
                            </div>

                            <div style={{
                                background: 'var(--card-bg)',
                                padding: '30px',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                marginLeft: '20px' // Added margin to prevent overlap
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{job.role}</h3>
                                        <h4 style={{
                                            color: 'var(--accent-color)',
                                            fontFamily: 'var(--font-mono)',
                                            display: 'inline-block'
                                        }}>
                                            <span style={{ opacity: 0.7, marginRight: '4px' }}>@</span>
                                            {job.company}
                                        </h4>
                                    </div>
                                    <div style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.9rem',
                                        color: 'var(--secondary-color)',
                                        background: 'rgba(0,0,0,0.05)',
                                        padding: '5px 10px',
                                        borderRadius: '4px',
                                        height: 'fit-content'
                                    }}>
                                        {job.period}
                                    </div>
                                </div>

                                <ul style={{ listStyle: 'none', color: 'var(--secondary-color)' }}>
                                    {job.description.map((item, i) => (
                                        <li key={i} style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: 0, color: 'var(--accent-color)', opacity: 0.5 }}>+</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;

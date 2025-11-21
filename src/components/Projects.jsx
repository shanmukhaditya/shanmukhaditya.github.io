import React from 'react';
import { projects } from '../data';
import { motion } from 'framer-motion';
import { Terminal, Github, ExternalLink, Folder } from 'lucide-react';

const Projects = () => {
    return (
        <section id="projects" className="section">
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '60px' }}>
                    <Terminal size={40} color="var(--accent-color)" />
                    <h2 style={{ fontSize: '2.5rem', margin: 0 }}>./projects</h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '30px'
                }}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            style={{
                                background: 'var(--card-bg)',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {/* Window Header */}
                            <div style={{
                                padding: '12px 20px',
                                background: 'rgba(0,0,0,0.05)',
                                borderBottom: '1px solid var(--border-color)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                                </div>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--secondary-color)', marginLeft: '10px' }}>
                                    {project.title.toLowerCase().replace(/\s+/g, '-')}.js
                                </span>
                            </div>

                            <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                    <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Folder size={20} color="var(--accent-color)" />
                                        {project.title}
                                    </h3>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-color)', opacity: 0.7, transition: 'opacity 0.2s' }}>
                                                <Github size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p style={{ marginBottom: '20px', color: 'var(--secondary-color)', lineHeight: '1.6', flex: 1 }}>
                                    {project.description}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: 'auto' }}>
                                    {project.tech.map((tech, i) => (
                                        <span key={i} style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.8rem',
                                            color: 'var(--accent-color)',
                                            border: '1px solid var(--accent-color)',
                                            padding: '4px 10px',
                                            borderRadius: '20px'
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

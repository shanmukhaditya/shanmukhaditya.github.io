import React from 'react';
import { featuredProjects } from '../data';
import { motion } from 'framer-motion';
import { Rocket, ExternalLink, Github, Zap, Clock, Code, Server, Database, Smartphone } from 'lucide-react';

const FeaturedProject = () => {
    const iconMap = {
        code: <Code size={20} />,
        server: <Server size={20} />,
        clock: <Clock size={20} />,
        zap: <Zap size={20} />,
        database: <Database size={20} />,
        smartphone: <Smartphone size={20} />
    };

    return (
        <section id="featured" className="section" style={{ paddingTop: '120px', justifyContent: 'flex-start' }}>
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
                    <Rocket size={40} color="#10B981" />
                    <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Featured Projects</h2>
                </div>

                <div className="featured-projects-container">
                    {featuredProjects.map((project, index) => {
                        const colors = project.colors;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="featured-project-card"
                            >
                                {/* Gradient accent bar */}
                                <div style={{
                                    height: '4px',
                                    background: colors.gradient,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0
                                }} />

                                <div className="featured-project-card-inner">
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
                                              {/* Logo */}
                                              <motion.img
                                                  src={project.logo}
                                                  alt={`${project.title} Logo`}
                                                  initial={{ scale: 0.8, opacity: 0 }}
                                                  whileInView={{ scale: 1, opacity: 1 }}
                                                  transition={{ duration: 0.5 }}
                                                  style={{
                                                      width: '80px',
                                                      height: '80px',
                                                      objectFit: 'contain',
                                                      filter: `drop-shadow(0 4px 12px ${colors.rgbaPrimary})`
                                                  }}
                                              />
                                              <div>
                                                  <h3 style={{
                                                      fontSize: '2.5rem',
                                                      marginBottom: '8px',
                                                      background: colors.gradient,
                                                      WebkitBackgroundClip: 'text',
                                                      WebkitTextFillColor: 'transparent',
                                                      display: 'inline-block'
                                                  }}>
                                                      {project.title}
                                                  </h3>
                                                  <p style={{
                                                      fontFamily: 'var(--font-mono)',
                                                      color: 'var(--secondary-color)',
                                                      fontSize: '1rem',
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      gap: '8px'
                                                  }}>
                                                      <Zap size={16} color={colors.primary} />
                                                      {project.tagline}
                                                  </p>
                                              </div>
                                          </div>

                                          <div style={{ display: 'flex', gap: '12px' }}>
                                              {project.liveUrl && (
                                                  <a
                                                      href={project.liveUrl}
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
                                                          background: colors.primary,
                                                          color: '#fff',
                                                          textDecoration: 'none',
                                                          boxShadow: `0 0 20px ${colors.rgbaPrimary}`,
                                                          transition: 'all 0.3s ease'
                                                      }}
                                                      onMouseEnter={(e) => {
                                                          e.target.style.transform = 'translateY(-2px)';
                                                          e.target.style.boxShadow = `0 0 30px ${colors.rgbaPrimary.replace('0.4', '0.6')}`;
                                                      }}
                                                      onMouseLeave={(e) => {
                                                          e.target.style.transform = 'translateY(0)';
                                                          e.target.style.boxShadow = `0 0 20px ${colors.rgbaPrimary}`;
                                                      }}
                                                  >
                                                      <ExternalLink size={18} />
                                                      View Live
                                                  </a>
                                              )}
                                              {project.testflightUrl && (
                                                  <a
                                                      href={project.testflightUrl}
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
                                                          background: colors.primary,
                                                          color: '#fff',
                                                          textDecoration: 'none',
                                                          boxShadow: `0 0 20px ${colors.rgbaPrimary}`,
                                                          transition: 'all 0.3s ease'
                                                      }}
                                                      onMouseEnter={(e) => {
                                                          e.target.style.transform = 'translateY(-2px)';
                                                          e.target.style.boxShadow = `0 0 30px ${colors.rgbaPrimary.replace('0.4', '0.6')}`;
                                                      }}
                                                      onMouseLeave={(e) => {
                                                          e.target.style.transform = 'translateY(0)';
                                                          e.target.style.boxShadow = `0 0 20px ${colors.rgbaPrimary}`;
                                                      }}
                                                  >
                                                      <Smartphone size={18} />
                                                      TestFlight
                                                  </a>
                                              )}
                                              {project.githubUrl && (
                                                  <a
                                                      href={project.githubUrl}
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
                                                          border: `1px solid ${colors.primary}`,
                                                          color: colors.primary,
                                                          background: 'transparent',
                                                          textDecoration: 'none',
                                                          transition: 'all 0.3s ease'
                                                      }}
                                                      onMouseEnter={(e) => {
                                                          e.target.style.transform = 'translateY(-2px)';
                                                          e.target.style.background = colors.rgbaPrimaryLight;
                                                      }}
                                                      onMouseLeave={(e) => {
                                                          e.target.style.transform = 'translateY(0)';
                                                          e.target.style.background = 'transparent';
                                                      }}
                                                  >
                                                      <Github size={18} />
                                                      Source
                                                  </a>
                                              )}
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
                                          {project.description}
                                      </p>

                                      {/* Metrics */}
                                      <div className="project-metrics-grid">
                                          {project.metrics.map((metric, index) => (
                                              <motion.div
                                                  key={index}
                                                  initial={{ opacity: 0, scale: 0.9 }}
                                                  whileInView={{ opacity: 1, scale: 1 }}
                                                  transition={{ delay: index * 0.1 }}
                                                  viewport={{ once: true }}
                                                  style={{
                                                      background: colors.rgbaPrimaryLight,
                                                      padding: '16px 8px',
                                                      borderRadius: '12px',
                                                      textAlign: 'center',
                                                      border: `1px solid ${colors.rgbaPrimaryBorder}`
                                                  }}
                                              >
                                                  <div style={{ color: colors.primary, marginBottom: '8px' }}>
                                                      {iconMap[metric.icon] || <Zap size={20} />}
                                                  </div>
                                                  <div style={{
                                                      fontSize: '1.4rem',
                                                      fontWeight: '700',
                                                      color: 'var(--text-color)',
                                                      marginBottom: '4px'
                                                  }}>
                                                      {metric.value}
                                                  </div>
                                                  <div style={{
                                                      fontSize: '0.8rem',
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
                                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                              {project.tech.map((tech, i) => (
                                                  <span key={i} style={{
                                                      fontFamily: 'var(--font-mono)',
                                                      fontSize: '0.85rem',
                                                      color: colors.primary,
                                                      background: colors.rgbaPrimaryLight,
                                                      border: `1px solid ${colors.primary}`,
                                                      padding: '4px 12px',
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
                                              display: 'flex',
                                              flexDirection: 'column',
                                              gap: '10px'
                                          }}>
                                              {project.highlights.map((highlight, i) => (
                                                  <li key={i} style={{
                                                      color: 'var(--secondary-color)',
                                                      paddingLeft: '24px',
                                                      position: 'relative',
                                                      lineHeight: '1.5',
                                                      fontSize: '0.95rem'
                                                  }}>
                                                      <span style={{
                                                          position: 'absolute',
                                                          left: 0,
                                                          color: colors.primary,
                                                          fontWeight: 'bold'
                                                      }}>→</span>
                                                      {highlight}
                                                  </li>
                                              ))}
                                          </ul>
                                      </div>
                                  </div>
                              </motion.div>
                          );
                      })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProject;

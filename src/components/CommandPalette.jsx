import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, Github, Linkedin, Mail, FileText, X } from 'lucide-react';
import { profile } from '../data';

const CommandPalette = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const actions = [
        {
            id: 'theme',
            label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
            icon: theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />,
            action: () => { toggleTheme(); setIsOpen(false); }
        },
        {
            id: 'projects',
            label: 'Go to Projects',
            icon: <FileText size={18} />,
            action: () => { window.location.href = '#projects'; setIsOpen(false); }
        },
        {
            id: 'experience',
            label: 'Go to Experience',
            icon: <FileText size={18} />,
            action: () => { window.location.href = '#experience'; setIsOpen(false); }
        },
        {
            id: 'contact',
            label: 'Contact Me',
            icon: <Mail size={18} />,
            action: () => { window.location.href = '#contact'; setIsOpen(false); }
        },
        {
            id: 'github',
            label: 'Visit GitHub',
            icon: <Github size={18} />,
            action: () => { window.open(profile.github, '_blank'); setIsOpen(false); }
        },
        {
            id: 'linkedin',
            label: 'Visit LinkedIn',
            icon: <Linkedin size={18} />,
            action: () => { window.open(profile.linkedin, '_blank'); setIsOpen(false); }
        }
    ];

    const filteredActions = actions.filter(action =>
        action.label.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    useEffect(() => {
        const handleNavigation = (e) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredActions.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                filteredActions[selectedIndex]?.action();
            }
        };

        window.addEventListener('keydown', handleNavigation);
        return () => window.removeEventListener('keydown', handleNavigation);
    }, [isOpen, filteredActions, selectedIndex]);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }} onClick={() => setIsOpen(false)}>
            <div style={{
                width: '100%',
                maxWidth: '600px',
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    borderBottom: '1px solid var(--border-color)'
                }}>
                    <Search size={20} color="var(--secondary-color)" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Type a command or search..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            padding: '0 12px',
                            fontSize: '1.1rem',
                            color: 'var(--text-color)',
                            fontFamily: 'var(--font-main)'
                        }}
                    />
                    <div style={{
                        fontSize: '0.8rem',
                        color: 'var(--secondary-color)',
                        border: '1px solid var(--border-color)',
                        padding: '2px 6px',
                        borderRadius: '4px'
                    }}>
                        ESC
                    </div>
                </div>

                <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '8px' }}>
                    {filteredActions.map((action, index) => (
                        <div
                            key={action.id}
                            onClick={action.action}
                            onMouseEnter={() => setSelectedIndex(index)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                background: index === selectedIndex ? 'var(--accent-color)' : 'transparent',
                                color: index === selectedIndex ? '#fff' : 'var(--text-color)',
                                transition: 'all 0.1s'
                            }}
                        >
                            {action.icon}
                            <span style={{ flex: 1 }}>{action.label}</span>
                            {index === selectedIndex && (
                                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>↵</span>
                            )}
                        </div>
                    ))}
                    {filteredActions.length === 0 && (
                        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--secondary-color)' }}>
                            No results found.
                        </div>
                    )}
                </div>

                <div style={{
                    padding: '8px 16px',
                    background: 'rgba(0,0,0,0.02)',
                    borderTop: '1px solid var(--border-color)',
                    fontSize: '0.8rem',
                    color: 'var(--secondary-color)',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <span>Navigation</span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <span>↑↓ to navigate</span>
                        <span>↵ to select</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;

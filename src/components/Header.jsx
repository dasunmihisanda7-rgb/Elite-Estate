import React, { useState, useEffect } from 'react';
import { Menu, Wifi, Battery, Search, Command } from 'lucide-react';

const Header = ({ onLogout, onMenuClick }) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="mac-menu-bar" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '32px',
            padding: '0 1rem',
            background: 'var(--bg-secondary)',
            backdropFilter: 'blur(30px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: 'var(--text-main)',
            marginBottom: '1.5rem',
            borderRadius: '6px'
        }}>
            <div className="mac-menu-left" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                {/* Mobile Menu Toggle (hidden on desktop) */}
                <button className="mobile-menu-btn" onClick={onMenuClick} style={{ display: 'none', background: 'transparent', border: 'none', color: 'var(--text-main)' }}>
                    <Menu size={16} />
                </button>

                {/* Fake Apple Logo icon */}
                <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <Command size={18} />
                </div>

                <div style={{ fontWeight: 700, cursor: 'pointer' }}>Elite Partners</div>
                <div className="menu-item desktop-only" style={{ cursor: 'pointer' }}>File</div>
                <div className="menu-item desktop-only" style={{ cursor: 'pointer' }}>Edit</div>
                <div className="menu-item desktop-only" style={{ cursor: 'pointer' }}>View</div>
                <div className="menu-item desktop-only" style={{ cursor: 'pointer', color: 'var(--accent-danger)' }} onClick={onLogout}>Logout</div>
            </div>

            <div className="mac-menu-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Search size={14} style={{ cursor: 'pointer' }} />
                <Wifi size={14} style={{ cursor: 'pointer' }} className="desktop-only" />
                <Battery size={14} style={{ cursor: 'pointer' }} className="desktop-only" />
                <div style={{ cursor: 'pointer', paddingLeft: '0.5rem' }}>{time}</div>
            </div>
        </header>
    );
};

export default Header;

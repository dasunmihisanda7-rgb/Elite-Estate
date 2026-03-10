import React from 'react';
import { Bell, Search, User, Lock, Menu } from 'lucide-react';

const Header = ({ onLogout, onMenuClick }) => {
    return (
        <header className="header-container" style={{ padding: '1rem 2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button className="btn btn-secondary mobile-menu-btn" onClick={onMenuClick} style={{ padding: '0.5rem', borderRadius: 'var(--border-radius-md)', display: 'none' }}>
                    <Menu size={24} />
                </button>
            </div>
        </header>
    );
};

export default Header;

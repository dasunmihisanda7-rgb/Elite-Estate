import React from 'react';
import { Bell, Search, User, Lock } from 'lucide-react';

const Header = ({ onLogout }) => {
    return (
        <header className="glass-panel flex-between" style={{ padding: '1rem 2rem', marginBottom: '2rem', borderRadius: 'var(--border-radius-lg)', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
            <div className="search-bar" style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '20px', width: '300px' }}>
                <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
                <input
                    type="text"
                    placeholder="Search transactions..."
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', width: '100%', fontFamily: 'inherit' }}
                />
            </div>

            <div className="flex-center gap-md">
                <button
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(255, 0, 85, 0.1)', color: 'var(--accent-danger)', borderColor: 'rgba(255, 0, 85, 0.3)' }}
                    onClick={onLogout}
                    title="Lock Session"
                >
                    <Lock size={20} />
                </button>
                <div className="flex-center gap-sm" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.25rem 1rem', paddingLeft: '0.25rem', borderRadius: '30px', cursor: 'pointer' }}>
                    <div style={{ background: 'var(--accent-secondary)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={18} color="#fff" />
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Partner Admin</span>
                </div>
            </div>
        </header>
    );
};

export default Header;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, FileText, Building2, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`glass-panel sidebar ${isOpen ? 'open' : ''}`} style={{ width: '250px', height: '100%', borderRadius: 0, borderTop: 'none', borderBottom: 'none', borderLeft: 'none', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', zIndex: 100, background: 'var(--bg-secondary)', backdropFilter: 'blur(30px)' }}>

      {/* macOS Traffic Lights */}
      <div className="mac-traffic-lights" style={{ display: 'flex', gap: '8px', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56', border: '1px solid #e0443e' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e', border: '1px solid #dea123' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f', border: '1px solid #1aab29' }}></div>
      </div>

      <div className="flex-between mb-lg" style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex-center gap-md">
          <div style={{ background: 'var(--accent-primary)', padding: '0.5rem', borderRadius: 'var(--border-radius-sm)' }}>
            <Building2 size={24} color="#fff" />
          </div>
          <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Elite Partners</h2>
        </div>
        <button className="mobile-close-btn" onClick={onClose} style={{ display: 'none', color: 'var(--text-muted)' }}>
          <X size={24} />
        </button>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
        <NavLink
          to="/"
          className={({ isActive }) => `btn ${isActive ? 'btn-primary' : ''}`}
          style={({ isActive }) => ({
            justifyContent: 'flex-start',
            border: 'none',
            background: isActive ? 'var(--accent-primary)' : 'transparent',
            borderRadius: '6px',
            padding: '0.5rem 0.75rem',
            color: isActive ? '#fff' : 'var(--text-primary)'
          })}
        >
          {({ isActive }) => (
            <>
              <LayoutDashboard size={18} color={isActive ? '#ffffff' : 'var(--text-muted)'} />
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Dashboard</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) => `btn ${isActive ? 'btn-primary' : ''}`}
          style={({ isActive }) => ({
            justifyContent: 'flex-start',
            border: 'none',
            background: isActive ? 'var(--accent-primary)' : 'transparent',
            borderRadius: '6px',
            padding: '0.5rem 0.75rem',
            color: isActive ? '#fff' : 'var(--text-primary)'
          })}
        >
          {({ isActive }) => (
            <>
              <Receipt size={18} color={isActive ? '#ffffff' : 'var(--text-muted)'} />
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Transactions</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) => `btn ${isActive ? 'btn-primary' : ''}`}
          style={({ isActive }) => ({
            justifyContent: 'flex-start',
            border: 'none',
            background: isActive ? 'var(--accent-primary)' : 'transparent',
            borderRadius: '6px',
            padding: '0.5rem 0.75rem',
            color: isActive ? '#fff' : 'var(--text-primary)'
          })}
        >
          {({ isActive }) => (
            <>
              <FileText size={18} color={isActive ? '#ffffff' : 'var(--text-muted)'} />
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Reports</span>
            </>
          )}
        </NavLink>
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        &copy; 2026 Elite Partners
      </div>
    </div>
  );
};

export default Sidebar;

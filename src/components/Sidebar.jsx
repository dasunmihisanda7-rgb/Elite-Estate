import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, FileText, Building2, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`glass-panel sidebar ${isOpen ? 'open' : ''}`} style={{ width: '250px', height: '100%', borderRadius: 0, borderTop: 'none', borderBottom: 'none', borderLeft: 'none', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', zIndex: 100 }}>
      <div className="flex-between mb-lg" style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="flex-center gap-md">
          <div style={{ background: 'var(--accent-primary)', padding: '0.5rem', borderRadius: 'var(--border-radius-md)' }}>
            <Building2 size={24} color="#fff" />
          </div>
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Elite Estate</h2>
        </div>
        <button className="mobile-close-btn" onClick={onClose} style={{ display: 'none', color: 'var(--text-muted)' }}>
          <X size={24} />
        </button>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <NavLink
          to="/"
          className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
          style={{ justifyContent: 'flex-start', border: 'none', background: 'transparent' }}
        >
          {({ isActive }) => (
            <>
              <LayoutDashboard size={20} color={isActive ? '#000' : 'var(--text-muted)'} />
              <span style={{ color: isActive ? '#000' : 'var(--text-main)', textTransform: 'none', letterSpacing: 'normal' }}>Dashboard</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
          style={{ justifyContent: 'flex-start', border: 'none', background: 'transparent' }}
        >
          {({ isActive }) => (
            <>
              <Receipt size={20} color={isActive ? '#000' : 'var(--text-muted)'} />
              <span style={{ color: isActive ? '#000' : 'var(--text-main)', textTransform: 'none', letterSpacing: 'normal' }}>Transactions</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
          style={{ justifyContent: 'flex-start', border: 'none', background: 'transparent' }}
        >
          {({ isActive }) => (
            <>
              <FileText size={20} color={isActive ? '#000' : 'var(--text-muted)'} />
              <span style={{ color: isActive ? '#000' : 'var(--text-main)', textTransform: 'none', letterSpacing: 'normal' }}>Reports</span>
            </>
          )}
        </NavLink>
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        &copy; 2026 Elite Estate Partners
      </div>
    </div>
  );
};

export default Sidebar;

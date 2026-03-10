import React, { useState, useMemo } from 'react';
import { FolderKanban, Plus, Briefcase, MapPin, Building2, Calendar } from 'lucide-react';

const ProjectsPortal = ({ transactions, onSelectProject }) => {
    const [newProjectName, setNewProjectName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    // Group transactions by project name to calculate stats
    const projectsList = useMemo(() => {
        const projectGroups = {};

        transactions.forEach(tx => {
            const pName = tx.projectName || 'Default Ledger';
            if (!projectGroups[pName]) {
                projectGroups[pName] = {
                    name: pName,
                    totalExpenses: 0,
                    totalRevenue: 0,
                    transactionCount: 0,
                    lastActivity: tx.date
                };
            }

            const amount = Number(tx.amount) || 0;
            if (tx.type === 'sell') {
                projectGroups[pName].totalRevenue += amount;
            } else {
                projectGroups[pName].totalExpenses += amount;
            }

            projectGroups[pName].transactionCount += 1;

            // Keep the most recent date
            if (new Date(tx.date) > new Date(projectGroups[pName].lastActivity)) {
                projectGroups[pName].lastActivity = tx.date;
            }
        });

        // Convert object back to an array
        return Object.values(projectGroups).sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
    }, [transactions]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(amount);
    };

    const handleCreateProject = (e) => {
        e.preventDefault();
        if (newProjectName.trim()) {
            onSelectProject(newProjectName.trim());
        }
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            maxWidth: '100vw',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-primary)',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 50,
        }}>
            {/* The main macOS Window for the portal */}
            <div className="app-container" style={{ width: '80vw', maxWidth: '1200px', height: '80vh', flexDirection: 'column', background: 'var(--bg-secondary)', backdropFilter: 'blur(30px)' }}>

                {/* Traffic Lights / Header bar */}
                <div style={{
                    height: '52px',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 1.5rem',
                    background: 'rgba(255,255,255,0.02)'
                }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56', border: '1px solid #e0443e' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e', border: '1px solid #dea123' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f', border: '1px solid #1aab29' }}></div>
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '3rem' }}>
                    <div className="flex-between" style={{ marginBottom: '3rem' }}>
                        <div>
                            <h1 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <FolderKanban size={32} color="var(--accent-primary)" /> Project Workspaces
                            </h1>
                            <p style={{ color: 'var(--text-muted)' }}>Select a project ledger to view and manage its transactions.</p>
                        </div>

                        {!isCreating ? (
                            <button className="btn btn-primary" onClick={() => setIsCreating(true)}>
                                <Plus size={18} /> New Project
                            </button>
                        ) : (
                            <form onSubmit={handleCreateProject} style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter Project Name..."
                                    value={newProjectName}
                                    onChange={(e) => setNewProjectName(e.target.value)}
                                    autoFocus
                                    style={{ width: '250px' }}
                                />
                                <button type="submit" className="btn btn-primary">Create</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setIsCreating(false)}>Cancel</button>
                            </form>
                        )}
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {projectsList.map((project, idx) => {
                            const netProfit = project.totalRevenue - project.totalExpenses;

                            return (
                                <div
                                    key={idx}
                                    className="glass-panel"
                                    style={{ cursor: 'pointer', padding: '1.5rem', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.05)' }}
                                    onClick={() => onSelectProject(project.name)}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'var(--glass-bg)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Briefcase size={20} color="var(--accent-secondary)" />
                                        {project.name}
                                    </h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                        <div className="flex-between text-muted" style={{ fontSize: '0.85rem' }}>
                                            <span>Expenses</span>
                                            <span style={{ color: 'var(--accent-danger)' }}>{formatCurrency(project.totalExpenses)}</span>
                                        </div>
                                        <div className="flex-between text-muted" style={{ fontSize: '0.85rem' }}>
                                            <span>Revenue</span>
                                            <span style={{ color: 'var(--accent-success)' }}>{formatCurrency(project.totalRevenue)}</span>
                                        </div>
                                        <div className="flex-between" style={{ fontSize: '0.9rem', fontWeight: 600, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                                            <span>Net Status</span>
                                            <span style={{ color: netProfit >= 0 ? 'var(--accent-success)' : 'var(--accent-warning)' }}>
                                                {formatCurrency(netProfit)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-between" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={12} /> {project.transactionCount} transactions</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={12} /> {project.lastActivity}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {projectsList.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                            <Building2 size={64} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <h2>No Projects Found</h2>
                            <p>Create a new project workspace to start tracking real estate transactions.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectsPortal;

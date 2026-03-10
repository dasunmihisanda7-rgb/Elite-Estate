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
            background: '#1a1a1a', // Darker background for the entire view
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 50,
        }}>
            {/* The main macOS Window for the portal */}
            <div className="app-container" style={{ width: '80vw', maxWidth: '1000px', height: '70vh', flexDirection: 'column', background: '#222222', border: '1px solid #333', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', borderRadius: '8px', overflow: 'hidden' }}>

                {/* Traffic Lights / Header bar */}
                <div style={{
                    height: '38px',
                    borderBottom: '1px solid #333',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 1rem',
                    background: '#2a2a2a'
                }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56', border: '1px solid #e0443e' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e', border: '1px solid #dea123' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f', border: '1px solid #1aab29' }}></div>
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '2.5rem 3rem' }}>
                    <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                        <div>
                            <h1 style={{ marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', color: '#fff' }}>
                                <FolderKanban size={24} color="#007aff" style={{ background: 'rgba(0, 122, 255, 0.2)', padding: '4px', borderRadius: '4px' }} /> Project Workspaces
                            </h1>
                            <p style={{ color: '#888', fontSize: '0.9rem' }}>Select a project ledger to view and manage its transactions.</p>
                        </div>

                        {!isCreating ? (
                            <button className="btn" onClick={() => setIsCreating(true)} style={{ background: '#007aff', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 500 }}>
                                <Plus size={16} /> New Project
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
                                    style={{ width: '220px', background: '#333', border: '1px solid #444', color: '#fff', borderRadius: '4px', padding: '0.4rem 0.75rem' }}
                                />
                                <button type="submit" className="btn" style={{ background: '#007aff', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.4rem 0.75rem' }}>Create</button>
                                <button type="button" className="btn" onClick={() => setIsCreating(false)} style={{ background: 'transparent', color: '#888', border: '1px solid #444', borderRadius: '4px', padding: '0.4rem 0.75rem' }}>Cancel</button>
                            </form>
                        )}
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.25rem'
                    }}>
                        {projectsList.map((project, idx) => {
                            const netProfit = project.totalRevenue - project.totalExpenses;

                            return (
                                <div
                                    key={idx}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '1.25rem',
                                        transition: 'all 0.2s',
                                        background: '#2a2a2a',
                                        borderRadius: '8px',
                                        border: '1px solid transparent'
                                    }}
                                    onClick={() => onSelectProject(project.name)}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = '#333333';
                                        e.currentTarget.style.borderColor = '#444';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = '#2a2a2a';
                                        e.currentTarget.style.borderColor = 'transparent';
                                    }}
                                >
                                    <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', color: '#fff' }}>
                                        <Briefcase size={18} color="#b366ff" />
                                        {project.name}
                                    </h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                                        <div className="flex-between" style={{ fontSize: '0.8rem', color: '#888' }}>
                                            <span>Expenses</span>
                                            <span style={{ color: '#ff4d4f' }}>{formatCurrency(project.totalExpenses)}</span>
                                        </div>
                                        <div className="flex-between" style={{ fontSize: '0.8rem', color: '#888' }}>
                                            <span>Revenue</span>
                                            <span style={{ color: '#52c41a' }}>{formatCurrency(project.totalRevenue)}</span>
                                        </div>
                                        <div className="flex-between" style={{ fontSize: '0.85rem', fontWeight: 600, borderTop: '1px solid #444', paddingTop: '0.5rem', marginTop: '0.25rem', color: '#fff' }}>
                                            <span style={{ color: '#ddd' }}>Net Status</span>
                                            <span style={{ color: netProfit >= 0 ? '#52c41a' : '#faad14' }}>
                                                {formatCurrency(netProfit)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-between" style={{ fontSize: '0.7rem', color: '#666' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={10} /> {project.transactionCount} transactions</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={10} /> {project.lastActivity}</span>
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

import React, { useState, useMemo } from 'react';
import { FolderKanban, Plus, Briefcase, MapPin, Building2, Calendar } from 'lucide-react';

const ProjectsPortal = ({ transactions, onSelectProject }) => {
    const [newProjectName, setNewProjectName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    // Group transactions by project name to calculate stats
    const projectsList = useMemo(() => {
        const projectGroups = {};

        // Sort transactions descending by date first so we can easily grab the 'recent' ones
        const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedTransactions.forEach(tx => {
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
        <div className="portal-wrapper" style={{
            height: '100vh',
            width: '100vw',
            maxWidth: '100vw',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1a1a1a', 
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 50,
        }}>
            <div className="app-container portal-container" style={{ flexDirection: 'column', background: '#222222', border: '1px solid #333', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', borderRadius: '8px', overflow: 'hidden' }}>

                {/* Traffic Lights / Header bar */}
                <div style={{
                    height: '38px',
                    borderBottom: '1px solid #333',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 1rem',
                    background: '#2a2a2a',
                    flexShrink: 0
                }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56', border: '1px solid #e0443e' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e', border: '1px solid #dea123' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f', border: '1px solid #1aab29' }}></div>
                    </div>
                </div>

                <div className="portal-content" style={{ flex: 1, overflowY: 'auto' }}>
                    <div className="flex-between portal-header" style={{ marginBottom: '2.5rem' }}>
                        <div>
                            <h1 style={{ marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', color: '#fff' }}>
                                <FolderKanban size={24} color="#007aff" style={{ background: 'rgba(0, 122, 255, 0.2)', padding: '4px', borderRadius: '4px' }} /> Project Workspaces
                            </h1>
                            <p style={{ color: '#888', fontSize: '0.9rem' }}>Select a project ledger to view and manage its transactions.</p>
                        </div>

                        {!isCreating ? (
                            <button className="btn new-project-btn" onClick={() => setIsCreating(true)} style={{ background: '#007aff', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 500 }}>
                                <Plus size={16} /> New Project
                            </button>
                        ) : (
                            <form className="new-project-form" onSubmit={handleCreateProject} style={{ display: 'flex', gap: '0.5rem' }}>
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

                    <div className="projects-grid">
                        {projectsList.map((project, idx) => {
                            const netProfit = project.totalRevenue - project.totalExpenses;

                            // Calculate bar widths
                            const totalMoney = (project.totalRevenue + project.totalExpenses) || 1;
                            const revPercent = (project.totalRevenue / totalMoney) * 100;
                            const expPercent = (project.totalExpenses / totalMoney) * 100;

                            return (
                                <div
                                    key={idx}
                                    className="project-card"
                                    style={{
                                        cursor: 'pointer',
                                        padding: '1.5rem',
                                        transition: 'all 0.2s',
                                        background: '#2a2a2a',
                                        borderRadius: '10px',
                                        border: '1px solid #333',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        minHeight: '220px'
                                    }}
                                    onClick={() => onSelectProject(project.name)}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = '#303030';
                                        e.currentTarget.style.borderColor = '#007aff';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = '#2a2a2a';
                                        e.currentTarget.style.borderColor = '#333';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                                            <Briefcase size={20} color="#b366ff" />
                                            {project.name}
                                        </h3>
                                        <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: netProfit >= 0 ? 'rgba(82, 196, 26, 0.15)' : 'rgba(250, 173, 20, 0.15)', color: netProfit >= 0 ? '#52c41a' : '#faad14', borderRadius: '12px', fontWeight: 600 }}>
                                            {netProfit >= 0 ? '+ PROFITABLE' : 'AT LOSS'}
                                        </span>
                                    </div>

                                    {/* Financial Bars */}
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '2rem 0' }}>
                                        <div className="flex-between" style={{ fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 500 }}>
                                            <span style={{ color: '#888' }}>Rev: <span style={{ color: '#52c41a' }}>{formatCurrency(project.totalRevenue)}</span></span>
                                            <span style={{ color: '#888' }}>Exp: <span style={{ color: '#ff4d4f' }}>{formatCurrency(project.totalExpenses)}</span></span>
                                        </div>
                                        <div style={{ height: '8px', background: '#444', borderRadius: '4px', display: 'flex', overflow: 'hidden' }}>
                                            <div style={{ width: `${revPercent}%`, background: '#52c41a', transition: 'width 0.5s' }}></div>
                                            <div style={{ width: `${expPercent}%`, background: '#ff4d4f', transition: 'width 0.5s' }}></div>
                                        </div>

                                        <div className="flex-between" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #333' }}>
                                            <span style={{ fontSize: '1rem', color: '#fff', fontWeight: '500' }}>Net Status</span>
                                            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: netProfit >= 0 ? '#52c41a' : '#faad14' }}>
                                                {netProfit < 0 ? '-' : ''}{formatCurrency(Math.abs(netProfit))}
                                            </span>
                                        </div>
                                    </div>



                                    {/* Footer */}
                                    <div className="flex-between" style={{ fontSize: '0.75rem', color: '#666', marginTop: 'auto' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><MapPin size={12} /> {project.transactionCount} entries</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Calendar size={12} /> {project.lastActivity}</span>
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

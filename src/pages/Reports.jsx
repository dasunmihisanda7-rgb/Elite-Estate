import React, { useState } from 'react';
import { Filter, Download, Trash2 } from 'lucide-react';

const Reports = ({ transactions, deleteTransaction }) => {
    const [filter, setFilter] = useState('all');

    const filteredData = filter === 'all' ? transactions : transactions.filter(tx => tx.type === filter);

    const getBadgeClass = (type) => {
        switch (type) {
            case 'buy': return 'badge-primary';
            case 'sell': return 'badge-success';
            case 'build': return 'badge-warning';
            default: return 'badge-secondary';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'var(--accent-success)';
            case 'in-progress': return 'var(--accent-warning)';
            case 'pending': return 'var(--text-muted)';
            default: return 'var(--text-main)';
        }
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <div className="flex-between mb-lg">
                <h1>Financial Reports</h1>
                <button className="btn btn-secondary">
                    <Download size={18} /> Export CSV
                </button>
            </div>

            <div className="glass-panel">
                <div className="flex-between mb-md">
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Filter size={18} color="var(--text-muted)" />
                        <select
                            className="form-select"
                            style={{ width: '150px', padding: '0.5rem 1rem' }}
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Types</option>
                            <option value="buy">Acquisitions</option>
                            <option value="build">Construction</option>
                            <option value="sell">Sales</option>
                        </select>
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                        Showing {filteredData.length} records
                    </div>
                </div>

                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th className="text-right">Amount</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(tx => (
                                <tr key={tx.id}>
                                    <td style={{ color: 'var(--text-muted)' }}>{tx.date}</td>
                                    <td style={{ fontWeight: 500 }}>{tx.description}</td>
                                    <td>
                                        <span className={`badge ${getBadgeClass(tx.type)}`}>{tx.type}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getStatusColor(tx.status) }} />
                                            <span style={{ fontSize: '0.9rem', textTransform: 'capitalize' }}>{tx.status}</span>
                                        </div>
                                    </td>
                                    <td className="text-right" style={{ fontWeight: 600, color: tx.type === 'sell' ? 'var(--accent-success)' : 'inherit' }}>
                                        {tx.type === 'sell' ? '+' : '-'}LKR {tx.amount.toLocaleString()}
                                    </td>
                                    <td className="text-right">
                                        <button
                                            onClick={() => deleteTransaction(tx.id)}
                                            className="btn"
                                            style={{ padding: '0.5rem', color: 'var(--accent-danger)', background: 'rgba(255, 69, 58, 0.1)' }}
                                            title="Delete Transaction"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                        No transactions found for the selected filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reports;

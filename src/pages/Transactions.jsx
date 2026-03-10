import React, { useState } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';

const Transactions = ({ transactions, addTransaction }) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        type: 'buy',
        amount: '',
        description: '',
        status: 'completed'
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.amount || !formData.description) return;

        addTransaction({
            ...formData,
            amount: parseFloat(formData.amount)
        });

        setFormData({
            date: new Date().toISOString().split('T')[0],
            type: 'buy',
            amount: '',
            description: '',
            status: 'completed'
        });

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const getBadgeClass = (type) => {
        switch (type) {
            case 'buy': return 'badge-primary';
            case 'sell': return 'badge-success';
            case 'build': return 'badge-warning';
            default: return 'badge-secondary';
        }
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <h1 className="mb-lg">Manage Transactions</h1>

            <div className="transactions-grid" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Form Column */}
                <div className="glass-panel" style={{ flex: '1', minWidth: '300px' }}>
                    <div className="flex-between mb-md">
                        <h3>New Transaction</h3>
                        {showSuccess && (
                            <span className="text-success flex-center gap-sm">
                                <CheckCircle2 size={18} /> Added successfully
                            </span>
                        )}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Transaction Type</label>
                            <select
                                className="form-select"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="buy">Acquire Land / Property</option>
                                <option value="build">Construction Expense</option>
                                <option value="sell">Sell Property</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description / Property Address</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="e.g. Maple St Foundation Work"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label className="form-label">Amount (USD)</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    placeholder="0.00"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label className="form-label">Date</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="completed">Completed</option>
                                <option value="in-progress">In Progress</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                            <Plus size={18} /> Record Transaction
                        </button>
                    </form>
                </div>

                {/* Recent Transactions Column */}
                <div className="glass-panel" style={{ flex: '1.5', minWidth: '400px' }}>
                    <div className="flex-between mb-md">
                        <h3>Recent Tranactions</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {transactions.slice(0, 5).map(tx => (
                            <div key={tx.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--border-radius-md)' }}>
                                <div>
                                    <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{tx.description}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{tx.date}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <span className={`badge ${getBadgeClass(tx.type)}`}>{tx.type}</span>
                                    <span style={{ fontWeight: 600, color: tx.type === 'sell' ? 'var(--accent-success)' : 'var(--text-main)' }}>
                                        {tx.type === 'sell' ? '+' : '-'}${tx.amount.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transactions;

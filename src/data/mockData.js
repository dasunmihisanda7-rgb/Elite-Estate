// Initial Mock Data
export const mockTransactions = [
    { id: 1, date: '2026-03-01', type: 'buy', amount: 450000, description: 'Land Acquisition - Maple St', status: 'completed' },
    { id: 2, date: '2026-03-05', type: 'build', amount: 55000, description: 'Architecture & Permits - Maple St', status: 'completed' },
    { id: 3, date: '2026-03-08', type: 'build', amount: 120000, description: 'Foundation & Framing - Maple St', status: 'in-progress' },
    { id: 4, date: '2026-02-15', type: 'sell', amount: 850000, description: 'Sold Property - Oak Ave', status: 'completed' },
    { id: 5, date: '2026-02-10', type: 'build', amount: 300000, description: 'Finishing Touches - Oak Ave', status: 'completed' },
    { id: 6, date: '2026-01-20', type: 'buy', amount: 320000, description: 'Land Acquisition - Oak Ave', status: 'completed' }
];

export const summaryStats = {
    activeProjects: 1,
    completedProjects: 1,
    totalRevenue: 850000,
    totalExpenses: 945000,
    netProfit: -95000 // Negative because still building Maple St
};

import React, { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement
);

const StatCard = ({ title, value, icon, isPositive, secondaryIconColor }) => {
    return (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: '1', minWidth: '200px' }}>
            <div className="flex-between">
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500, textTransform: 'uppercase' }}>{title}</span>
                <div style={{ background: `rgba(${secondaryIconColor}, 0.1)`, padding: '0.5rem', borderRadius: '50%' }}>
                    {icon}
                </div>
            </div>
            <div>
                <h2 style={{ fontSize: '2rem', margin: 0 }}>{value}</h2>
                {isPositive !== undefined && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: isPositive ? 'var(--accent-success)' : 'var(--accent-danger)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span>{isPositive ? '+12%' : '-4%'} from last month</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const Dashboard = ({ transactions }) => {

    const stats = useMemo(() => {
        let revenue = 0;
        let expenses = 0;
        let projCosts = {};

        transactions.forEach(tx => {
            const amount = Number(tx.amount) || 0;
            if (tx.type === 'sell') {
                revenue += amount;
            } else {
                expenses += amount;
                if (!projCosts[tx.description]) projCosts[tx.description] = 0;
                projCosts[tx.description] += amount;
            }
        });

        return {
            totalRevenue: revenue,
            totalExpenses: expenses,
            netProfit: revenue - expenses,
            activeProjects: Object.keys(projCosts).length
        };
    }, [transactions]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(amount);
    };

    const { chartLabels, revenueData, expensesData, doughnutDataValues } = useMemo(() => {
        let revenueByMonth = {};
        let expensesByMonth = {};
        let buyTotal = 0;
        let buildTotal = 0;
        let otherTotal = 0;

        // Pre-fill the last 6 months so the chart always has a timeline baseline
        const d = new Date();
        for (let i = 5; i >= 0; i--) {
            const pastDate = new Date(d.getFullYear(), d.getMonth() - i, 1);
            const monthYear = `${pastDate.toLocaleString('default', { month: 'short' })} ${pastDate.getFullYear()}`;
            revenueByMonth[monthYear] = 0;
            expensesByMonth[monthYear] = 0;
        }

        // Ensure transactions are sorted by date ascending for the line chart
        const sortedDesc = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

        sortedDesc.forEach(tx => {
            const amount = Number(tx.amount) || 0;

            // Doughnut chart (Expenses)
            if (tx.type === 'buy') buyTotal += amount;
            else if (tx.type === 'build') buildTotal += amount;
            else if (tx.type !== 'sell') otherTotal += amount;

            // Line chart grouping
            const date = new Date(tx.date);
            const monthYear = isNaN(date.getTime()) ? 'Unknown' : `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

            if (monthYear !== 'Unknown') {
                if (!revenueByMonth[monthYear]) revenueByMonth[monthYear] = 0;
                if (!expensesByMonth[monthYear]) expensesByMonth[monthYear] = 0;

                if (tx.type === 'sell') {
                    revenueByMonth[monthYear] += amount;
                } else {
                    expensesByMonth[monthYear] += amount;
                }
            }
        });

        const sortedLabels = Object.keys(revenueByMonth).sort((a, b) => {
            return new Date(a) - new Date(b);
        });

        const rData = sortedLabels.map(m => revenueByMonth[m]);
        const eData = sortedLabels.map(m => expensesByMonth[m]);

        return {
            chartLabels: sortedLabels.length > 0 ? sortedLabels : ['No Data'],
            revenueData: sortedLabels.length > 0 ? rData : [0],
            expensesData: sortedLabels.length > 0 ? eData : [0],
            doughnutDataValues: [buyTotal, buildTotal, otherTotal]
        };
    }, [transactions]);

    const lineChartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Revenue',
                data: revenueData,
                borderColor: '#00ff88',
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Expenses',
                data: expensesData,
                borderColor: '#ff0055',
                backgroundColor: 'rgba(255, 0, 85, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top', labels: { color: '#f8f9fa' } }
        },
        scales: {
            y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#8b949e' } },
            x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#8b949e' } }
        }
    };

    const doughNutData = {
        labels: ['Land Costs', 'Construction', 'Permits & Other'],
        datasets: [{
            data: doughnutDataValues,
            backgroundColor: [
                '#00f0ff',
                '#7b2cbf',
                '#ffb703'
            ],
            borderWidth: 0,
            hoverOffset: 4
        }]
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <h1 className="mb-lg">Financial Overview</h1>

            {/* Stats Row */}
            <div className="dashboard-stats-grid" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <StatCard
                    title="Total Revenue"
                    value={formatCurrency(stats.totalRevenue)}
                    icon={<DollarSign color="var(--accent-success)" />}
                    isPositive={true}
                    secondaryIconColor="0, 255, 136"
                />
                <StatCard
                    title="Total Expenses"
                    value={formatCurrency(stats.totalExpenses)}
                    icon={<DollarSign color="var(--accent-danger)" />}
                    isPositive={false}
                    secondaryIconColor="255, 0, 85"
                />
                <StatCard
                    title="Net Profit"
                    value={formatCurrency(stats.netProfit)}
                    icon={<Activity color={stats.netProfit >= 0 ? "var(--accent-success)" : "var(--accent-warning)"} />}
                    secondaryIconColor={stats.netProfit >= 0 ? "0, 255, 136" : "255, 183, 3"}
                />
                <StatCard
                    title="Active Projects"
                    value={stats.activeProjects}
                    icon={<TrendingUp color="var(--accent-primary)" />}
                    secondaryIconColor="0, 240, 255"
                />
            </div>

            {/* Charts Row */}
            <div className="dashboard-charts-grid" style={{ display: 'flex', gap: '1.5rem', height: '400px' }}>
                <div className="glass-panel" style={{ flex: '2', display: 'flex', flexDirection: 'column' }}>
                    <h3 className="mb-md">Cash Flow Trends</h3>
                    <div style={{ flex: 1, minHeight: 0 }}>
                        <Line data={lineChartData} options={lineChartOptions} />
                    </div>
                </div>

                <div className="glass-panel" style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                    <h3 className="mb-md">Expense Breakdown</h3>
                    <div style={{ flex: 1, minHeight: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Doughnut
                            data={doughNutData}
                            options={{
                                maintainAspectRatio: false,
                                plugins: { legend: { position: 'bottom', labels: { color: '#f8f9fa', padding: 20 } } },
                                cutout: '70%'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

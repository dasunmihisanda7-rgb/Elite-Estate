import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import { useState, useEffect } from 'react';
import Login from './pages/Login';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch transactions from the SQLite backend
  useEffect(() => {
    if (isAuthenticated) {
      fetchTransactions();
    }
  }, [isAuthenticated]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      if (data.message === 'success') {
        setTransactions(data.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTransaction = async (newTx) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTx)
      });
      const data = await response.json();

      if (data.message === 'success') {
        // Prepend the successfully saved transaction
        setTransactions([data.data, ...transactions]);
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      {/* Mobile backdrop overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.5)', zIndex: 998, backdropFilter: 'blur(5px)'
          }}
        />
      )}
      <div className="app-container">
        <div className="main-content">
          <Header onLogout={() => setIsAuthenticated(false)} onMenuClick={() => setIsMobileMenuOpen(true)} />
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <h3 style={{ color: 'var(--text-muted)' }}>Loading Database...</h3>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Dashboard transactions={transactions} />} />
              <Route path="/transactions" element={<Transactions transactions={transactions} addTransaction={addTransaction} />} />
              <Route path="/reports" element={<Reports transactions={transactions} />} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;

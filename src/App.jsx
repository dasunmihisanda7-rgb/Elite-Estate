import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import { mockTransactions } from './data/mockData';
import { useState } from 'react';
import Login from './pages/Login';

function App() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const addTransaction = (newTx) => {
    setTransactions([{ ...newTx, id: Date.now() }, ...transactions]);
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
          <Routes>
            <Route path="/" element={<Dashboard transactions={transactions} />} />
            <Route path="/transactions" element={<Transactions transactions={transactions} addTransaction={addTransaction} />} />
            <Route path="/reports" element={<Reports transactions={transactions} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

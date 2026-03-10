import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import { collection, getDocs, addDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';

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
      console.log("Attempting to fetch transactions from Firebase...");
      const q = query(collection(db, "transactions"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);

      console.log(`Successfully fetched ${querySnapshot.docs.length} documents from Firestore.`);

      const fetchedTransactions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error("Critical Firebase Error Details:", error.code, error.message, error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTransaction = async (newTx) => {
    try {
      const docRef = await addDoc(collection(db, "transactions"), newTx);

      // Update local state immediately with the new Firebase document ID
      const savedTx = { ...newTx, id: docRef.id };
      setTransactions([savedTx, ...transactions]);

    } catch (error) {
      console.error("Error saving transaction to Firebase:", error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await deleteDoc(doc(db, "transactions", id));
      setTransactions(transactions.filter(tx => tx.id !== id));
    } catch (error) {
      console.error("Error deleting transaction from Firebase:", error);
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
              <Route path="/transactions" element={<Transactions transactions={transactions} addTransaction={addTransaction} deleteTransaction={deleteTransaction} />} />
              <Route path="/reports" element={<Reports transactions={transactions} deleteTransaction={deleteTransaction} />} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;

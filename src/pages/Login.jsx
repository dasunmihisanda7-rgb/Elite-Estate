import React, { useState } from 'react';
import { Lock, Unlock, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState(false);
    const [isUnlocking, setIsUnlocking] = useState(false);

    const CORRECT_PASSCODE = '2026'; // Hardcoded for demo purposes

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passcode === CORRECT_PASSCODE) {
            setError(false);
            setIsUnlocking(true);
            setTimeout(() => {
                onLogin();
            }, 800); // Small delay for animation effect
        } else {
            setError(true);
            setPasscode('');
            setTimeout(() => setError(false), 2000);
        }
    };

    const handlePinClick = (num) => {
        if (passcode.length < 4) {
            setPasscode(prev => prev + num);
        }
    };

    const handleDelete = () => {
        setPasscode(prev => prev.slice(0, -1));
    };

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'radial-gradient(ellipse at 10% 20%, rgba(10, 132, 255, 0.25) 0%, transparent 40%), radial-gradient(ellipse at 90% 80%, rgba(191, 90, 242, 0.3) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(48, 209, 88, 0.15) 0%, transparent 50%), #000000',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background ambient glowing rings */}
            {/* Background ambient glowing rings */}
            <div style={{
                position: 'absolute',
                width: '600px', height: '600px',
                borderRadius: '50%',
                background: 'rgba(10, 132, 255, 0.08)',
                border: '1px solid rgba(10, 132, 255, 0.15)',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 100px rgba(10, 132, 255, 0.1)',
                filter: 'blur(30px)'
            }} />
            <div style={{
                position: 'absolute',
                width: '800px', height: '800px',
                borderRadius: '50%',
                border: '1px solid rgba(191, 90, 242, 0.1)',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'spin 120s linear infinite',
                filter: 'blur(40px)'
            }} />

            <style>
                {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          @keyframes spin {
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes pulseLock {
            0% { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(0, 240, 255, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0); }
          }
        `}
            </style>

            <div className="glass-panel login-panel" style={{
                width: '400px',
                padding: '3rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                zIndex: 10,
                animation: error ? 'shake 0.4s' : 'none',
                borderColor: error ? 'var(--accent-danger)' : (isUnlocking ? 'var(--accent-success)' : 'var(--glass-border)'),
                boxShadow: isUnlocking ? '0 0 40px rgba(0, 255, 136, 0.2)' : 'var(--glass-shadow)',
                transition: 'all 0.3s ease'
            }}>

                <div style={{
                    width: '80px', height: '80px',
                    borderRadius: '50%',
                    background: isUnlocking ? 'rgba(0, 255, 136, 0.1)' : 'rgba(0, 240, 255, 0.1)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    marginBottom: '1.5rem',
                    border: `1px solid ${isUnlocking ? 'var(--accent-success)' : 'var(--accent-primary)'}`,
                    animation: !isUnlocking && !error ? 'pulseLock 2s infinite' : 'none',
                    transition: 'all 0.3s ease'
                }}>
                    {isUnlocking ?
                        <Unlock size={32} color="var(--accent-success)" /> :
                        <Lock size={32} color={error ? "var(--accent-danger)" : "var(--accent-primary)"} />
                    }
                </div>

                <h2 style={{ marginBottom: '0.5rem', textAlign: 'center', fontStyle: 'normal' }}>
                    {isUnlocking ? 'Access Granted' : 'Security Portal'}
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    {isUnlocking ? 'Decrypting communications...' : 'Enter your 4-digit master passcode to continue'}
                </p>

                <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Custom PIN Display */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                        {[0, 1, 2, 3].map(index => (
                            <div key={index} style={{
                                width: '16px', height: '16px',
                                borderRadius: '50%',
                                background: passcode.length > index ? (error ? 'var(--accent-danger)' : 'var(--text-main)') : 'rgba(255, 255, 255, 0.05)',
                                border: `1px solid ${passcode.length > index ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                                transition: 'all 0.2s',
                                boxShadow: passcode.length > index ? '0 0 10px rgba(255,255,255,0.5)' : 'none'
                            }} />
                        ))}
                    </div>

                    <div className="pin-btn-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1rem',
                        width: '100%',
                        marginBottom: '2rem'
                    }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => handlePinClick(num.toString())}
                                disabled={isUnlocking}
                                style={{
                                    padding: '1rem',
                                    borderRadius: 'var(--border-radius-md)',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    color: 'var(--text-main)',
                                    fontSize: '1.25rem',
                                    fontWeight: '500',
                                    cursor: isUnlocking ? 'default' : 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => { if (!isUnlocking) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)' }}
                                onMouseOut={(e) => { if (!isUnlocking) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)' }}
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isUnlocking}
                            style={{
                                padding: '1rem',
                                borderRadius: 'var(--border-radius-md)',
                                background: 'transparent',
                                color: 'var(--text-muted)',
                                fontSize: '1rem',
                                cursor: isUnlocking ? 'default' : 'pointer'
                            }}
                        >
                            DEL
                        </button>
                        <button
                            type="button"
                            onClick={() => handlePinClick('0')}
                            disabled={isUnlocking}
                            style={{
                                padding: '1rem',
                                borderRadius: 'var(--border-radius-md)',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                color: 'var(--text-main)',
                                fontSize: '1.25rem',
                                fontWeight: '500',
                                cursor: isUnlocking ? 'default' : 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => { if (!isUnlocking) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)' }}
                            onMouseOut={(e) => { if (!isUnlocking) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)' }}
                        >
                            0
                        </button>
                        <button
                            type="submit"
                            disabled={isUnlocking || passcode.length < 4}
                            style={{
                                padding: '1rem',
                                borderRadius: 'var(--border-radius-md)',
                                background: passcode.length === 4 ? 'var(--accent-primary)' : 'rgba(0, 240, 255, 0.1)',
                                color: passcode.length === 4 ? '#000' : 'var(--accent-primary)',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                cursor: isUnlocking || passcode.length < 4 ? 'default' : 'pointer',
                                border: 'none',
                                transition: 'all 0.2s',
                                boxShadow: passcode.length === 4 ? '0 0 15px rgba(0, 240, 255, 0.4)' : 'none'
                            }}
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>

                    {error && <div style={{ color: 'var(--accent-danger)', fontSize: '0.85rem', marginTop: '-1rem', animation: 'fadeIn 0.2s' }}>Invalid Passcode. Please try again.</div>}

                </form>

                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <ShieldCheck size={14} /> Encrypted Connection
                </div>
            </div>
        </div>
    );
};

export default Login;

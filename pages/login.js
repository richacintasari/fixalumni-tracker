import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/dashboard');
    } else {
      alert('Username atau Password salah!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.glassCard}>
        <div style={styles.iconCircle}>
          <span style={{ fontSize: '30px' }}>🚀</span>
        </div>
        
        <h2 style={styles.title}>Tracer Alumni</h2>
        <p style={styles.subtitle}>Selamat datang kembali! Silakan login untuk mengelola data pelacakan.</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input 
              type="text" 
              placeholder="Masukkan username" 
              onChange={(e) => setUser(e.target.value)} 
              style={styles.input} 
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              onChange={(e) => setPass(e.target.value)} 
              style={styles.input} 
              required 
            />
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.button,
              backgroundColor: isHover ? '#0056b3' : '#0070f3',
              transform: isHover ? 'translateY(-2px)' : 'translateY(0)'
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            Masuk ke Dashboard
          </button>
        </form>

        <div style={styles.footer}>
          &copy; 2026 Tracer Study System - Universitas Muhammadiyah Malang
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'radial-gradient(circle at top left, #1e293b 0%, #0f172a 100%)',
    color: 'white',
    fontFamily: '"Inter", "Segoe UI", sans-serif',
  },
  glassCard: {
    padding: '50px 40px',
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    width: '100%',
    maxWidth: '420px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  iconCircle: {
    width: '70px',
    height: '70px',
    backgroundColor: 'rgba(0, 112, 243, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 20px',
    border: '1px solid rgba(0, 112, 243, 0.3)',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    marginBottom: '10px',
    letterSpacing: '-0.5px',
    background: 'linear-gradient(to right, #fff, #94a3b8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    marginBottom: '35px',
    lineHeight: '1.6',
  },
  form: {
    textAlign: 'left',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#cbd5e1',
    marginBottom: '8px',
    marginLeft: '4px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid #334155',
    backgroundColor: '#0f172a',
    color: 'white',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '16px',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '16px',
    marginTop: '15px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 10px 15px -3px rgba(0, 112, 243, 0.3)',
  },
  footer: {
    marginTop: '40px',
    fontSize: '11px',
    color: '#475569',
    letterSpacing: '0.5px',
  }
};
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]); // Untuk pencarian
  const [searchTerm, setSearchTerm] = useState('');
  const [displayLimit, setDisplayLimit] = useState(50); // Default 50
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('isLoggedIn');
    if (!auth) { router.push('/login'); return; }

    fetch('/api/alumni')
      .then(res => res.json())
      .then(data => {
        setAlumni(data.display || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Logika Pencarian dan Limit
  useEffect(() => {
    const results = alumni.filter(person =>
      person.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAlumni(results.slice(0, displayLimit));
  }, [searchTerm, alumni, displayLimit]);

  if (loading) return <div style={styles.loader}>⚙️ Menyinkronkan {total.toLocaleString() || '45.000'} Data...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={{ margin: 0 }}>📊 Dashboard Pelacakan Alumni</h1>
          <p style={{ color: '#888', marginTop: '5px' }}>Menampilkan {total.toLocaleString()} database terlacak</p>
        </div>
        <button onClick={() => {localStorage.clear(); router.push('/login')}} style={styles.logoutBtn}>Logout</button>
      </div>

      {/* --- FITUR BARU: SEARCH & LIMIT --- */}
      <div style={styles.filterBar}>
        <div style={{ flex: 2 }}>
          <label style={styles.label}>Cari Nama Alumni:</label>
          <input 
            type="text" 
            placeholder="Ketik nama untuk melacak..." 
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={styles.label}>Tampilkan Data:</label>
          <select 
            style={styles.selectInput} 
            value={displayLimit} 
            onChange={(e) => setDisplayLimit(parseInt(e.target.value))}
          >
            <option value={50}>50 Data</option>
            <option value={100}>100 Data</option>
            <option value={150}>150 Data</option>
          </select>
        </div>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nama Alumni</th>
              <th style={styles.th}>Kontak & Email</th>
              <th style={styles.th}>Pekerjaan & Alamat Kantor</th>
              <th style={styles.th}>Kategori</th>
              <th style={styles.th}>Profil Sosial Media</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlumni.length > 0 ? (
              filteredAlumni.map((a, i) => (
                <tr key={i} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                  <td style={styles.td}><b style={{color: '#00ff6a'}}>{a.nama}</b></td>
                  <td style={styles.td}>{a.email}<br/><span style={{fontSize: '12px', color: '#888'}}>{a.no_hp}</span></td>
                  <td style={styles.td}>
                    <div style={{fontWeight: 'bold'}}>{a.posisi}</div>
                    <div style={{color: '#ccc'}}>{a.tempat_bekerja}</div>
                  </td>
                  <td style={styles.td}><span style={styles.badge}>{a.kategori}</span></td>
                  <td style={styles.td}>
                    <a href={a.sosmed?.linkedin} target="_blank" style={styles.link}>LinkedIn</a> | 
                    <a href={a.sosmed_kantor} target="_blank" style={styles.link}> Kantor</a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{padding: '40px', textAlign: 'center', color: '#888'}}>
                  Data tidak ditemukan untuk nama "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '40px', backgroundColor: '#0f0f0f', color: 'white', minHeight: '100vh', fontFamily: '"Segoe UI", sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  filterBar: { display: 'flex', gap: '20px', marginBottom: '20px', backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333' },
  label: { display: 'block', marginBottom: '8px', fontSize: '12px', color: '#888', textTransform: 'uppercase' },
  searchInput: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#252525', color: 'white', outline: 'none' },
  selectInput: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#252525', color: 'white', cursor: 'pointer' },
  tableWrapper: { backgroundColor: '#1a1a1a', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' },
  th: { backgroundColor: '#252525', padding: '15px', color: '#888', fontSize: '12px', borderBottom: '2px solid #333' },
  td: { padding: '15px', borderBottom: '1px solid #252525' },
  trEven: { backgroundColor: '#1a1a1a' },
  trOdd: { backgroundColor: '#1d1d1d' },
  badge: { backgroundColor: '#004a1e', color: '#00ff6a', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' },
  link: { color: '#0070f3', textDecoration: 'none' },
  logoutBtn: { backgroundColor: '#e03131', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' },
  loader: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f0f', color: 'white' }
};
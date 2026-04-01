import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLogin = localStorage.getItem("login");
    if (!isLogin) {
      router.push("/login");
    }
  }, []);

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: 30 }}>🎓 Alumni</h2>
        <p style={styles.menu} onClick={() => router.push("/")}>Dashboard</p>
        <p style={styles.menu} onClick={() => router.push("/alumni")}>Data Alumni</p>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        {/* NAVBAR */}
        <div style={styles.navbar}>
          <h3>Dashboard</h3>
          <button
            style={styles.logout}
            onClick={() => {
              localStorage.removeItem("login");
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>

        {/* CONTENT */}
        <div style={styles.content}>
          <div style={styles.card}>
            <h2>Total Alumni</h2>
            <p style={{ fontSize: 24 }}>120</p>
          </div>

          <div style={styles.card}>
            <h2>Bekerja</h2>
            <p style={{ fontSize: 24 }}>90</p>
          </div>

          <div style={styles.card}>
            <h2>Wirausaha</h2>
            <p style={{ fontSize: 24 }}>30</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    fontFamily: "Segoe UI, sans-serif",
  },
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#111827",
    color: "#fff",
    padding: "20px",
  },
  menu: {
    cursor: "pointer",
    marginBottom: "15px",
  },
  main: {
    flex: 1,
    background: "#f3f4f6",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#fff",
    borderBottom: "1px solid #ddd",
  },
  logout: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  content: {
    display: "flex",
    gap: "20px",
    padding: "30px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    flex: 1,
  },
};
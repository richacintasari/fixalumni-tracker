export default function Alumni() {
  const data = [
    {
      nama: "Richa",
      email: "richa@gmail.com",
      pekerjaan: "Programmer",
    },
    {
      nama: "Budi",
      email: "budi@gmail.com",
      pekerjaan: "PNS",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: 20 }}>Data Alumni</h1>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Pekerjaan</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.nama}</td>
              <td>{item.email}</td>
              <td>{item.pekerjaan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
  },
};
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'pages', 'data', 'alumni.json');
    
    if (!fs.existsSync(filePath)) {
      return res.status(200).json({ total: 0, display: [] });
    }

    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const allData = JSON.parse(jsonData);
    
    res.status(200).json({
      total: allData.length,
      // Kita hanya kirim 100 data ke tabel agar browser tidak macet (Throttling)
      display: allData.slice(0, 100) 
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal memuat data" });
  }
}
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    // 構建文件路徑
    const filePath = path.join(process.cwd(), 'public', 'document', `article${id}.json`);
    
    // 讀取文件內容
    const fileContents = await fs.readFile(filePath, 'utf8');
    
    // 返回JSON數據
    res.status(200).json(JSON.parse(fileContents));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read file' });
  }
}

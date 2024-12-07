import connection from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

const articlesDir = path.join(process.cwd(), 'data', 'articles');
const counterPath = path.join(process.cwd(), 'data', 'counter.json')


// 确保目录和计数器文件存在
const ensureResources = async () => {
  try {
    await fs.mkdir(articlesDir, { recursive: true });

    try {
      await fs.access(counterPath);
    } catch {
      await fs.writeFile(counterPath, JSON.stringify({ count: 0 }));
    }
  } catch (err) {
    console.error('Error ensuring resources:', err);
  }
};

// 获取当前计数器值并递增
const getNextId = async () => {
  try {
    const counterData = await fs.readFile(counterPath, 'utf8');
    const { count } = JSON.parse(counterData);
    const newCount = count + 1;

    await fs.writeFile(counterPath, JSON.stringify({ count: newCount }));
    return newCount;
  } catch (err) {
    console.error('Error getting next ID:', err);
    throw new Error('Failed to get next ID');
  }
};

export default async function handler(req, res) {
   await ensureResources();

  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(req, res) {
  const { fid, c_type } = req.query;
  // try {
  //   let [rows] = []
  //   if(fid) {
  //     [rows] = await connection.query('SELECT * FROM feed WHERE fid = ?', [fid]);
  //     res.status(200).json({
  //       status: "success",
  //       data: rows[0]
  //     });
      
  //   } else {
  //     [rows] = await connection.query('SELECT * FROM feed');
  //     if([rows].length === 0) {
  //       res.status(200).json({
  //         status: 204,
  //         data: []
  //       });
  //     } else {
  //       res.status(200).json({
  //         status: "success",
  //         data: rows
  //       });
  //     }
  //   }
   

  // } catch (error) {
  //   res.status(500).json({ message: 'Database error', error });
  // }
  try {
    if (fid) {
      const filePath = path.join(articlesDir, `${fid}.json`);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const article = JSON.parse(fileContent);

      res.status(200).json({ status: 'success', data: article });
    } else {
      // 返回所有文章
      const files = await fs.readdir(articlesDir);
      let articles = await Promise.all(
        files.map(async (file) => {
          const fileContent = await fs.readFile(path.join(articlesDir, file), 'utf8');
          return JSON.parse(fileContent);
        })
      );

      if (c_type) {
        articles = articles.filter((article) => article.c_type === c_type);
      }
      res.status(200).json({ status: 'success', data: articles });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch articles', error: err.message });
  }
}

async function handlePost(req, res) {
  // const { newPost } = req.body;
  // try {
  //   const [result] = await connection.query(`
  //     INSERT INTO feed (title, content, \`desc\`, author, dateline)
  //     VALUES (?, ?, ?, ?, UNIX_TIMESTAMP())`,
  //     [newPost.title, newPost.content, newPost.content.substr(0, 20), newPost.author]
  //   );

  //   const insertId = result.insertId;

  //   const coverPath = `/assets/image/article/cover_${insertId}.png`;
  //   await connection.query(`
  //     UPDATE feed SET cover = ? WHERE fid = ?`,
  //     [coverPath, insertId]
  //   );

  //   res.status(200).json({
  //     status: "success",
  //     data: {
  //       fid: insertId,
  //       title: newPost.title,
  //       content: newPost.content,
  //       desc: newPost.content.substr(0, 20),
  //       cover: coverPath,
  //       author: newPost.author,
  //       dateline: Date.now(),
  //     },
  //   });
  // } catch (error) {
  //   res.status(500).json({ message: 'Database error', error });
  // }
  const { newPost } = req.body;
  if (!newPost.title || !newPost.content || !newPost.author) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  try {
    const id = await getNextId();
    const article = {
      fid: id,
      c_type: newPost.c_type,
      title: newPost.title,
      content:newPost.content,
      desc: newPost.desc,
      author: newPost.author,
      dateline: Math.floor(Date.now() / 1000),
      cover: `/assets/image/article/cover_${id}.png`
    };
      
    const filePath = path.join(articlesDir, `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(article, null, 2));

    res.status(200).json({ status: 'success', data: article });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save article', error: err.message });
  }
}

async function handlePut(req, res) {
  const { id, title, content } = req.body;
  try {
    await connection.query('UPDATE feed SET title = ?, content = ? WHERE id = ?', [title, content, id]);
    res.status(200).json({
      status: "success",
      message: "Record updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
}

async function handleDelete(req, res) {
  const { id } = req.body;
  try {
    await connection.query('DELETE FROM feed WHERE id = ?', [id]);
    res.status(200).json({
      status: "success",
      message: "Record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
}
import connection from '@/lib/db';

export default async function handler(req, res) {
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
  const { fid } = req.query;
  try {
    let [rows] = []
    if(fid) {
      [rows] = await connection.query('SELECT * FROM feed WHERE fid = ?', [fid]);
      res.status(200).json({
        status: "success",
        data: rows[0]
      });
      
    } else {
      [rows] = await connection.query('SELECT * FROM feed');
      if([rows].length === 0) {
        res.status(200).json({
          status: 204,
          data: []
        });
      } else {
        res.status(200).json({
          status: "success",
          data: rows
        });
      }
    }
   

  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
}

async function handlePost(req, res) {
  const { newPost } = req.body;
  try {
    const [result] = await connection.query(`
      INSERT INTO feed (title, content, \`desc\`, author, dateline)
      VALUES (?, ?, ?, ?, UNIX_TIMESTAMP())`,
      [newPost.title, newPost.content, newPost.content.substr(0, 20), newPost.author]
    );

    const insertId = result.insertId;

    const coverPath = `/assets/image/article/cover_${insertId}.png`;
    await connection.query(`
      UPDATE feed SET cover = ? WHERE fid = ?`,
      [coverPath, insertId]
    );

    res.status(200).json({
      status: "success",
      data: {
        fid: insertId,
        title: newPost.title,
        content: newPost.content,
        desc: newPost.content.substr(0, 20),
        cover: coverPath,
        author: newPost.author,
        dateline: Date.now(),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
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
import type { NextApiRequest, NextApiResponse } from 'next';

const audioProxy = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query;

  if (!url || Array.isArray(url)) {
    res.status(400).send('Invalid URL');
    return;
  }

  try {
    const audioRes = await fetch(url);
    const contentType = audioRes.headers.get('content-type');

    if (!contentType || !contentType.startsWith('audio/')) {
      res.status(400).send('Invalid Content-Type');
      return;
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(await audioRes.arrayBuffer());
  } catch (error) {
    console.error('Error fetching audio:', error);
    res.status(500).send('Error fetching audio');
  }
};

export default audioProxy;

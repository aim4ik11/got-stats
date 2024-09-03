import { NextApiRequest, NextApiResponse } from 'next';
import { deletePlayer } from '@/service/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    const deletedPlayer = await deletePlayer(id as string);
    if (deletedPlayer) {
      return res.status(200).json(deletedPlayer);
    }
    return res.status(404).json({ error: 'Player not found' });
  }

  return res.status(405).end();
};

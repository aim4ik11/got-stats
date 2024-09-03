import { NextApiRequest, NextApiResponse } from 'next';
import { deleteGame } from '@/service/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const { id } = req.query;
    const deletedGame = await deleteGame(id as string);
    if (deletedGame) {
      return res.status(200).json(deletedGame);
    }
    return res.status(404).end();
  }

  return res.status(405).end();
};

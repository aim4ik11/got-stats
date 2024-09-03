import { NextApiRequest, NextApiResponse } from 'next';
import { getAllGames, addGame } from '@/service/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const games = await getAllGames();
    return res.status(200).json(games);
  }

  if (req.method === 'POST') {
    const newGame = req.body;
    const game = await addGame(newGame);
    return res.status(201).json(game);
  }

  return res.status(405).end();
};

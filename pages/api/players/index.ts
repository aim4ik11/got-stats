import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPlayers, addPlayer } from '@/service/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const players = await getAllPlayers();
    return res.status(200).json(players);
  }

  if (req.method === 'POST') {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Player name is required' });
    }
    const player = await addPlayer(name);
    return res.status(201).json(player);
  }

  return res.status(405).end();
};
'use server';
import path from "path";
import fs from 'fs/promises';
import { Game, Player } from "./types";
import { revalidatePath } from "next/cache";

const filePath = path.resolve('public/games.json');

async function readFileData(): Promise<{ games: Game[], players: Player[] }> {
  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileData) as { games: Game[], players: Player[] };
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('File not found, creating new one...');
      const defaultData = { games: [], players: [] };
      await writeFileData(defaultData);
      return defaultData;
    } else {
      console.error('Failed to read file:', error);
      return { games: [], players: [] };
    }
  }
}

async function writeFileData(data: { games: Game[], players: Player[] }): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write file:', error);
  }
}

export const addGame = async (newGame: any) => {
  try {
    const { games, players } = await readFileData();
    const game = { ...newGame, id: generateUniqueId() };
    games.push(game);

    await writeFileData({ games, players });
  } catch (error) {
    console.error('Failed to save game:', error);
  }
};

export async function getAllPlayers(): Promise<Player[]> {
  const { players } = await readFileData();
  return players;
}

export async function getAllGames(): Promise<Game[]> {
  const { games } = await readFileData();
  return games;
}

export async function addPlayer(name: string): Promise<Player> {
  const { games, players } = await readFileData();
  const newPlayer: Player = { id: generateUniqueId(), name };
  players.push(newPlayer);
  await writeFileData({ games, players });
  return newPlayer;
}

export async function deletePlayer(id: string): Promise<Player | null> {
  const { games, players } = await readFileData();
  const playerIndex = players.findIndex(player => player.id === id);

  if (playerIndex === -1) {
    return null;
  }

  const removedPlayer = players.splice(playerIndex, 1)[0];
  await writeFileData({ games, players });
  return removedPlayer;
}

export async function deleteGame(id: string): Promise<Game | null> {
  const { games, players } = await readFileData();
  const gameIndex = games.findIndex(game => game.id === id);

  if (gameIndex === -1) {
    return null;
  }

  const removedGame = games.splice(gameIndex, 1)[0];
  await writeFileData({ games, players });
  revalidatePath('/');
  return removedGame;
}

function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

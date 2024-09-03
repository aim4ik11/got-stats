'use server';
import path from "path";
import fs from 'fs/promises';
import { Game, Player } from "./types";
import { revalidatePath } from "next/cache";

const gamesFilePath = path.resolve('public/games.json');
const playersFilePath = path.join('public/players.json');

export const addGame = async (newGame: any) => {
  try {
    const fileData = await fs.readFile(gamesFilePath, 'utf-8');
    const games = JSON.parse(fileData) as Game[];

    const game = {...newGame, id: generateUniqueId()};
    games.push(game);

    await fs.writeFile(gamesFilePath, JSON.stringify(games, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save game:', error);
  }
};

async function readPlayersFile(): Promise<Player[]> {
  try {
    const fileContents = await fs.readFile(playersFilePath, 'utf8');
    return JSON.parse(fileContents) as Player[];
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('File not found, creating new one...');
      await writePlayersFile([]);
      return [];
    } else {
      console.error('Failed to read players file:', error);
      return [];
    }
  }
}

async function readGamesFile(): Promise<Game[]> {
  try {
    const fileContents = await fs.readFile(gamesFilePath, 'utf8');
    return JSON.parse(fileContents) as Game[];
  } catch (error) {
    console.error('Failed to read games file:', error);
    return [];
  }
}

async function writePlayersFile(players: Player[]): Promise<void> {
  try {
    await fs.writeFile(playersFilePath, JSON.stringify(players, null, 2), 'utf8');
  } catch (error) {
    console.error('Failed to write players file:', error);
  }
}

async function writeGamesFile(games: Game[]): Promise<void> {
  try {
    await fs.writeFile(gamesFilePath, JSON.stringify(games, null, 2), 'utf8');
  } catch (error) {
    console.error('Failed to write games file:', error);
  }
}

export async function getAllPlayers(): Promise<Player[]> {
  return await readPlayersFile();
}

export async function getAllGames(): Promise<Game[]> {
  return await readGamesFile();
}

export async function addPlayer(name: string): Promise<Player> {
  const players = await readPlayersFile();
  const newPlayer: Player = { id: generateUniqueId(), name };
  players.push(newPlayer);
  await writePlayersFile(players);
  return newPlayer;
}

export async function deletePlayer(id: string): Promise<Player | null> {
  const players = await readPlayersFile();
  const playerIndex = players.findIndex(player => player.id === id);

  if (playerIndex === -1) {
    return null;
  }

  const removedPlayer = players.splice(playerIndex, 1)[0];
  await writePlayersFile(players);
  return removedPlayer;
}

export async function deleteGame(id: string): Promise<Game | null> {
  const games = await readGamesFile();
  const gameIndex = games.findIndex(games => games.id === id);

  if (gameIndex === -1) {
    return null;
  }

  const removedGame = games.splice(gameIndex, 1)[0];
  await writeGamesFile(games);
  revalidatePath('/');
  return removedGame;
}

function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

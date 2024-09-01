'use server';
import path from "path";
import fs from 'fs/promises';
import { Game, Player } from "./types";

const gamesFilePath = path.resolve('public/games.json');
const playersFilePath = path.join('public/players.json');

export const addGame = async (newGame: Game) => {
  try {
    const fileData = await fs.readFile(gamesFilePath, 'utf-8');
    const games = JSON.parse(fileData) as Game[];

    games.push(newGame);

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
    console.error('Failed to read players file:', error);
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

export async function getAllPlayers(): Promise<Player[]> {
  return await readPlayersFile();
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

function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

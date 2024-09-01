import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Faction, Game, Player, PlayerInGame } from "@/service/types";
import { addGame } from "@/service/api";

export const onFactionDragEnd = (
  result: any,
  factions: Faction[],
  players: PlayerInGame[],
  setFactions: (factions: Faction[]) => void,
  setPlayers: (players: PlayerInGame[]) => void
) => {
  if (!result.destination) return;

  const reorderedFactions = Array.from(factions);
  const [removedFaction] = reorderedFactions.splice(result.source.index, 1);
  reorderedFactions.splice(result.destination.index, 0, removedFaction);

  const reorderedPlayers = Array.from(players);
  const [removedPlayer] = reorderedPlayers.splice(result.source.index, 1);
  reorderedPlayers.splice(result.destination.index, 0, removedPlayer);

  setFactions(reorderedFactions);
  setPlayers(reorderedPlayers);
};

export const getAvailablePlayers = (
  index: number,
  players: PlayerInGame[],
  allPlayers: Player[]
) => {
  const selectedPlayerIds = players
    .filter((_, i) => i !== index)
    .map((player) => player.playerId)
    .filter((id) => id);

  return allPlayers.filter((player) => !selectedPlayerIds.includes(player.id));
};

export const handleMVPChange = (
  playerId: string,
  players: PlayerInGame[],
  setPlayers: (players: PlayerInGame[]) => void
) => {
  const updatedPlayers = players.map(player => {
    if (player.isMVP && player.playerId !== playerId) {
      return { ...player, isMVP: false };
    }
    if (player.playerId === playerId) {
      return { ...player, isMVP: true };
    }
    return player;
  });

  setPlayers(updatedPlayers);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export const handleAddGame = async (
  players: PlayerInGame[],
  date: Date | undefined,
  toast: any,
) => {
  if (!date) {
    toast({
      variant: 'destructive',
      title: 'Game date missing',
      description: 'Select game date please.',
    });
    return;
  }

  for (const player of players) {
    if (player.playerId === '') {
      toast({
        variant: 'destructive',
        title: 'Player missing',
        description: 'All players must be selected.',
      });
      return;
    }
  }

  const pointsMap = [15, 12, 10, 8, 6, 4, 2, 1];
  const gamePlayers = players.map((player, index) => {
    let points = pointsMap[index] || 0;
    if (player.isMVP) {
      points += 1;
    }
    return { ...player, points };
  });

  const mvpId = players.find(p => p.isMVP)?.playerId;

  if (!mvpId) {
    toast({
      variant: 'destructive',
      title: 'MVP missing',
      description: 'MVP must be selected.',
    });
    return;
  }

  const game: Game = {
    players: gamePlayers,
    date: date.toLocaleDateString(),
    mvpId,
  };

  await addGame(game);
  console.log("created");
};

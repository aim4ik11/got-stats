import usePlayers from "@/hooks/use-players";
import { cn } from "@/lib/utils";
import { Game } from "@/service/types";
import { Star } from "@phosphor-icons/react";
import { Medal, TrophyIcon, Trash2Icon } from "lucide-react";
import ConfirmDelete from "./ConfirmDelete";
import { deleteGame } from "@/service/api";
import { useAuth } from "@/service/AuthContext";

interface GameProps {
  game: Game;
};

const GameItem = ({ game }: GameProps) => {
  const {isAuthorized} = useAuth();
  const { allPlayers } = usePlayers();

  const getPlayerName = (id: string) => {
    const player = allPlayers.find((player) => player.id === id);
    return player ? player.name : "Unknown Player";
  };

  const handleDelete = async () => {
    return await deleteGame(game.id);
  };

  return (
    <div className="bg-background rounded-lg border p-6 w-full max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrophyIcon className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Game Results</h2>
        </div>
        <div className="text-sm text-muted-foreground">Game Date: {game.date}</div>
        {isAuthorized && <ConfirmDelete onDelete={handleDelete} />}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {game.players.map((player, index) => (
          <div
            key={index}
            className={cn('bg-card rounded-lg p-4 flex flex-col gap-2', {
              'border-2 border-primary': index < 3,
              'border border-muted-foreground/20': index >= 3,
            })}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {index === 0 && <Medal className="w-6 h-6 text-yellow-500" />}
                {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
                {index === 2 && <Medal className="w-6 h-6 text-orange-400" />}
                <div className="text-lg font-bold">{getPlayerName(player.playerId)}</div>
              </div>
              {player.isMVP && (
                <Star className="text-yellow-500 mr-2 h-6 w-6" />
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {player.faction} - {player.points} points
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameItem;

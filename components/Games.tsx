import useGames from "@/hooks/use-games";
import { Game } from "@/service/types";
import GameItem from "./GameItem";

const Games = () => {
  const { allGames } = useGames();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
      {allGames.map((game: Game) => (
        <GameItem key={game.id} game={game} />
      ))}
    </div>
  );
};

export default Games;
import { useEffect, useState } from "react";
import { getAllGames } from "@/service/api";
import { Game } from "@/service/types";

const useGames = () => {
  const [allGames, setAllGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const games = await getAllGames();
      setAllGames(games);
    };

    fetchGames();
  }, []);

  return allGames;
};

export default useGames;

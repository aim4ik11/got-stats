import { useEffect, useState } from "react";
import { getAllPlayers } from "@/service/api";
import { Player } from "@/service/types";

const usePlayers = () => {
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const players = await getAllPlayers();
      setAllPlayers(players);
    };

    fetchPlayers();
  }, []);

  return allPlayers;
};

export default usePlayers;

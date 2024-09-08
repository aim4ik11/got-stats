import { useEffect, useState } from "react";
import { Game } from "@/service/types";

const useGames = () => {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [newGame, setNewGame] = useState<Partial<Game>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/games');
        const games = await response.json();
        setAllGames(games);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const addGame = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGame),
      });

      if (response.ok) {
        const addedGame = await response.json();
        setAllGames((prevGames) => [...prevGames, addedGame]);
      } else {
        console.error("Failed to add game:", await response.text());
      }
    } catch (error) {
      console.error("Error adding game:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteGame = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/games/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAllGames((prevGames) => prevGames.filter((game) => game.id !== id));
      } else {
        console.error("Failed to delete game:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting game:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    allGames,
    newGame,
    setNewGame,
    addGame,
    deleteGame,
    loading,
  };
};

export default useGames;

// hooks/usePlayers.ts
import { useEffect, useState } from "react";
import { Player } from "@/service/types";

const usePlayers = () => {
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/players');
        const players = await response.json();
        setAllPlayers(players);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const addPlayer = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newPlayerName }),
      });

      if (response.ok) {
        const addedPlayer = await response.json();
        setAllPlayers((prevPlayers) => [...prevPlayers, addedPlayer]);
        setNewPlayerName('');
      } else {
        console.error("Failed to add player:", await response.text());
      }
    } catch (error) {
      console.error("Error adding player:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePlayer = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/players/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAllPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
      } else {
        console.error("Failed to delete player:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting player:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    allPlayers,
    newPlayerName,
    setNewPlayerName,
    addPlayer,
    deletePlayer,
    loading,
  };
};

export default usePlayers;

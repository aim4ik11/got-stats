'use client';

import { useEffect, useState } from "react";
import { Player } from "@/service/types";
import { addPlayer, deletePlayer, getAllPlayers } from "@/service/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PlayersPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      const players = await getAllPlayers();
      setPlayers(players);
    };

    fetchPlayers();
  }, []);

  const handleAddPlayer = async () => {
    try {
      if (newPlayerName.trim() === "") return;

      const newPlayer = await addPlayer(newPlayerName);
      setPlayers([...players, newPlayer]);
      setNewPlayerName("");
    } catch (error) {
      console.error("Failed to add player:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  const handleRemovePlayer = async (id: string) => {
    try {
      deletePlayer(id);
      setPlayers(players.filter(player => player.id !== id));
    } catch (error) {
      console.error("Failed to remove player:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Players List</h1>
      <div className="mb-4 flex">
        <Input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter player name"
          className="border rounded p-2 mr-2 w-64"
        />
        <Button
          onClick={handleAddPlayer}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Player
        </Button>
      </div>
      <ul>
        {players.map((player) => (
          <li key={player.id} className="flex items-center mb-2 border gap-2 rounded-xl bg-blue-100">
            <span className="flex-1 ml-2">{player.name}</span>
            <Button
              onClick={() => handleRemovePlayer(player.id)}
              className="bg-red-500 text-white p-2 rounded-xl"
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersPage;
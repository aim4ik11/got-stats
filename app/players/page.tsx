'use client';

import { useEffect, useState } from "react";
import { Player } from "@/service/types";
import { addPlayer, deletePlayer, getAllPlayers } from "@/service/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2Icon } from "lucide-react";
import { useAuth } from "@/service/AuthContext";

const PlayersPage = () => {
  const { isAuthorized } = useAuth();
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
      {isAuthorized && (
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
            className="text-black border border-black hover:bg-gray-300 p-2 rounded"
          >
            Add Player
          </Button>
        </div>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {players.map((player) => (
          <li key={player.id} className="flex items-center mb-2 min-h-10 border border-black gap-2 rounded-xl">
            <span className="flex-1 ml-2">{player.name}</span>
            {isAuthorized && (
              <Button
                onClick={() => handleRemovePlayer(player.id)}
              >
                <Trash2Icon className="w-4 h-4" />
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersPage;
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Faction, PlayerInGame } from "@/service/types";
import { useState } from "react";
import usePlayers from "@/hooks/use-players";
import { Button } from "./ui/button";
import DatePicker from "./ui/date-picker";
import DraggableFaction from "./DraggableFaction";
import { useToast } from "@/hooks/use-toast";
import { getAvailablePlayers, handleAddGame, handleMVPChange, onFactionDragEnd } from "@/lib/utils";

const factionOptions = Object.values(Faction);

const DraggableList = () => {
  const { allPlayers } = usePlayers();
  const { toast } = useToast();
  const [players, setPlayers] = useState<PlayerInGame[]>(
    Array(factionOptions.length).fill({ playerId: '', faction: '' })
  );
  const [factions, setFactions] = useState(factionOptions);
  const [date, setDate] = useState<Date>();

  const handleFactionChange = (index: number, playerId: string) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], playerId, faction: factions[index] };
    setPlayers(newPlayers);
  };
  

  return (
    <div>
      <DragDropContext
        onDragEnd={(result) => onFactionDragEnd(result, factions, players, setFactions, setPlayers)}
      >
        <Droppable droppableId="factions">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='flex flex-col space-y-4'
            >
              {factions.map((faction: string, index: number) => (
                <DraggableFaction
                  key={faction}
                  faction={faction}
                  index={index}
                  handleFactionChange={handleFactionChange}
                  getAvailablePlayers={(index) => getAvailablePlayers(index, players, allPlayers)}
                  handleMVPChange={(playerId) => handleMVPChange(playerId, players, setPlayers)}
                  player={players[index]}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="flex items-center gap-2 justify-between">
        <DatePicker
          className="bg-white w-full"
          onDateChange={setDate}
          fallback="Pick game date"
        />
        <Button
          onClick={() => handleAddGame(players, date, toast)}
          className='border-gray-800 text-gray-800 border hover:bg-gray-300'
        >
          Save Game
        </Button>
      </div>
    </div>
  );
};

export default DraggableList;

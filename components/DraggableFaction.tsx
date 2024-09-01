import { Draggable } from "@hello-pangea/dnd";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Player, PlayerInGame } from "@/service/types";
import { Medal, Star } from "@phosphor-icons/react";
import { Checkbox } from "./ui/checkbox";

interface DraggableFactionProps {
  faction: string;
  index: number;
  getAvailablePlayers: (index: number) => Player[];
  player?: PlayerInGame;
  handleFactionChange: (index: number, playerId: string) => void;
  handleMVPChange: (playerId: string) => void;
}

const DraggableFaction = ({
  index,
  faction,
  getAvailablePlayers,
  player,
  handleFactionChange,
  handleMVPChange,
}: DraggableFactionProps) => {

  const getMedalColor = () => {
    if (index === 0) return "text-yellow-500 border-yellow-500";
    if (index === 1) return "text-gray-400 border-gray-400";
    if (index === 2) return "text-orange-400 border-orange-400";
    return "";
  };

  const getPoints = () => {
    const pointsMap = [15, 12, 10, 8, 6, 4, 2, 1];
    return pointsMap[index] || 0;
  };

  return (
    <Draggable draggableId={faction} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-4 border rounded-md w-full ${snapshot.isDragging ? 'shadow-lg' : ''}`}
          style={{
            ...provided.draggableProps.style,
            margin: '0 0 8px 0',
            padding: '8px',
            boxSizing: 'border-box',
          }}
        >
          <div className="flex justify-between">
            <div className="flex items-center mb-1">
              {index < 3 && (
                <Medal
                  className={`${getMedalColor()} mr-2 h-6 w-6`}
                />
              )}
              {player?.isMVP && (
                <Star className="text-yellow-500 mr-2 h-6 w-6" />
              )}
              <label className='text-sm font-medium'>{faction}</label>
            </div>
            <div className="w-fit">
              {`${getPoints()} pts ${player?.isMVP ? ' + 1 pts' : ''}`}
            </div>
          </div>
          <div className="flex items-center">
            <Select
              onValueChange={(value) => handleFactionChange(index, value)}
              value={player?.playerId || ''}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select a player" />
              </SelectTrigger>
              <SelectContent className='bg-white w-full'>
                {getAvailablePlayers(index).map((player) => (
                  <SelectItem
                    key={player.id}
                    value={player.id}
                    className="w-full"
                  >
                    <div className="hover:bg-gray-100 hover:text-blue-800 transition-colors duration-150 p-2 cursor-pointer w-full">
                      {player.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {player?.playerId && (
              <div className="ml-4 flex items-center">
                <Checkbox
                  checked={player?.isMVP || false}
                  onCheckedChange={() => handleMVPChange(player.playerId)}
                  className="h-5 w-5"
                />
                <label className="ml-2 text-sm font-medium">
                  MVP
                </label>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableFaction;
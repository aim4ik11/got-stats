export enum Faction {
  Stark = 'Stark',
  Greyjoy = 'Greyjoy',
  Baratheon = 'Baratheon',
  Arryn = 'Arryn',
  Targaryen = 'Targaryen',
  Martell = 'Martell',
  Lannister = 'Lannister',
  Tyrell = 'Tyrell'
};

export interface Player {
  id: string;
  name: string;
};

export interface PlayerInGame {
  playerId: string;
  faction: Faction;
  points: number;
  isMVP: boolean;
};

export interface Game {
  id: string;
  date: string;
  players: PlayerInGame[];
  mvpId: string;
};
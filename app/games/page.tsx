'use client';
import CreateGameWindow from '@/components/CreateGameWindow';
import Games from '@/components/Games';
import { useAuth } from '@/service/AuthContext';

export default function GamesPage() {
  const { isAuthorized } = useAuth();
  return (
    <div className="p-4">
      <div className='flex items-center justify-center gap-4 mb-2'>
        <h1 className=" flex text-2xl font-bold items-center justify-center">
          Games Archive
        </h1>
        {isAuthorized && <CreateGameWindow />}
      </div>
      <Games />
    </div>
  );
};

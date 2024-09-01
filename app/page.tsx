'use client';
import CreateGameWindow from '@/components/CreateGameWindow';
import DraggableList from '@/components/DraggableList';

export default function Home() {
  return (
    <div className="p-4">
      <h1 className=" flex text-2xl font-bold mb-4 items-center justify-center">Game Statistics</h1>
      <div className='max-w-sm'>
        <CreateGameWindow />
      </div>
    </div>
  );
}

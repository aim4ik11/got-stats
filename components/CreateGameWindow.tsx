import React, { useState } from 'react';
import DraggableList from './DraggableList';
import { Button } from './ui/button';

const CreateGameWindow = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div>
      <Button onClick={openDialog} className='border-black bg-gray-400 hover:bg-gray-500 hover:text-white'>
        Open Draggable List
      </Button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={closeDialog}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <DraggableList />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGameWindow;

import React, { useState } from 'react';
import DraggableList from './DraggableList';
import { Button } from './ui/button';
import { Plus, X } from '@phosphor-icons/react';

const CreateGameWindow = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      closeDialog();
    }
  };

  return (
    <div>
      <Button
        onClick={openDialog}
        className='border-gray-800 text-gray-800 border hover:bg-gray-300'
      >
        <Plus className='w-6 h-6' />
      </Button>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className='relative mb-2 flex justify-center'>
              <p className='text-2xl'>
                Create New Game
              </p>
              <Button
                onClick={closeDialog}
                className="absolute right-0 top-0"
              >
                <X className="w-6 h-6 mb-2" />
              </Button>
            </div>
            <DraggableList />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGameWindow;

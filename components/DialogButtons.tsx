import { Button } from "./ui/button"

interface DialogButtonsProps {
  handleClose: () => void;
  handleSubmit: () => void;
};

const DialogButtons = ({ handleClose, handleSubmit }: DialogButtonsProps) => {
  return (
    <>
      <Button
        onClick={handleClose}
        variant="outline"
        className='rounded-xl border-black hover:bg-gray-100'
      >
        Cancel
      </Button>
      <Button
        onClick={handleSubmit}
        className='rounded-xl border-black bg-blue-100 hover:bg-blue-200'
      >
        Save Game
      </Button>
    </>
  );
};

export default DialogButtons;
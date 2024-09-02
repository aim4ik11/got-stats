import { Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface ConfirmDeleteProps {
  onDelete: () => void;
}

const ConfirmDelete = ({ onDelete }: ConfirmDeleteProps) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Trash2Icon className="w-6 h-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this game?</DialogTitle>
          <DialogDescription>This action cannot be undone</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-end gap-4">
          <DialogClose asChild>
            <Button
              className="border border-black hover:bg-gray-300 rounded-xl"
              onClick={handleDelete}
            >
              Yes
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="border border-black hover:bg-gray-300 rounded-xl"
            >
              No
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDelete;

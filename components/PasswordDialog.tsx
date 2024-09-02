'use client';
import { useAuth } from "@/service/AuthContext";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { User } from "@phosphor-icons/react";

const PasswordDialog = () => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(password);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded w-full gap-2">
          <User className="w-6 h-6" />
          Authorize
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogTitle>Enter Password</DialogTitle>
        <DialogDescription>
          Please enter the password to access the content.
        </DialogDescription>
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 p-2 border rounded w-full"
            required
          />
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="border border-black hover:bg-gray-300 text-black p-2 rounded"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDialog;

'use client';
import { useAuth } from "@/service/AuthContext";
import Link from "next/link";
import PasswordDialog from "./PasswordDialog";
import { User } from "@phosphor-icons/react";

const Sidebar = () => {
  const { isAuthorized } = useAuth();

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="flex flex-col p-4 space-y-2">
        {isAuthorized ? (
          <div className="p-2 hover:bg-gray-700 rounded flex items-center gap-2 w-full">
            <User className="w-6 h-6" />
            <h1 className="text-xl font-bold">Admin</h1>
          </div>
        ) : (
          <PasswordDialog />
        )}
      </div>
      <hr className="border-gray-600 my-2" />
      <nav className="flex flex-col p-4 space-y-2">
        {/* <Link href="/" className="hover:bg-gray-700 p-2 rounded w-full">
          Main
        </Link> */}
        <Link href="/players" className="hover:bg-gray-700 p-2 rounded w-full">
          Players
        </Link>
        <Link href="/games" className="hover:bg-gray-700 p-2 rounded w-full">
          Games
        </Link>
        {/* <Link href="/factions" className="hover:bg-gray-700 p-2 rounded w-full">
          Factions
        </Link> */}
      </nav>
    </div>
  );
};

export default Sidebar;

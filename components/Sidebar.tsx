import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4">Navigation</h2>
      <nav className="flex flex-col p-4 space-y-2">
        <Link href="/" className="hover:bg-gray-700 p-2 rounded">
          Main
        </Link>
        <Link href="/players" className="hover:bg-gray-700 p-2 rounded">
          Players
        </Link>
        <Link href="/games" className="hover:bg-gray-700 p-2 rounded">
          Games
        </Link>
        <Link href="/factions" className="hover:bg-gray-700 p-2 rounded">
          Factions
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
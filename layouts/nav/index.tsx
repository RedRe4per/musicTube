import { NavPages } from "@/components/NavPages";
import { NavLibrary } from "@/components/NavLibrary";
import { NavPlaylist } from "@/components/NavPlaylist";

export const Nav = () => {
  return (
    <main className="w-[303px] bg-gray-800 h-[100vh] hidden lg:block">
      <NavPages />
      <NavLibrary />
      <NavPlaylist />
    </main>
  );
};

import { NavPages } from "@/components/NavigationBar/NavPages";
import { NavLibrary } from "@/components/NavigationBar/NavLibrary";
import { NavPlaylist } from "@/components/NavigationBar/NavPlaylist";

export const Nav = () => {
  return (
    <main className="w-[303px] bg-gray-800 h-[100vh] hidden lg:block">
      <NavPages />
      <NavLibrary />
      <NavPlaylist />
    </main>
  );
};

import { NavPages } from "@/components/NavigationBar/NavPages";
import { NavLibrary } from "@/components/NavigationBar/NavLibrary";
import { NavPlaylist } from "@/components/NavigationBar/NavPlaylist";

export const Nav = () => {
  return (
    <aside className="w-[303px] bg-gray-800 h-[100vh] hidden xl:block overflow-scroll navScrollbar">
      <NavPages />
      <NavLibrary />
      <NavPlaylist />
    </aside>
  );
};

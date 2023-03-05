import { NavPages } from "@/components/NavPages";
import { NavLibrary } from "@/components/NavLibrary";

export const Nav = () => {
  return (
    <main className="w-[330px] bg-gray-800 h-[100vh] absolute">
      <NavPages />
      <NavLibrary />
    </main>
  );
};

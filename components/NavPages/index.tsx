import { NavPagesItem } from "./NavItem";

export const NavPages = () => {
  return (
    <section className="text-h3-light mt-[50px] flex flex-col gap-[7px]">
      <NavPagesItem text="Home" icon="home" pathname="/" />
      <NavPagesItem text="Browse" icon="browse" pathname="/browse" />
      <NavPagesItem text="Liked songs" icon="heart" pathname="/likedSongs" />
    </section>
  );
};

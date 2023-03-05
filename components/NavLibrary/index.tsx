import { LibraryItem } from "./LibraryItem";

export const NavLibrary = () => {
    return (
        <section className="mt-[37px] ml-[40px] text-white-200 text-gray-200 mix-blend-hard-light">
            <span className="text-tag-normal uppercase">Your library</span>
            <ul className="text-h3-bold flex flex-col gap-[20px] mt-[17px]">
                <LibraryItem text="Made for you" />
                <LibraryItem text="Recent player" />
                <LibraryItem text="Albums" />
                <LibraryItem text="Artists" />
                <LibraryItem text="Local files" />
                <LibraryItem text="Podcasts" />
            </ul>
        </section>
    );
};

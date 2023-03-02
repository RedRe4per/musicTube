export const Nav = () => {
  return (
    <main className="w-330px bg-gray-800">
      <section className="italic font-bold">
        <div>
          <img></img>
          <span>Home</span>
        </div>
        <div>
          <img></img>
          <span>Browse</span>
        </div>
        <div>
          <img></img>
          <span>Liked songs</span>
        </div>
      </section>
      <section>
        <span>Your library</span>
        <ul className="text-h3-light">
          <li>Made for you</li>
          <li>Recent player</li>
          <li>Albums</li>
          <li>Artists</li>
          <li>Local files</li>
          <li>Podcasts</li>
        </ul>
      </section>
    </main>
  );
};

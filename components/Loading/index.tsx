export const Loading = () => {
  return (
    <section className="absolute brightness-150 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col justify-center items-center gap-6">
      <div>
        <svg
          className="animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="150"
          height="150"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"
            fill="#1DB954"
          />
        </svg>
      </div>
      <div className="h-10 w-[8rem]">
        <h5 className="text-h3-normal text-green loading">Loading&nbsp;</h5>
      </div>
    </section>
  );
};

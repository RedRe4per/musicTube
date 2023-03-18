interface Props {
  searchResult: any;
}

export const SearchResult = ({ searchResult }: Props) => {
  console.log(searchResult);
  return (
    <section
      className={`${
        searchResult ? "" : "hidden"
      } absolute brightness-150 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10`}
    >
      <div>121231231231233</div>
      <div>121231231231233</div>
      <div>121231231231233</div>
      <div>121231231231233</div>
      <div>121231231231233</div>
    </section>
  );
};

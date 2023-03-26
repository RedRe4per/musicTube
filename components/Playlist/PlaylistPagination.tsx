interface Props {
  itemQty: number;
  currentPage: number;
  switchPage: (targetPage: number) => void;
}

export const PlaylistPagination = ({
  itemQty,
  currentPage,
  switchPage,
}: Props) => {
  const pageQty: number = Math.ceil(itemQty / 20) > 10 ? 10 : Math.ceil(itemQty / 20);

  return (
    <section
      className={`flex justify-center mb-28 ${itemQty < 21 ? "hidden" : ""}`}
    >
      <div className="btn-group">
        {Array.from({ length: pageQty }, (_, index) => (
          <button
            key={index}
            onClick={() => switchPage(index)}
            className={`btn btn-lg ${
              currentPage === index + 1 ? "btn-success disabled" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

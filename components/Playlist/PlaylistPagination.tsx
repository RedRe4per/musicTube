interface Props {
  itemQty: number;
  currentPage: number;
  switchPage: (targetPage: number)=>void;
}

export const PlaylistPagination = ({ itemQty, currentPage, switchPage }: Props) => {
  const pageQty = Math.ceil(itemQty / 20);
  
  return (
    <section className="flex justify-center mb-16">
      <div className="btn-group">
        {Array.from({ length: pageQty }, (_, index) => (
          <button
            key={index}
            onClick={()=>switchPage(index)}
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

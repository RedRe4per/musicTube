interface Props {
    itemQty: number;
    currentPage: number;
}

export const PlaylistPagination = ({itemQty, currentPage}: Props) => {
    const pageQty = Math.ceil(itemQty/20);

    const handlePage = () => {

    }
    console.log(pageQty, "pagination comp")
    return (
        <section className="flex justify-center mb-16">
            <div className="btn-group">
                {Array.from({ length: pageQty }, (_, index) => (
        
          <button key={index} onClick={handlePage} className={`btn btn-lg ${currentPage === index+1? "btn-success disabled" : ""}`}>{index+1}</button>
        
      ))}
            </div>
        </section>
    )

}
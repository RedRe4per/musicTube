export const ResultItem = ({song}: any) => {
    return (
        <section className="hover:bg-gray-400 hover:text-green p-2 rounded-lg text-h4-light">
            <h5>{song.name}</h5>
            <h6 className="text-tag-light text-gray-300 brightness-75">{song.ar.map((artist: any, index: number)=> {return (<span key={index}>{artist.name}&nbsp;&nbsp;</span>)} )}</h6>
        </section>
    )
}
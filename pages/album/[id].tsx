interface SSRProps {
    albumId: number;
}

interface Pros {
    album: any;
}

export default function Album({ album }: any) {
    console.log(album, "album page")




    return (
        <main>
            <div>123123123</div>
        </main>
    )
}

export async function getServerSideProps( context: any ) {
    const { id } = context.query;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album?id=${id}`
    );
    const album = await response.json();
    return { props: album };
}

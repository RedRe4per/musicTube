import Image from "next/image";
import { getDominantColor } from "@/utils/getDominantColor";

interface SSRProps {
  albumId: number;
}

interface Props {
  album: any;
}

export default function Album({ album }: Props) {
  //console.log(album, "album page");
  const { blurPicUrl, type, name, picUrl, description, subType, artists } =
    album;

  //const dominantColor = getDominantColor(picUrl);
  
  return (
    <main className="">
      <section className="mt-6 ml-10 flex">
        <div>
          <Image
            src={picUrl}
            alt="bluePicUrl"
            className="rounded-2xl"
            width={280}
            height={280}
          />
        </div>
        <section className="ml-10 mt-10 flex flex-col justify-around">
          <section className="flex gap-4 text-tag-light text-green">
            <span>{type}</span>
            <span>{subType}</span>
          </section>
          <h3 className="text-h2-normal text-white-200">{name}</h3>
          <section>
            <h5 className="text-tag-normal text-gray-200">
              Artists:{" "}
              {artists.map((artist: any) => {
                return <span key={artist.id}>{artist.name}&nbsp;&nbsp;</span>;
              })}
            </h5>
          </section>
        </section>
      </section>
      {/* <section>
        <p>{description}</p>
        
        </section> */}
      <section className="mt-10">play and like</section>
      <section>music list</section>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album?id=${id}`
  );
  const album = await response.json();
  return { props: album };
}

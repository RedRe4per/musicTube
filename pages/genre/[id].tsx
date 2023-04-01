import { GetServerSidePropsContext } from "next";

export default function Genre(artistInfo: any) {
  return <main></main>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_SERVER_ADDRESS
    }/artists?id=${id}&timestamp=${Date.now()}`
  );
  const artistInfo = await response.json();
  return { props: artistInfo };
}

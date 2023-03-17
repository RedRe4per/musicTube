interface Props {
  text: string;
}

export const LibraryItem = ({ text }: Props) => {
  return <li>{text}</li>;
};

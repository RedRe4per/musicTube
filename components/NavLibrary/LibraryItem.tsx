interface Props {
    text: string;
}

export const LibraryItem = (props: Props) => {
    const { text } = props;

    return (
        <li>
            {text}
        </li>
    );
};

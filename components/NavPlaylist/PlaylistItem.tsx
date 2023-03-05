interface Props {
    text: string;
}

export const PlaylistItem = ({ text }: Props) => {
    return (
        <li className="flex items-center w-[250px] h-[46px] rounded-[10px] hover:bg-gray-600 text-h3-bold">
            <span className="ml-[20px]">{text}</span>
        </li>
    );
};

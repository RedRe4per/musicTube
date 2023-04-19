export const encodeSlash = (input: string) => {
    return input.split('/').join('%2F');
}

export const decodeSlash = (input: string) => {
    return input.split('%2F').join('/');
}
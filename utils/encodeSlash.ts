export const encodeSlash = (input: string) => {
  return input.replace(/\//g, '%2F').replace(/\?/g, '%3F').replace(/=/g, '%3D').replace(/&/g, '%26');
};

export const decodeSlash = (input: string) => {
  return input.replace(/%2F/g, '/').replace(/%3F/g, '?').replace(/%3D/g, '=').replace(/%26/g, '&');
};

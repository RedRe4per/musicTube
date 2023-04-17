export interface IArtist {
  albumSize: number;
  alias: string[];
  briefDesc: string;
  followed: boolean;
  id: number;
  img1v1Id: number;
  img1v1Id_str: string;
  img1v1Url: string;
  musicSize: number;
  name: string;
  picId: number;
  picId_str?: string;
  picUrl: string;
  topicPerson: number;
  trans: string;
}

export type AreaCode = "-1" | "0" | "7" | "8" | "16" | "96";

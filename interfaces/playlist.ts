export interface IPlaylistList {
  code: number;
  lasttime: number;
  more: boolean;
  playlists: IPlaylist[];
  total: number;
}

export interface IPlaylist {
  name: string;
  id: number;
  trackNumberUpdateTime: number;
  status: number;
  userId: number;
  createTime: number;
  updateTime: number;
  subscribedCount: number;
  trackCount: number;
  cloudTrackCount: number;
  coverImgUrl: string;
  coverImgId: number;
  description: string;
  tags: string[];
  playCount: number;
  trackUpdateTime: number;
  specialType: number;
  totalDuration: number;
  creator: {
    defaultAvatar: boolean;
    province: number;
    authStatus: number;
    followed: boolean;
    avatarUrl: string;
    accountStatus: number;
    gender: number;
    city: number;
    birthday: number;
    userId: number;
    userType: number;
    nickname: string;
    signature: string;
    description: string;
    detailDescription: string;
    avatarImgId: number;
    backgroundImgId: number;
    backgroundUrl: string;
    authority: number;
    mutual: boolean;
    expertTags: string[];
    djStatus: number;
    vipType: number;
    authenticationTypes: number;
    avatarDetail: {
      userType: number;
      identityLevel: number;
      identityIconUrl: string;
    };
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    anchor: boolean;
    avatarImgId_str: string;
  };
  subscribed: boolean;
  commentThreadId: string;
  newImported: boolean;
  adType: number;
  highQuality: boolean;
  privacy: number;
  ordered: boolean;
  anonimous: boolean;
  coverStatus: number;
  shareCount: number;
  coverImgId_str: string;
  commentCount: number;
  copywriter: string;
  tag: string;
  trackIds: [
    {
      id: number;
      v: number;
      t: number;
      at: number;
      uid: number;
      rcmdReason: string;
    }
  ];
  tracks: Track[];
}

export interface IPrivilege {
  chargeInfoList: [
    {
      chargeType: number;
      chargeMessage: string | null;
      chargeUrl: string | null;
      rate: number;
    }
  ];
  cp: number;
  cs: boolean;
  dl: number;
  dlLevel: string;
  fee: number;
  fl: number;
  flLevel: string;
  flag: number;
  freeTrialPrivilege: {
    listenType: null;
    resConsumable: boolean;
    userConsumable: boolean;
  };
  id: number;
  maxBrLevel: string;
  maxbr: number;
  paidBigBang: false;
  payed: number;
  pl: number;
  plLevel: string;
  playMaxBrLevel: string;
  playMaxbr: number;
  preSell: boolean;
  realPayed: number;
  sp: number;
  st: number;
  subp: string;
  toast: boolean;
}

export interface Track {
  al: {
    id: number;
    name: string;
    pic: number;
    picUrl: string;
    pic_str: string;
  };
  ar: [
    {
      id: number;
      name: string;
    }
  ];
  cd: string;
  cf: string;
  dt: number;
  mark: number;
  name: string;
  id: number;
  publishTime: number;
  resourceState: true;
}

export interface CardTrack {
  name: string;
  id: number;
  album: {
    id: number;
    picUrl: string;
  };
  artists: [
    {
      name: string;
      id: number;
    }
  ];
}

export interface IPlaylistTag {
  playlist: string;
  color: {
    dominantColor: string;
  };
  imageUrl: string;
}
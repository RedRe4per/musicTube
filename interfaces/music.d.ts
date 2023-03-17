export interface IMusicDetail {
  id: number;
  url: string;
  br: number;
  size: number;
  md5: string;
  code: number;
  expi: number;
  type: string;
  gain: number;
  peak: number;
  fee: number;
  uf: null;
  payed: number;
  flag: number;
  canExtend: boolean;
  freeTrialInfo: {
    start: number;
    end: number;
  };
  level: string;
  encodeType: string;
  freeTrialPrivilege: {
    resConsumable: boolean;
    userConsumable: boolean;
    listenType: null;
    cannotListenReason: null;
  };
  freeTimeTrialPrivilege: {
    resConsumable: boolean;
    userConsumable: boolean;
    type: number;
    remainTime: number;
  };
  urlSource: number;
  rightSource: number;
  podcastCtrp: null;
  effectTypes: null;
  time: number;
}

export interface ITrack {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: [
    {
      id: number;
      name: string;
    }
  ];
  pop: number;
  st: number;
  rt: string;
  fee: number;
  v: number;
  cf: string;
  al: {
    id: number;
    name: string;
    picUrl: string;
    pic: number;
  };
  dt: number;
  h: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  m: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  l: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  cd: string;
  no: number;
  ftype: number;
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  version: number;
  single: number;
  rtype: number;
  mst: number;
  cp: number;
  mv: number;
  publishTime: number;
}

export interface ITrackId {
  id: number;
  v: number;
  t: number;
  at: number;
  uid: number;
  rcmdReason: string;
}

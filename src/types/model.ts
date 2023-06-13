
export interface IHeroState {
  current: number;
  user1: IHeroUser;
  user2: IHeroUser;
  heroActiveID?: number;
}

export interface IHeroUser {
  position: number;
  status: boolean;
}

export interface IHeroes {
  heroes: IHero;
}

export interface IHero {
  [key: string]: IHeroItem;
}

export interface IHeroItem {
  id: number;
  name: string;
}

export interface IZones {
  zones: IZone;
}

export interface IZone {
  [key: string]: {
    name: string;
  };
}

export interface ICodes {
  [key: string]: ICode;
}

export interface ICode {
  [key: string]: ICodeItem;
}

export interface ICodeItem {
  id: number;
  code: number | string;
  name: string;
}

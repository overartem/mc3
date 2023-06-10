export interface IHeroState {
  current: number;
  heroActiveID: number;
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

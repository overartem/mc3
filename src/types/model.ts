export interface IHeroes {
  heroes: IHero;
}

export interface IHero {
  [key: string]: {
    id: number;
    name: string;
  };
}

export interface IZones {
  zones: IZone;
}

export interface IZone {
  [key: string]: {
    name: string;
  };
}

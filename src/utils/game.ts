import { ITEM_HEROES_IN_ROW } from "constants/settings";
import { IZones, IZone, IHeroState, IHeroItem } from "types/model";

export const getZone = (data: IZones): string => {
  const arr: IZone[] = Object.values(data);
  let randomItem = "";
  arr.forEach((zone: IZone) => {
    randomItem = zone[Math.floor(Math.random() * Object.keys(zone).length)]?.name;
  });
  return randomItem;
};

export const currentItem = (prevIndex: IHeroState, event: string, heroes: IHeroItem[], heroActiveID: number) => {
  let current = prevIndex.current;
  const numberHeroesRows = heroes?.length / ITEM_HEROES_IN_ROW - 1;
  if (event === "ArrowRight") {
    const remainder = (prevIndex.current + 1) % heroes.length;
    current = remainder === 0 ? heroes.length : remainder;
  } else if (event === "ArrowLeft") {
    const remainder = (prevIndex.current - 1) % heroes.length;
    current = remainder === 0 ? heroes.length : remainder;
  } else if (event === "ArrowDown") {
    const remainder = (prevIndex.current + ITEM_HEROES_IN_ROW) % heroes.length;
    current = remainder === 0 ? heroes.length : remainder;
  } else if (event === "ArrowUp") {
    const remainder = (prevIndex.current - ITEM_HEROES_IN_ROW) % heroes.length;
    current = remainder <= 0 ? prevIndex.current + ITEM_HEROES_IN_ROW * numberHeroesRows : remainder;
  }
  heroActiveID = current;
  return { current, heroActiveID };
};

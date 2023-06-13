import { IZones, IZone, IHeroState, IHeroItem } from "types/model";

import { ITEM_HEROES_IN_ROW } from "constants/settings";

export const getZone = (data: IZones): string => {
  const arr: IZone[] = Object.values(data);
  let randomItem = "";
  arr.forEach((zone: IZone) => {
    randomItem = zone[Math.floor(Math.random() * Object.keys(zone).length)]?.name;
  });
  return randomItem;
};

export const currentHeroItem = (prevIndex: IHeroState, event: string, heroes: IHeroItem[]) => {
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

  const activeUser = !prevIndex.user1.status ? "user1" : "user2";
  return { ...prevIndex, current, [activeUser]: { ...prevIndex[activeUser], position: current } };
};

export const checkKeyboardLayout = (key: string, code: string) => {
  if (code.startsWith("Key") && /[а-яА-Я]/.test(key)) {
    alert("Please change the keyboard to the Latin character");
  }
};

export const playAudio = (audioElement: HTMLAudioElement | null, action: string) => {
  if (audioElement && action === "play") audioElement.play();
  if (audioElement && action === "pause") audioElement.pause();
};

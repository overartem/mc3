import { IZones, IZone } from "types/model";

export const getZone = (data: IZones): string => {
  const arr: IZone[] = Object.values(data);
  let randomItem = "";
  arr.forEach((zone: IZone) => {
    randomItem = zone[Math.floor(Math.random() * Object.keys(zone).length)]?.name;
  });
  return randomItem;
};
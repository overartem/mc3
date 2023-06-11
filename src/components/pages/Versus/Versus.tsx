import useBodyClass from "hooks/useBodyClass";
import CodesData from "data/kombat-code.json";

import vs from "assets/images/vs.gif";
import battle from "assets/images/battle.gif";
import { ICode, ICodeItem, ICodes } from "types/model";
import { useEffect, useMemo, useRef, useState } from "react";
import { checkKeyboardLayout } from "utils/game";
import { CODE_NAV_KEYS } from "constants/settings";

export default function Versus({ selectedHeroId }: { selectedHeroId: number | null }): JSX.Element {
  const bclass = useBodyClass("versus-page");
  const [currentImages, setCurrentImages] = useState<ICode>({});
  const countCodeIcons = useRef<number>(0);
  const imagePath = `${process.env.PUBLIC_URL}/assets/images`;
  const codesInitData: ICodeItem[] = useMemo(() => {
    const codeItems: ICodes = CodesData;
    return Object.values(codeItems.codes);
  }, []);

  console.log(bclass);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, code } = event;
      checkKeyboardLayout(key, code);
      const keyIsValid = CODE_NAV_KEYS.includes(key.toLowerCase());
      if (keyIsValid) {
        setCurrentImages((prevImages) => {
          return {
            ...prevImages,
            [key]: {
              ...prevImages[key],
              code: prevImages[key].code === countCodeIcons.current ? 0 : Number(prevImages[key].code) + 1,
            },
          };
        });
      }
    };
    getWinResult();

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentImages]);

  useEffect(() => {
    const setCodeState = (data: ICodeItem[]) => {
      countCodeIcons.current = Object.keys(codesInitData).length - 1;
      const result: ICode = {};
      for (let i = 0; i < CODE_NAV_KEYS.length; i++) {
        const key = CODE_NAV_KEYS[i];
        result[key] = data[i];
      }
      setCurrentImages(result);
    };
    if (codesInitData) setCodeState(codesInitData);
  }, [codesInitData]);

  const getWinResult = () => {
    const winCode:string[] = [];
    Object.values(CodesData.wincodes).forEach((element) => {
      winCode.push(element.code);
      // console.log(element.code, "element");
    });
    // console.log(Object.entries(currentImages));
    let total = "";
    Object.entries(currentImages).forEach((element) => {
      total += element[1].code.toString();
      // console.log(element[0], element[1].code);
    });
    console.log(winCode.includes(total), "WINNER");
    console.log(total, "total");
    console.log(winCode, "winCode");
  };
  return (
    <>
      <div className='versus-container relative mx-auto max-w-5xl py-12 flex flex-wrap flex-col items-center justify-between min-h-screen'>
        <img src={battle} alt='battle' className='h-14' />
        <img src={vs} alt='vs logo' className='w-[100px] absolute top-[30%]' />
        <div className='hero-vs flex justify-between w-full overflow-hidden'>
          <div className='pl1 pr-3'>
            <img src={`${imagePath}/versus/${selectedHeroId}.png`} alt='first player' className='max-w-[500px]' />
          </div>
          <div className='pls2 pl-3'>
            <img src={`${imagePath}/versus/${1}.png`} alt='first player' className='max-w-[500px] -scale-x-100' />
          </div>
        </div>
        <div className='kombat-code'>
          <p>Kombat Code</p>
          <ul className='flex justify-center'>
            {Object.entries(currentImages).map(([key, item]: [string, ICodeItem]) => {
              return (
                <li key={item.id} data-code-key={key}>
                  <img src={`${imagePath}/kombat-code/cc${item.code}.jpg`} alt={`${item.name}`} />
                </li>
              );
            })}
          </ul>
          <ul className='flex justify-center'>
            {/*  {codesData.slice(0, 6).map((code) => (
              <li key={code.id}>
                <img src={`${imagePath}/kombat-code/cc${code.id}.jpg`} alt={code.name} />
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    </>
  );
}

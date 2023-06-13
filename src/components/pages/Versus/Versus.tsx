import { useEffect, useMemo, useRef, useState } from "react";
import battle from "assets/images/battle.gif";
import vs from "assets/images/vs.gif";
import AudioBlock from "components/utils/Audio/AudioBlock";
import Surprise from "components/utils/Surprise/Surprise";
import CodesData from "data/kombat-code.json";
import useBodyClass from "hooks/useBodyClass";
import { ICode, ICodeItem, ICodes } from "types/model";
import { checkKeyboardLayout, playAudio } from "utils/game";

import { CODE_NAV_KEYS, MS_TO_CHECK_COMBAT_CODE, WIN_FAIL_CODE, WIN_SUCCESS_CODE } from "constants/settings";

export default function Versus({ selectedHeroesId }: { selectedHeroesId: Record<string, number> }): JSX.Element {
  useBodyClass("versus-page");
  const [currentImages, setCurrentImages] = useState<ICode>({});
  const [winResult, setWinResult] = useState({
    type: "default",
    surprise: "fireworks",
  });
  const currentImagesFresh = useRef(currentImages);
  const countCodeIcons = useRef(0);
  const codesInitData: ICodeItem[] = useMemo(() => {
    const codeItems: ICodes = CodesData;
    return Object.values(codeItems.codes);
  }, []);
  const imagePath = `${process.env.PUBLIC_URL}/assets`;
  let audioElement: HTMLAudioElement | null = null;
  currentImagesFresh.current = currentImages;
  
  useEffect(() => {
    playAudio(audioElement, "play");

    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, code } = event;
      checkKeyboardLayout(key, code);
      const keyIsValid = CODE_NAV_KEYS.includes(key.toLowerCase());

      if (!keyIsValid) {
        return;
      }

      setCurrentImages((prevImages) => {
        const currentCode = Number(prevImages[key]?.code) ?? 0;
        const newCode = currentCode === countCodeIcons.current ? 0 : currentCode + 1;
        return {
          ...prevImages,
          [key]: {
            ...prevImages[key],
            code: newCode,
          },
        };
      });
    };

    const getWinResult = () => {
      const winCodes = Object.values(CodesData.wincodes).map((element) => element.code);
      const total = Object.values(currentImagesFresh.current).reduce((acc, element) => acc + element.code.toString(), "");
      const randomIndex = Math.floor(Math.random() * winCodes.length);
      winCodes.includes(total)
        ? setWinResult({ type: WIN_SUCCESS_CODE, surprise: randomIndex === 1 ? "music" : "fireworks" })
        : setWinResult({ type: WIN_FAIL_CODE, surprise: "" });
    };

    const timeoutId = setTimeout(() => {
      window.removeEventListener("keydown", handleKeyDown);
      getWinResult();
    }, MS_TO_CHECK_COMBAT_CODE);

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, [audioElement]);

  useEffect(() => {
    const setCodeState = (data: ICodeItem[]) => {
      const result: ICode = {};
      for (const [i, key] of CODE_NAV_KEYS.entries()) {
        result[key] = data[i];
      }
      countCodeIcons.current = Object.keys(codesInitData).length - 1;
      setCurrentImages(result);
    };
    if (codesInitData) setCodeState(codesInitData);
  }, [codesInitData]);

  const getAudioElement = (el: HTMLAudioElement | null) => {
    if (!el) {
      console.error("No audio element");
      return;
    }
    audioElement = el;
  };

  return (
    <>
      <div
        className={`versus-container relative mx-auto max-w-5xl py-12 flex flex-wrap flex-col items-center justify-between min-h-screen ${
          winResult.type === WIN_SUCCESS_CODE ? "win-code" : winResult.type === WIN_FAIL_CODE ? "fail-code" : ""
        }`}
      >
        <img src={battle} alt='battle' className='h-14' />
        <img src={vs} alt='vs logo' className='w-[100px] absolute top-[30%]' />
        <div className='hero-vs flex justify-between w-full overflow-hidden'>
          <div className='pl1 pr-3'>
            <img src={`${imagePath}/images/versus/${selectedHeroesId.user1}.png`} alt='first player' className='max-w-[500px]' />
          </div>
          <div className='pls2 pl-3'>
            <img
              src={`${imagePath}/images/versus/${selectedHeroesId.user2}.png`}
              alt='first player'
              className='max-w-[500px] -scale-x-100'
            />
          </div>
        </div>
        <div className='kombat-code'>
          <ul className='flex justify-center'>
            {Object.entries(currentImages).map(([key, item]: [string, ICodeItem]) => {
              return (
                <li key={item.id} data-code-key={key}>
                  <img src={`${imagePath}/images/kombat-code/cc${item.code}.jpg`} alt={`${item.name}`} />
                </li>
              );
            })}
          </ul>
        </div>
        {winResult.type === WIN_SUCCESS_CODE && <Surprise type={winResult.surprise} />}
      </div>
      <AudioBlock audioEl={(el) => getAudioElement(el)} trackName={"versus"} type={winResult.type} />
    </>
  );
}

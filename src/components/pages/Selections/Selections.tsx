import { useEffect, useMemo, useRef, useState } from "react";
import AudioBlock from "components/utils/Audio/AudioBlock";
import Heroes from "data/heroes.json";
import Zones from "data/zones.json";
import useBodyClass from "hooks/useBodyClass";
import { IHeroItem, IHeroState, IHeroes } from "types/model";
import { getZone, currentHeroItem, playAudio } from "utils/game";

export default function Selections({ nextScreenInit }: { nextScreenInit: (e: number) => void }): JSX.Element {
  useBodyClass("select-page");
  const [activeHero, setActiveHero] = useState<IHeroState>({ current: 1 });
  const [lockHero, setLockHero] = useState<boolean>(false);
  const heroes: IHeroItem[] = useMemo(() => {
    const heroData: IHeroes = Heroes;
    return Object.values(heroData.heroes);
  }, []);
  const gameZone = useMemo(() => {
    return getZone(Zones);
  }, []);
  const currentHeroFresh = useRef<number>(activeHero.current);
  const imagePath = `${process.env.PUBLIC_URL}/assets`;
  let audioElement: HTMLAudioElement | null = null;
  currentHeroFresh.current = activeHero.current;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      switch (key) {
        case "ArrowUp":
          selectHero(key);
          break;
        case "ArrowDown":
          selectHero(key);
          break;
        case "ArrowLeft":
          selectHero(key);
          break;
        case "ArrowRight":
          selectHero(key);
          break;
        case "Enter":
          setSelectedHero();
          break;
      }
    };

    const selectHero = (event: string): void => {
      setActiveHero((prevIndex) => currentHeroItem(prevIndex, event, heroes));
      playAudio(audioElement, "play");
    };

    const setSelectedHero = () => {
      window.removeEventListener("keydown", handleKeyDown);
      setLockHero(true);
      nextScreenInit(currentHeroFresh.current);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [audioElement, heroes, nextScreenInit]);

  const getAudioElement = (el: HTMLAudioElement | null) => {
    audioElement = el;
  };

  return (
    <>
      <div className='select-container relative mx-auto max-w-7xl py-12 flex flex-wrap flex-col items-center justify-between min-h-screen'>
        <h1 className='text-6xl uppercase italic tracking-widest text-center'>Select Your Fighter</h1>
        <div className='hero-list-wrapper container'>
          <ul className='hero-list grid grid-cols-5 gap-1'>
            {heroes.map((hero, index) => (
              <li
                key={hero.id}
                data-hero-id={hero.id}
                className={`${activeHero.current === index + 1 ? "active" : ""} ${
                  lockHero && activeHero.current === index + 1 ? "locked" : ""
                }`}
              >
                <img src={`${imagePath}/images/heroes/${hero.id}.jpg`} alt={`Hero ${hero.name}`} />
              </li>
            ))}
          </ul>
        </div>
        <div className='hero-selection absolute bottom-[10%] w-full flex justify-between items-end'>
          <div className='hero-one'>
            <img src={`${imagePath}/images/animations/${activeHero.current}.gif`} alt='first player' className='h-[450px]' />
          </div>
          {/* <div className='hero-two'>
            <img
              src={`${imagePath}/images/animations/${activeHero.current}.gif`}
              alt='Second player'
              className='h-[450px] -scale-x-100'
            />
          </div> */}
        </div>
        <h2 className='text-4xl uppercase italic text-center'>{`Kombat Zone: ${gameZone}`}</h2>
      </div>
      <AudioBlock audioEl={(el) => getAudioElement(el)} trackName={"selections"} type='default' />
    </>
  );
}

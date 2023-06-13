import { useEffect, useMemo, useRef, useState } from "react";
import AudioBlock from "components/utils/Audio/AudioBlock";
import Heroes from "data/heroes.json";
import Zones from "data/zones.json";
import useBodyClass from "hooks/useBodyClass";
import { IHeroItem, IHeroState, IHeroes } from "types/model";
import { getZone, currentHeroItem, playAudio } from "utils/game";

export default function Selections({ nextScreenInit }: { nextScreenInit: (e: Record<string, number>) => void }): JSX.Element {
  useBodyClass("select-page");
  const [activeHero, setActiveHero] = useState<IHeroState>({
    current: 1,
    user1: { position: 1, status: false },
    user2: { position: 1, status: false },
  });
  const [lockHero, setLockHero] = useState<boolean>(false);
  const heroes: IHeroItem[] = useMemo(() => {
    const heroData: IHeroes = Heroes;
    return Object.values(heroData.heroes);
  }, []);
  const gameZone = useMemo(() => {
    return getZone(Zones);
  }, []);
  const currentHeroFresh = useRef<IHeroState>(activeHero);
  const imagePath = `${process.env.PUBLIC_URL}/assets`;
  let audioElement: HTMLAudioElement | null = null;

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
      setActiveHero((prevIndex) => {
        const activeHeroData = currentHeroItem(prevIndex, event, heroes);
        currentHeroFresh.current = activeHeroData;
        return activeHeroData;
      });

      playAudio(audioElement, "play");
    };

    const setSelectedHero = () => {
      setLockHero(true);
      const activeUser = !currentHeroFresh.current.user1.status ? "user1" : "user2";
      setActiveHero((prevIndex) => {
        const currentUsersData = {
          ...prevIndex,
          current: 1,
          [activeUser]: { ...prevIndex[activeUser], position: currentHeroFresh.current[activeUser].position, status: true },
        };
        currentHeroFresh.current = currentUsersData;
        return currentUsersData;
      });

      if (currentHeroFresh.current.user1.status && activeUser === "user2") {
        window.removeEventListener("keydown", handleKeyDown);
        nextScreenInit({ user1: currentHeroFresh.current.user1.position, user2: currentHeroFresh.current.user2.position });
      }
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
                className={`${activeHero.current === index + 1 && !activeHero.user1.status ? "active user1" : ""}
                ${activeHero.current === index + 1 && activeHero.user1.status && !activeHero.user2.status ? "active user2" : ""}
                ${lockHero && activeHero.user1.status && activeHero.user1.position === index + 1 ? "locked user1" : ""}
                ${lockHero && activeHero.user2.status && activeHero.user2.position === index + 1 ? "locked user2" : ""}`}
              >
                <img src={`${imagePath}/images/heroes/${hero.id}.jpg`} alt={`Hero ${hero.name}`} />
              </li>
            ))}
          </ul>
        </div>
        <div className='hero-selection absolute bottom-[10%] w-full flex justify-between items-end'>
          {activeHero.user1.position && (
            <div className='hero-one'>
              <img
                src={`${imagePath}/images/animations/${activeHero.user1.position}.gif`}
                alt='first player'
                className='h-[450px]'
              />
            </div>
          )}
          {activeHero.user2.position && activeHero.user1.status && (
            <div className='hero-two'>
              <img
                src={`${imagePath}/images/animations/${activeHero.user2.position}.gif`}
                alt='Second player'
                className='h-[450px] -scale-x-100'
              />
            </div>
          )}
        </div>
        <h2 className='text-4xl uppercase italic text-center'>{`Kombat Zone: ${gameZone}`}</h2>
      </div>
      <AudioBlock audioEl={(el) => getAudioElement(el)} trackName={"selections"} type='default' />
    </>
  );
}

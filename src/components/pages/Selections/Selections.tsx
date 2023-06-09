import { useEffect } from "react";
import useBodyClass from "hooks/useBodyClass";
import Heroes from "data/heroes.json";
import { IHeroes } from "types/model";

export default function Selections() {
  useBodyClass("select-page");
  const heroData: IHeroes = Heroes;
  const imagePath = `${process.env.PUBLIC_URL}/images/heroes/`;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const { key } = event;
      switch (key) {
        case "ArrowUp":
          console.log("ArrowUp");
          break;
        case "ArrowDown":
          console.log("ArrowDown");
          break;
        case "ArrowLeft":
          console.log("ArrowLeft");
          break;
        case "ArrowRight":
          console.log("ArrowRight");
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <div className='select-container relative mx-auto max-w-7xl py-12 flex flex-wrap flex-col items-center justify-between min-h-screen'>
        <h1 className='text-6xl uppercase italic tracking-widest text-center'>Select Your Fighter</h1>
        <div className='hero-list-wrapper container'>
          <ul className='hero-list grid grid-cols-5 gap-1'>
            {Object.values(heroData.heroes).map((hero) => (
              <li key={hero.id}>
                {/* eslint-disable-next-line @typescript-eslint/no-var-requires*/}
                <img src={`${imagePath}${hero.id}.jpg`} alt={`Hero ${hero.name}`} />
              </li>
            ))}
          </ul>
        </div>
        <div className='hero-selection absolute bottom-[10%] w-full flex justify-between items-end'>
          <div className='hero-one'>{/* <img src={heroOne} alt='first player' className='h-[450px]' /> */}</div>
          <div className='hero-two'>{/* <img src={heroTwo} alt='first player' className='h-[450px] -scale-x-100' /> */}</div>
        </div>
        <h2 className='text-4xl uppercase italic text-center'>{`Kombat zone: ${"The Bridge"}`}</h2>
      </div>
    </>
  );
}

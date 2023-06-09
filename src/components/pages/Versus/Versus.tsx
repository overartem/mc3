import useBodyClass from "hooks/useBodyClass";

import kombat from "assets/images/kombat-code/cc1.jpg";
import hero1vs from "assets/images/versus/1.png";
import hero2vs from "assets/images/versus/2.png";
import vs from "assets/images/vs.gif";
import battle from "assets/images/battle.gif";

export default function Versus() {
  useBodyClass("versus-page");

  return (
    <>
      <div className='hidden versus-container relative mx-auto max-w-5xl py-12 flex flex-wrap flex-col items-center justify-between min-h-screen'>
        <img src={battle} alt='battle' className='h-14' />
        <img src={vs} alt='vs logo' className='w-[100px] absolute top-[30%]' />
        <div className='hero-vs flex justify-between w-full overflow-hidden'>
          <div className='pl1 pr-3'>
            <img src={hero1vs} alt='first player' className='max-w-[500px]' />
          </div>
          <div className='pls2 pl-3'>
            <img src={hero2vs} alt='first player' className='max-w-[500px] -scale-x-100' />
          </div>
        </div>
        <div className='kombat-code'>
          <ul className='flex justify-center'>
            <li>
              <img src={kombat} alt='code 1' />
            </li>
            <li>
              <img src={kombat} alt='code 2' />
            </li>
            <li>
              <img src={kombat} alt='code 3' />
            </li>
            <li>
              <img src={kombat} alt='code 4' />
            </li>
            <li>
              <img src={kombat} alt='code 5' />
            </li>
            <li>
              <img src={kombat} alt='code 6' />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

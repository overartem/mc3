import { useEffect, useRef, useState } from "react";
import Selections from "../Selections/Selections";
import Versus from "../Versus/Versus";

function ScreenLayout(): JSX.Element {
  const [isActiveScreen, setIsActiveScreen] = useState<boolean>(false);
  const selectedHeroId = useRef<number | null>(null);
  useEffect(() => {
    /*   const timer = setTimeout(() => {
      setIsActiveScreen(false);
      console.log("Таймаут завершився");
    }, 2000); */

    return () => {
      // clearTimeout(timer);
    };
  }, []);

  const goNextScreen = (obj: Record<string, number>) => {
    setTimeout(() => {
      selectedHeroId.current = obj?.idActiveHero;
      setIsActiveScreen(true);
    }, 2000);
  };

  return (
    <>
      {console.log("rerender ScreenLayout")}
      {isActiveScreen ? (
        <Versus selectedHeroId={selectedHeroId.current} />
      ) : (
        <Selections
          nextScreenInit={(obj) => {
            goNextScreen(obj);
          }}
        />
      )}
    </>
  );
}

export default ScreenLayout;

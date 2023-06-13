import { useRef, useState } from "react";

import Selections from "../Selections/Selections";
import Versus from "../Versus/Versus";

import { MS_FOR_CHANGE_SCREEN } from "constants/settings";

function ScreenLayout(): JSX.Element {
  const [isActiveScreen, setIsActiveScreen] = useState<boolean>(false);
  const selectedHeroesId = useRef<Record<string, number>>({});

  const goNextScreen = (obj: Record<string, number>) => {
    if (!obj) {
      console.error("Next ScreenInit id is null or undefined");
      return;
    }
    selectedHeroesId.current = obj;

    setTimeout(() => {
      setIsActiveScreen(true);
    }, MS_FOR_CHANGE_SCREEN);
  };

  return (
    <>
      {isActiveScreen ? (
        <Versus selectedHeroesId={selectedHeroesId.current} />
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

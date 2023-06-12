import { useRef, useState } from "react";

import Selections from "../Selections/Selections";
import Versus from "../Versus/Versus";

import { MS_FOR_CHANGE_SCREEN } from "constants/settings";

function ScreenLayout(): JSX.Element {
  const [isActiveScreen, setIsActiveScreen] = useState<boolean>(false);
  const selectedHeroId = useRef<number>(0);

  const goNextScreen = (obj: number) => {
    if (!obj) {
      console.error("Next ScreenInit id is null or undefined");
      return;
    }
    selectedHeroId.current = obj;

    setTimeout(() => {
      setIsActiveScreen(true);
    }, MS_FOR_CHANGE_SCREEN);
  };

  return (
    <>
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

import { useState } from "react";
import Selections from "../Selections/Selections";
import Versus from "../Versus/Versus";

function ScreenLayout(): JSX.Element {
  const [isActiveScreen, setIsActiveScreen] = useState<boolean>(false);

  return (
    <>
      {isActiveScreen ? (
        <Versus />
      ) : (
        <Selections
          activeScreenSet={(e) => {
            setIsActiveScreen(e);
          }}
        />
      )}
    </>
  );
}

export default ScreenLayout;

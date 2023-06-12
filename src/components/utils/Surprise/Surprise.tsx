import { playAudio } from "utils/game";

import AudioBlock from "../Audio/AudioBlock";

function Surprise({ winResult, type }: { winResult: string; type: string }): JSX.Element {
  let audioElement: HTMLAudioElement | null = null;
  let surprise = "fireworks";

  const getAudioElement = (el: HTMLAudioElement | null) => {
    if (!el) {
      console.error("No audio element for Surprise");
      return;
    }
    audioElement = el;
  };
  if (type === "music") {
    surprise = type;
    playAudio(audioElement, "play");
  }
  return (
    <>
      {surprise === "fireworks" ? (
        <div className={`pyro ${winResult === "win" ? "block" : "hidden"}`}>
          <div className='before'></div>
          <div className='after'></div>
        </div>
      ) : surprise === "music" ? (
        <AudioBlock audioEl={(el: HTMLAudioElement | null) => getAudioElement(el)} trackName={"winner"} type='default' />
      ) : null}
    </>
  );
}

export default Surprise;

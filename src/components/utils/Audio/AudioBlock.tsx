import { useEffect } from "react";

function AudioBlock({
  audioEl,
  trackName,
  type = "default",
}: {
  audioEl: (el: HTMLAudioElement | null) => void;
  trackName: string;
  type: string;
}): JSX.Element {
  const imagePath = `${process.env.PUBLIC_URL}/assets`;
  let audioElement: HTMLAudioElement | null = null;
  let loop = true;
  useEffect(() => {
    audioEl(audioElement);
  }, [audioEl, audioElement]);

   useEffect(() => {
     if (type === "fail") {
     trackName = "fail";
     loop = false;
  }
  }, [trackName, type]);

  return (
    <>
      <audio
        ref={(audio) => {
          if (audio) audioElement = audio;
        }}
        src={`${imagePath}/sounds/${trackName}.mp3`}
        autoPlay
        loop={loop}
      >
        Your browser does not support the audio element.
      </audio>
    </>
  );
}

export default AudioBlock;

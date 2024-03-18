"use client";

import React from "react";
import { silence } from "./lib/contants";

type NowPlayingContext = any;

// type NowPlayingContext = {
//   nowPlaying: Blob | undefined;
//   setNowPlaying: React.Dispatch<React.SetStateAction<Blob | undefined>>;
//   clear: () => void;
//   player: HTMLAudioElement;
// };

interface NowPlayingContextInterface {
  children: React.ReactNode;
  onPlay?: Function;
  onFinish?: Function;
}

const NowPlayingContext = React.createContext({} as NowPlayingContext);

const NowPlayingContextProvider = ({
  children,
  onPlay = () => {},
  onFinish = () => {},
}: NowPlayingContextInterface) => {
  const [player, setPlayer] = React.useState<HTMLAudioElement>();
  const [source, setSource] = React.useState<HTMLSourceElement>();
  const [type, setType] = React.useState<string>();
  const [nowPlaying, setNowPlaying] = React.useState<Blob>();

  React.useEffect(() => {
    if (!player) {
      const player: HTMLAudioElement = document.getElementById(
        "react-nowplaying"
      ) as HTMLAudioElement;
      const source: HTMLSourceElement = document.getElementById(
        "react-nowplaying-src"
      ) as HTMLSourceElement;

      setPlayer(player);
      setSource(source);
    }
  }, []);

  React.useEffect(() => {
    if (!player || !source) return;

    if (nowPlaying) {
      const data = window.URL.createObjectURL(nowPlaying);
      source.src = data;
      source.type = type || "audio/mp3";

      /**
       * Required to make iOS devices load the audio from the blob URL.
       */
      player.load();

      player.addEventListener("canplaythrough", function () {
        this.play();
        // onPlay();
      });

      player.addEventListener("ended", () => {
        setNowPlaying(undefined);
        // onFinish();
      });
    }
  }, [nowPlaying, player, source]);

  const play = (audio: Blob, type = "audio/mp3") => {
    if (!player || !source) return;

    setNowPlaying(audio);
    setType(type);
  };

  const stop = () => {
    if (!player || !source) return;

    player.pause();
    player.currentTime = 0;
    setNowPlaying(undefined);
  };

  const pause = () => {
    if (!player || !source) return;

    player.pause();
  };

  const resume = () => {
    if (!player || !source) return;

    player.play();
  };

  return (
    <NowPlayingContext.Provider
      value={{
        player,
        play,
        pause,
        resume,
        stop,
      }}
    >
      {children}
      <audio id="react-nowplaying">
        <source id="react-nowplaying-src" src={silence} type={type} />
      </audio>
    </NowPlayingContext.Provider>
  );
};

function useNowPlaying() {
  return React.useContext(NowPlayingContext);
}

export { NowPlayingContextProvider, useNowPlaying };

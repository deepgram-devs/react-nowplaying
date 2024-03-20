"use client";

import React from "react";
import { silence } from "./lib/contants";

interface NowPlayingContext extends Partial<Omit<HTMLAudioElement, "play">> {
  player: HTMLAudioElement | undefined;
  play: (audio: MediaSource | Blob | string, type: string) => Promise<void>;
  resume: Function;
  stop: Function;
}

interface NowPlayingContextInterface {
  children: React.ReactNode;
}

const NowPlayingContext = React.createContext({} as NowPlayingContext);

const NowPlayingContextProvider = ({
  children,
}: NowPlayingContextInterface) => {
  const [player, setPlayer] = React.useState<HTMLAudioElement>();
  const [source, setSource] = React.useState<HTMLSourceElement>();

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

  const play = async (
    audio: MediaSource | Blob | string,
    type = "audio/mp3"
  ): Promise<void> => {
    if (!player || !source) return;

    let url = audio as string;

    if (typeof audio !== "string") {
      url = window.URL.createObjectURL(audio);
    }

    source.src = url;
    source.type = type;

    /**
     * Required to make iOS devices load the audio from the blob URL.
     */
    player.load();

    return player.play();
  };

  const stop = () => {
    if (!player) return;

    player.pause();
    player.currentTime = 0;
  };

  const resume = () => {
    if (!player) return;

    player.play();
  };

  return (
    <NowPlayingContext.Provider
      value={{
        player,
        play,
        resume,
        stop,
        ...player,
      }}
    >
      {children}
      <audio id="react-nowplaying">
        <source id="react-nowplaying-src" src={silence} type={"audio/mp3"} />
      </audio>
    </NowPlayingContext.Provider>
  );
};

function useNowPlaying() {
  return React.useContext(NowPlayingContext);
}

export { NowPlayingContextProvider, useNowPlaying };

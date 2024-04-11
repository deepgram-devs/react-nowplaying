"use client";

import React from "react";
import { silence } from "./lib/contants";

/**
 * React context for managing audio playback, including playing, stopping, and resuming audio tracks.
 * This context provides a way to control audio playback and track the current playing audio.
 */
interface NowPlayingContext extends Partial<Omit<HTMLAudioElement, "play">> {
  /**
   * The HTMLAudioElement being used for playback.
   */
  player: HTMLAudioElement | undefined;

  /**
   * Plays the given audio. If the audio is not a string, it will be converted to a blob URL.
   * @param audio The audio source to play. Can be a MediaSource, Blob, or a string URL.
   * @param type The MIME type of the audio. Defaults to "audio/mp3".
   * @param uid An optional unique identifier for the audio source.
   * @returns A promise that resolves when the audio starts playing.
   */
  play: (audio: MediaSource | Blob | string, type?: string, uid?: string) => Promise<void>;

  /**
   * Resumes audio playback from the current position.
   */
  resume: () => void;

  /**
   * Stops the audio playback and resets the player's currentTime to 0.
   */
  stop: () => void;

  /**
   * An optional unique identifier for the currently playing audio source.
   */
  uid: string | undefined;
}

/**
 * Props for the NowPlayingContextProvider component, including children React nodes.
 */
interface NowPlayingContextInterface {
  children: React.ReactNode;
}

const NowPlayingContext = React.createContext({} as NowPlayingContext);

/**
 * Provides a React context for managing audio playback within the app.
 * This component sets up the audio player and source elements, and provides play, stop, and resume functions.
 */
const NowPlayingContextProvider = ({ children }: NowPlayingContextInterface) => {
  const [player, setPlayer] = React.useState<HTMLAudioElement>();
  const [source, setSource] = React.useState<HTMLSourceElement>();
  const [uid, setUid] = React.useState<string>();
  React.useEffect(() => {
    console.log(uid);
  }, [uid]);

  React.useEffect(() => {
    const onEnded = () => {
      setUid(undefined);
    };

    if (!player) {
      const player: HTMLAudioElement = document.getElementById(
        "react-nowplaying"
      ) as HTMLAudioElement;
      const source: HTMLSourceElement = document.getElementById(
        "react-nowplaying-src"
      ) as HTMLSourceElement;

      player.addEventListener("ended", onEnded);

      setPlayer(player);
      setSource(source);
    }

    return () => {
      player?.removeEventListener("ended", onEnded);
    };
  }, []);

  const play = async (
    audio: MediaSource | Blob | string,
    type = "audio/mp3",
    uid?: string
  ): Promise<void> => {
    if (!player || !source) return;
    if (uid) setUid(uid);

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

    setUid(undefined);
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
        uid,
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

/**
 * Custom hook to access the NowPlaying context.
 * @returns The NowPlayingContext with audio playback control functions.
 */
function useNowPlaying() {
  return React.useContext(NowPlayingContext);
}

export { NowPlayingContextProvider, useNowPlaying };

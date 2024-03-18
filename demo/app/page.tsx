"use client";

import { useNowPlaying } from "react-nowplaying";

export default function Home() {
  const { play } = useNowPlaying();

  const playAudio = () => {
    fetch("test.mp3")
      .then((response) => response.blob())
      .then((blob) => {
        play(blob, "audio/mp3");
      })
      .catch((error) => console.error("Error fetching the audio:", error));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <button type="button" onClick={() => playAudio()}>
        Play Audio
      </button>
    </main>
  );
}

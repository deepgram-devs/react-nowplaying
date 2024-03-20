"use client";

import Image from "next/image";
import { useNowPlaying } from "react-nowplaying";

export default function Home() {
  const { play } = useNowPlaying();

  const playBlobAudio = () => {
    fetch("test.mp3")
      .then((response) => response.blob())
      .then((blob) => {
        play(blob, "audio/mp3");
      })
      .catch((error) => console.error("Error fetching the audio:", error));
  };

  const playUrlAudio = () => {
    play("/test.mp3", "audio/mp3");
  };

  return (
    <>
      <div className="h-full overflow-hidden">
        {/* height 4rem */}
        <div className="bg-gradient-to-b from-black/50 to-black/10 backdrop-blur-[2px] h-[4rem] flex items-center">
          <header className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 flex items-center justify-between">
            <div>
              <a className="flex items-center" href="https://deepgram.com">
                <Image
                  className="w-auto h-8 max-w-[12.5rem] sm:max-w-none"
                  src="/deepgram.svg"
                  alt="Deepgram Logo"
                  width={0}
                  height={0}
                  priority
                />
              </a>
            </div>
          </header>
        </div>

        {/* height 100% minus 4rem */}
        <main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 h-[calc(100%-4rem)] flex justify-center items-center gap-x-8">
          <span className="gradient-shadow bg-gradient-to-r to-[#13EF93]/50 from-[#149AFB]/80 rounded-lg">
            <button
              type="button"
              className="hidden md:inline-block bg-black text-white rounded-lg m-px px-8 py-2 font-semibold"
              onClick={() => playBlobAudio()}
            >
              Play Blob of Audio
            </button>
          </span>
          <span className="gradient-shadow bg-gradient-to-r to-[#13EF93]/50 from-[#149AFB]/80 rounded-lg">
            <button
              type="button"
              className="hidden md:inline-block bg-black text-white rounded-lg m-px px-8 py-2 font-semibold"
              onClick={() => playUrlAudio()}
            >
              Play URL of Audio
            </button>
          </span>
        </main>
      </div>
    </>
  );
}

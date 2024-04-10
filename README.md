# React NowPlaying

![NPM Version](https://img.shields.io/npm/v/react-nowplaying)
[![Discord](https://dcbadge.vercel.app/api/server/xWRaCDBtW4?style=flat)](https://discord.gg/xWRaCDBtW4)

A cross-browser cross-device friendly React context to auto-play audio in a browser.

## Demo

See it in action here: [https://react-nowplaying.vercel.app](https://react-nowplaying.vercel.app/?utm_source=readme.md)

## Getting Started

### Installation

```bash
npm i react-nowplaying
```

### Add to your project

Import the React context provider;

```tsx
import { NowPlayingContextProvider } from "react-nowplaying";
```

And, just as any custom context provider, wrap the part of your app you need to be context aware in the custom provider's tags.

```tsx
// layout.tsx

//...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NowPlayingContextProvider>{children}</NowPlayingContextProvider> // e.g. custom provider tags wrap entire body of app
      </body>
    </html>
  );
}
```

### Play Blob data

Now, you can provide your data `Blob` to the play function.

```tsx
export default function MyComponent() {
  const { play } = useNowPlaying();

  const playAudio = () => {
    // get your audio blob
    play(blob, "audio/mp3");
  };

  return (
    <button type="button" onClick={() => playAudio()}>
      Play Audio
    </button>
  );
}
```

### Play a URL string

Now, you can provide your url `string` to the play function.

```tsx
export default function MyComponent() {
  const { play } = useNowPlaying();

  const playAudio = () => {
    // get your audio blob
    play("https://your-file.com/audio.mp3", "audio/mp3");
  };

  return (
    <button type="button" onClick={() => playAudio()}>
      Play Audio
    </button>
  );
}
```

## Audio Controls

Using our context's hook, we return native controls from the `<audio>` native, with the exception of `play()`. If you `pause()` your audio, you can now use `resume()`.

The `player` property is also available from the hook, which is a native reference to our `<audio>` tag, giving you the ability to add your own event listeners and control it as you need to.

```ts
export default function MyComponent() {
  const { pause, resume } = useNowPlaying();

  //... build your controls
}
```

## How It Works

In our recent project, we faced challenges with automatically playing audio across different browsers and devices, including Safari, Firefox, and all iOS devices. Our solution involved complex adjustments to enable automatic playback of audio files (in Blob format) received from our API. Instead of utilizing the Web Audio API, we opted for a workaround that involves a hidden audio element on the webpage. Here’s how it works:

- When audio is ready to play, the webpage updates a hidden audio element with the audio source and type, allowing the audio to play automatically.
- We created a custom hook that exposes an instance of the audio element, making it easier to manage playback. The hook extends the interface of an audio element.

This approach allows for seamless audio playback across a wide range of browsers and devices, ensuring users have a consistent experience.

## Getting Help

We love to hear from you so if you have questions, comments or find a bug in the project, let us know! You can either:

- [Open an issue in this repository](https://github.com/deepgram-devs/react-nowplaying/issues)
- [Join the Deepgram Github Discussions Community](https://github.com/orgs/deepgram/discussions)
- [Join the Deepgram Discord Community](https://discord.gg/xWRaCDBtW4)

## Author

[Deepgram](https://deepgram.com)

## Known Issues

For a list of known issues and potential bugs, please visit our [Issues](https://github.com/deepgram-devs/react-nowplaying/issues) page. We regularly update this section as new issues are discovered and resolved.

## Collaborating

We welcome contributions from the community. For instructions on how to get involved, please read our [Collaborating Guide](CONTRIBUTING.md).

## Code of Conduct

To ensure a welcoming and safe environment for all contributors, we adhere to a Code of Conduct. All participants in our project are expected to read and follow our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to making participation in this project a harassment-free experience for everyone.

## Changelog

Stay updated with the changes and improvements made to our project by checking out our [Changelog](CHANGELOG.md). This document includes a detailed list of changes, including new features, bug fixes, and other important updates.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

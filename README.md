<a href=""><img src="https://github.com/bfollington/use-spritesheet/blob/main/banner.png?raw=true" /></a>
<br />

[![Version](https://img.shields.io/npm/v/use-spritesheet?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/use-spritesheet)
[![Twitter](https://img.shields.io/twitter/follow/vivavolt?label=%40vivavolt&style=flat&colorA=000000&colorB=000000&logo=twitter&logoColor=000000)](https://twitter.com/vivavolt)
[![ETH](https://img.shields.io/badge/ETH-f5f5f5?style=flat&colorA=000000&colorB=000000)](https://blockchain.com/eth/address/0x981e493b795A7a28c43Bf8d7a8E125C419435Fa7)
![Language](https://img.shields.io/github/languages/top/bfollington/use-spritesheet?style=flat&colorA=000000&colorB=000000)
![License](https://img.shields.io/github/license/bfollington/use-spritesheet?style=flat&colorA=000000&colorB=000000)
![Bundle Size](https://img.shields.io/bundlephobia/min/use-spritesheet?style=flat&colorA=000000&colorB=000000)
[![Build](https://github.com/bfollington/use-spritesheet/workflows/Build/badge.svg)](https://github.com/bfollington/use-spritesheet/actions?query=workflow%3A%22Build%22)

<p><strong>use-spritesheet</strong> is a set of hooks to use pixel art, spritesheets and   <a href="https://www.aseprite.org/">Aseprite</a> with <a href="https://github.com/pmndrs/react-three-fiber">react-three-fiber</a> in just a few lines of code.</p>
  
<p><a href="https://use-spritesheet.vercel.app/">👁 &nbsp;Live Demo</a> (source in <a href="https://github.com/bfollington/use-spritesheet/tree/main/example"><code>example</code></a>)</p>

# Installation
```
npm i use-spritesheet
```

```
yarn add use-spritesheet
```

# API

# `usePixelTexture`

A small time-saver if you want crisp pixels on a texture, sets the texture filter to nearest-neighbour and (optionally) enables wrapping.

```tsx
import frogSrc from './resources/frog.png';

const PixelTexture = () => {
  const tex = usePixelTexture(frogSrc);

  return (
    <sprite>
      <spriteMaterial transparent map={tex} />
    </sprite>
  );
};
```

# `useSpritesheet`

Perfect for when you have a spritesheet and want to slice out a single frame to display statically (such as an icon from a icon set).

```tsx
import smileySrc from './resources/smiley_idle.png';

const SpritesheetSingleFrame = () => {
  // 1 row
  // 8 columns
  // display frame index 2
  const tex = useSpritesheet(smileySrc, 1, 8, 2);

  return (
    <sprite>
      <spriteMaterial transparent map={tex} />
    </sprite>
  );
};
```

# `useSpritesheetAnimation`

Play a series of frames that are baked into a single texture, ideal for particle effects.

```tsx
import impSrc from './resources/impo.png';

const SpritesheetAnimation = ({ paused }: { paused: boolean }) => {
  // 100ms per frame
  // 2 rows
  // 4 columns
  const [tex] = useSpritesheetAnimation(impSrc, 100, 2, 4, paused);

  return (
    <sprite>
      <spriteMaterial transparent map={tex} />
    </sprite>
  );
};
```

# `useAsepriteAnimation`

Import a texture + `json` file exported from [Aseprite](https://www.aseprite.org/), select which animation to play and control playback speed.

```tsx
import gremlin from "./resources/bomber.png";
import gremlinJson from "./resources/bomber.json";

export const AsepriteAnimation = ({
  animation = "idle",
  paused,
}: any) => {
  const [texture] = useAseprite(
    gremlin,
    gremlinJson as AsepriteJson,
    animation, // Changing this parameter automatically switches animations
    paused
  );

  return (
    <sprite>
      <spriteMaterial transparent map={texture} />
    </sprite>
  );
};

```

## Running this repo

We make use of `yarn` [workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to develop the example alongside the library itself.

### Bootstrap

```
yarn
```

### Running the examples

```
cd use-spritesheet
yarn build
cd ../example
yarn start
```

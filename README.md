<a href=""><img src="https://github.com/bfollington/use-spritesheet/blob/main/banner.png?raw=true" /></a>
<br />

[![Version](https://img.shields.io/npm/v/use-spritesheet?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/use-spritesheet)
[![Twitter](https://img.shields.io/twitter/follow/vivavolt?label=%40vivavolt&style=flat&colorA=000000&colorB=000000&logo=twitter&logoColor=000000)](https://twitter.com/vivavolt)
[![ETH](https://img.shields.io/badge/ETH-f5f5f5?style=flat&colorA=000000&colorB=000000)](https://blockchain.com/eth/address/0x981e493b795A7a28c43Bf8d7a8E125C419435Fa7)
![Language](https://img.shields.io/github/languages/top/bfollington/use-spritesheet?style=flat&colorA=000000&colorB=000000)
![License](https://img.shields.io/github/license/bfollington/use-spritesheet?style=flat&colorA=000000&colorB=000000)
![Bundle Size](https://img.shields.io/bundlephobia/min/use-spritesheet?style=flat&colorA=000000&colorB=000000)
[![Build](https://github.com/bfollington/use-spritesheet/workflows/Build/badge.svg)](https://github.com/bfollington/use-spritesheet/actions?query=workflow%3A%22Build%22)

<p><strong>use-spritesheet</strong> is an elegant, typesafe input management system for React supporting keyboard, mouse and gamepad (soon).</p>
  
<p><a href="https://use-spritesheet.vercel.app/">👁 &nbsp;Live Demo</a> (source in <a href="https://github.com/bfollington/use-spritesheet/tree/main/packages/example"><code>packages/example</code></a>)</p>

# Installation
```
npm i use-spritesheet
```

```
yarn add use-spritesheet
```

# Example

First, we set up an `input mapping`. Inputs come in two flavours:
- `buttons`: discrete inputs like keyboard presses, mouse clicks and gamepad buttons
- `axes`: continuous inputs like mouse position, gamepad joysticks and triggers

```tsx
const inputMap = {
  buttons: {
    left: [
      keycode(KEYS.left_arrow),
      mouseButton('left'),
      gamepadButton(0, GAMEPADS.XBOX_ONE.D_LEFT),
    ],
    right: [
      keycode(KEYS.right_arrow),
      mouseButton('right'),
      gamepadButton(0, GAMEPADS.XBOX_ONE.D_RIGHT),
    ],
  },
  axes: {
    x: [mouseAxis('x'), gamepadAxis(0, GAMEPADS.XBOX_ONE.STICK_R_X)],
    y: [mouseAxis('y'), gamepadAxis(0, GAMEPADS.XBOX_ONE.STICK_R_Y)],
  },
}
```

Then we can wire up our input listeners within a component using [various hooks](#api-overview).

```tsx
const MyComponent = () => {
  const [count, setCount] = useState(0)

  useButtonPressed(inputMap, "left", () => {
    setCount(count - 1)
  })

  useButtonPressed(inputMap, "right", () => {
    setCount(count + 1)
  })

  useAxis(inputMap, "x", v => {
    console.log("x-axis", v)
  })

  return <div>{count}</div>
}
```

Check out the <a href="https://github.com/bfollington/use-control/tree/main/packages/example">full example</a> for more details. 

**Note: if you want to use gamepad as an input source you need to call `gamepadInit()` in the entry point of your app to set up the listeners**

# API Overview

## Bootstrap

If you want to use gamepad input you'll need to attach the listeners when your app starts up, this probably means you want to call `gamepadInit` once in `index.js` or `App.js` but you can turn the feature on and off at your leisure.

- `gamepadInit()`
- `gamepadTeardown()`

## Hooks

- `useButtonPressed(inputMap, actionName, callback)`
- `useButtonReleased(inputMap, actionName, callback)`
- `useButtonHeld(inputMap, actionName, throttleInterval, callback)`
- `useAxis(inputMap, axisName, callback)`

## Input Sources

These functions can be use to construct bindings for input maps:

- `mouseButton('left' | 'right' | 'middle')`
- `mouseAxis('x' | 'y')`
- `keycode(code)`
- `gamepadButton(controllerIndex, buttonIndex)`
- `gamepadAxis(controllerIndex, buttonIndex)`

### Primitive Hooks

If you need to dig down and specifically target one form of input it _might_ be more useful to pick from this list:

`import { useKeyDown, useKeyUp, useKeyHeld } from 'use-control/lib/input/keyboard'`

- `useKeyDown(keyCode, callback)`
- `useKeyUp(keyCode, callback)`
- `useKeyHeld(keyCode, callback)`

`import { useMouseMove, useMouseMoveNormalised, useMouseDelta } from 'use-control/lib/input/keyboard'`

- `useMouseMove(callback)`
- `useMouseMoveNormalised(callback)`
- `useMouseDelta(callback)`
 
`import { useGamepadButtonPressed, useGamepadAxis } from 'use-control/lib/input/keyboard'`

- `useGamepadButtonPressed(controllerIndex, buttonIndex, callback)`
- `useGamepadAxis(controllerIndex, axisIndex, callback)`

## Roadmap

- Virtual joystick support
- Accelerometer input support
- Controller button mappings for
  - PS4
  - Xbox 360
  - Xbox One
  - (and any others contributed)

# Why use-control?

Personally, I'm just tired of writing `useEffect` with `document.addEventListener('keydown', ...)`.

`use-control` is the API I've always dreamed of for dealing with input events, it's heavily inspired by my experience with input systems in game development. It's a tiny, batteries-included library for focusing on the actual user interactions rather than boilerplate and ochestration.

# Usage 

`use-control` relies on the core concept of an `Input Mapping` of keycodes, mouse buttons and gamepad buttons into `Input Actions` (i.e. "left", "right", "jump", "select"), declared as a JS object:

```ts
const inputMap = {
  buttons: {
    left: [
      keycode(KEYS.left_arrow),
      gamepadButton(0, GAMEPADS.XBOX_ONE.D_LEFT),
    ],
    right: [
      keycode(KEYS.right_arrow),
      gamepadButton(0, GAMEPADS.XBOX_ONE.D_RIGHT),
    ],
    jump: [
      keycode(KEYS.space)
    ]
  },
  axes: {
    x: [mouseAxis('x'), gamepadAxis(0, GAMEPADS.XBOX_ONE.STICK_R_X)],
    y: [mouseAxis('y'), gamepadAxis(0, GAMEPADS.XBOX_ONE.STICK_R_Y)],
  },
}
```

You _should_ consider declaring this statically and sharing the mapping across your app but it can be dynamically updated at runtime and different mappings can be used in different components as needed.

These mappings allow us to think at a higher level when consuming input, instead of asking "what events do I need to bind to?" or "what keycode am I listening for?" we can simply ask "what happens when the user presses the `jump` button?"

```ts
useButtonPressed(inputMap, "jump", () => {
  player.addForce(0, -10)
})
```

## Running this repo

### Bootstrap

```
yarn
yarn bootstrap
```

### Running the examples

```
cd packages/use-control
yarn build
cd ../example
yarn start
```

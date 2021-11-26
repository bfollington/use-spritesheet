import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import {
  usePixelTexture,
  useSpritesheet,
  useSpritesheetAnimation,
} from "use-spritesheet/lib";
import { GremlinAseprite, ImpoAseprite, SmileyAseprite } from "./actors";
import frogSrc from "./resources/frog.png";
import smileySrc from "./resources/smiley_idle.png";
import impSrc from "./resources/impo.png";

const PixelTexture = () => {
  const tex = usePixelTexture(frogSrc);

  return (
    <sprite position={[-5, 0, 0]}>
      <spriteMaterial transparent map={tex} />
    </sprite>
  );
};

const SpritesheetSingleFrame = () => {
  const tex = useSpritesheet(smileySrc, 1, 8, 2);

  return (
    <sprite position={[5, 0, 0]}>
      <spriteMaterial transparent map={tex} />
    </sprite>
  );
};

const SpritesheetAnimation = ({ paused }: { paused: boolean }) => {
  const [tex] = useSpritesheetAnimation(impSrc, 100, 2, 4, paused);

  return (
    <sprite position={[4, 0, 0]}>
      <spriteMaterial transparent map={tex} />
    </sprite>
  );
};

const AsepriteImports = ({
  paused,
  animation,
}: {
  paused: boolean;
  animation: string;
}) => {
  return (
    <group>
      <GremlinAseprite
        animation={animation}
        position={[2, 0, 2]}
        paused={paused}
      />
      <SmileyAseprite animation="idle" position={[3, 0, 2]} paused={paused} />
      <ImpoAseprite animation="idle" position={[4, 0, 2]} paused={paused} />
    </group>
  );
};

export default function App() {
  const [paused, setPaused] = useState(false);
  const [animation, setAnimation] = useState("idle");

  return (
    <>
      <button onClick={() => setPaused(!paused)}>Pause</button>
      <label>Gremline Animation</label>
      <select value={animation} onChange={(v) => setAnimation(v.target.value)}>
        <option value="idle">idle</option>
        <option value="boom">boom</option>
      </select>
      <Canvas camera={{ position: [8, 8, 8] }}>
        <color attach="background" args={["black"]} />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <pointLight position={[30, 0, 0]} color="blue" intensity={10} />
          <PixelTexture />
          <SpritesheetSingleFrame />
          <SpritesheetAnimation paused={paused} />
          <AsepriteImports animation={animation} paused={paused} />
        </Suspense>
        <OrbitControls
          minPolarAngle={Math.PI / 10}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </>
  );
}

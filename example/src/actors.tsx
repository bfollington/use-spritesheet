import React, { Ref } from "react";
import { useAseprite } from "use-spritesheet/lib";
import gremlin from "./resources/bomber.png";
import gremlinJson from "./resources/bomber.json";
import impo from "./resources/impo.png";
import impoJson from "./resources/impo.json";
import bard from "./resources/smiley.png";
import bardJson from "./resources/smiley.json";
import { AsepriteJson } from "use-spritesheet/lib/aseprite";

export const GremlinAseprite = ({
  position,
  animation = "idle",
  paused,
}: any) => {
  const [texture] = useAseprite(
    gremlin,
    gremlinJson as AsepriteJson,
    animation,
    paused
  );

  return (
    <sprite position={position}>
      <spriteMaterial transparent={true} map={texture} />
    </sprite>
  );
};

export const ImpoAseprite = ({ position, animation = "idle", paused }: any) => {
  const [texture] = useAseprite(
    impo,
    impoJson as AsepriteJson,
    animation,
    paused
  );

  return (
    <sprite position={position}>
      <spriteMaterial transparent={true} map={texture} />
    </sprite>
  );
};

export const SmileyAseprite = ({
  position,
  animation = "idle",
  paused,
}: any) => {
  const [texture] = useAseprite(
    bard,
    bardJson as AsepriteJson,
    animation,
    paused
  );

  return (
    <sprite position={position}>
      <spriteMaterial transparent={true} map={texture} />
    </sprite>
  );
};

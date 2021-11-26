export type AsepriteFrame = {
  frame: {
    x: number
    y: number
    w: number
    h: number
  }
  rotated: boolean
  trimmed: boolean
  spriteSourceSize: {
    x: number
    y: number
    w: number
    h: number
  }
  sourceSize: {
    w: number
    h: number
  }
  duration: number
}

export type AsepriteLayer = {
  name: string
  opacity: number
  blendMode: string
}

export type AsepriteFrameTag = {
  name: string
  from: number
  to: number
  direction: 'forward' | 'backward'
}

export type AsepriteJson = {
  frames: { [name: string]: AsepriteFrame }
  meta: {
    app: string
    version: string
    image: string
    format: string
    size: {
      w: number
      h: number
    }
    frameTags: AsepriteFrameTag[]
    layers: AsepriteLayer[]
    slices: unknown[]
  }
}

export function frameList(json: AsepriteJson): AsepriteFrame[] {
  return Object.values(json.frames)
}

export function getAnimationFrames(json: AsepriteJson, name: string): AsepriteFrame[] {
  const tag = json.meta.frameTags.find((t) => t.name === name)
  if (!tag) return []

  const allFrames = frameList(json)
  return allFrames.slice(tag.from, tag.to)
}

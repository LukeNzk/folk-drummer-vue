export interface SfxAsset {
  dir: string;
  files: Array<string>;
}

export interface SfxCollection {
  [category: string]: SfxAsset;
}

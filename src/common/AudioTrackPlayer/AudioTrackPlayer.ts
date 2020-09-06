import AudioTrackGenerator from '@/common/AudioTrackGenerator';
import ClipProvider from '@/common/ClipProvider';
import AudioUtils from '@/common/AudioUtils'; // eslint-disable-line no-unused-vars
import BeatInfo from '@/common/AudioTrackGenerator/BeatInfo'; // eslint-disable-line no-unused-vars
import ValueOscilator from './ValueOscilator';

// tslint:disable:no-null-keyword
export const isNullOrUndefined = <T>(
  obj: T | null | undefined
): obj is null | undefined => {
  return typeof obj === 'undefined' || obj === null;
};
// tslint:enable:no-null-keyword

type BeatChangedCallback = (beat: BeatInfo) => void;
class AudioTrackPlayer {
  private _trackGenerator: AudioTrackGenerator;
  private _clips: Array<ClipProvider>;
  private _audioUtils: AudioUtils;
  private _loopHandle!: number;
  private _timeSinceLastBeat = 0;
  private _currentBeat: BeatInfo | null = null;
  private _tempoOscilator = new ValueOscilator();

  private _onBeatChanged!: BeatChangedCallback;

  constructor(audio: AudioUtils | undefined, audioClips: Array<ClipProvider>) {
    this._trackGenerator = new AudioTrackGenerator();
    this._trackGenerator.beatsPerMeasure = 3;
    this._clips = [];
    this._audioUtils = audio as AudioUtils;
    this._clips = audioClips;
  }

  setAudioClips(clips: Array<ClipProvider>) {
    this._clips = clips;
  }

  setOnBeatChanged = (callback: BeatChangedCallback) => {
    this._onBeatChanged = callback;
  };

  private clear = () => {
    if (!isNullOrUndefined(this._loopHandle)) {
      clearInterval(this._loopHandle);
    }

    this._timeSinceLastBeat = 0;
  };

  private getClipProvider = (beatIndex: number) => {
    if (beatIndex === 0) {
      return this._clips[0];
    } else {
      const sideBeatClipsCount = this._clips.length - 1;
      let r = Math.random() * sideBeatClipsCount;
      r = r * Math.pow(r / sideBeatClipsCount, 0.5);
      r = Math.floor(r) + 1;

      return this._clips[r];
    }
  };

  private tick = (dt: number) => {
    if (isNullOrUndefined(this._currentBeat)) {
      return;
    }

    this._tempoOscilator.tick(dt);
    const tempoOscilationInterval = this._tempoOscilator.value / 60;

    this._timeSinceLastBeat += dt;
    const offset = this._currentBeat.offset;
    const time = this._currentBeat.time;
    const timeOffset = time * offset;
    const interval = time + timeOffset - tempoOscilationInterval;
    if (this._timeSinceLastBeat >= interval) {
      this._timeSinceLastBeat -= time - tempoOscilationInterval;
      let clip = this.getClipProvider(this._currentBeat.index).next();

      const skippingBeatChance = [0.05, 0.0, 0.1];
      const skippingBeatRnd = Math.random();
      const skipBeat =
        skippingBeatRnd < skippingBeatChance[this._currentBeat.index];

      this.nextBeat();

      if (skipBeat) {
        clip = this.getClipProvider(this._currentBeat.index).next();
      }
      if (clip.buffer) {
        this._audioUtils.play(clip.buffer);
      }
    }
  };

  private nextBeat = () => {
    const nextBeat = this._trackGenerator.next();
    this._onBeatChanged && this._onBeatChanged(this._currentBeat);
    this._currentBeat = nextBeat;
  };

  start = () => {
    this.clear();
    const interval = 16; // ms
    let time = Date.now();
    this.nextBeat();

    const loop = () => {
      const now = Date.now();
      const deltaTime = now - time;
      time = now;
      this.tick(deltaTime / 1000);
    };

    // eslint-disable-next-line
    this._loopHandle = setInterval(loop, interval) as any;
  };

  stop = () => {
    this.clear();
  };

  get generator() {
    return this._trackGenerator;
  }

  setBeatOffset = (index: number, val: number) =>
    this._trackGenerator.setOffset(index, val);
  setTempoOscilation = (val: number) =>
    this._tempoOscilator.setOscilationValue(val);
}

export default AudioTrackPlayer;

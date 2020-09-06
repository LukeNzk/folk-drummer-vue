import AudioUtils from '@/common/AudioUtils'; // eslint-disable-line no-unused-vars
import ClipProvider from '@/common/ClipProvider';
import SfxCollection from '@/common/SfxCollection';
import { AudioClip } from '@/common/ClipProvider';

class AudioClips {
  private _clips: Array<ClipProvider>;
  private _audioUtils: AudioUtils;

  constructor(utils: AudioUtils) {
    this._clips = [];
    this._audioUtils = utils;
  }

  getClips = (): Array<ClipProvider> => {
    return this._clips;
  };

  loadClips = async (sfxBank: any) => {
    const sounds = await sfxBank.sounds();

    const loaders = Object.keys(sounds).map((key, index) => {
      const files = sounds[key].files;
      const result = this.loadClipFiles(files).then(clips => {
        const clipProvider = new ClipProvider();
        clips.forEach(clip => clipProvider.push(clip));
        this._clips[index] = clipProvider;
      });

      return result;
    });

    await Promise.all(loaders);
  };

  private loadClipFiles = (files: Array<string>) => {
    const result = new Promise<Array<AudioClip>>(resolve => {
      const audioClips: Array<AudioClip> = [];

      const onClipLoaded = (buffer: AudioBuffer) => {
        const clip = new AudioClip();
        clip.buffer = buffer;
        audioClips.push(clip);
        if (audioClips.length === files.length) {
          // loaded all files
          resolve(audioClips);
        }
      };

      for (const file of files) {
        this._audioUtils.loadClip(file).then(onClipLoaded);
      }
    });

    return result;
  };
}

export default AudioClips;

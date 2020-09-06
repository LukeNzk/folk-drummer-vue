import SfxCollection from '@/common/SfxCollection';
const prefixPath = './';

const sfxList: SfxCollection = {
  skin: { dir: prefixPath + 'skin/', files: ['skin-1', 'skin-2', 'skin-3'] },
  bells: {
    dir: prefixPath + 'bells/',
    files: ['bells-1', 'bells-2', 'bells-3', 'bells-4', 'bells-5'],
  },
  hybrid: {
    dir: prefixPath + 'hybrid/',
    files: ['hybrid-1', 'hybrid-2', 'hybrid-3', 'hybrid-4'],
  },
};

let soundsLoaded = false;
const getSounds = async () => {
  if (soundsLoaded) {
    return sfxList;
  }

  const promises: Array<Promise<void>> = [];
  Object.keys(sfxList).forEach(key => {
    const category = sfxList[key];
    for (let i = 0; i < category.files.length; ++i) {
      const importing = import(category.dir + category.files[i] + '.ogg').then(
        asset => {
          category.files[i] = asset.default;
        }
      );
      promises.push(importing);
    }
  });

  await Promise.all(promises);
  soundsLoaded = true;
  return sfxList;
};

const assets = {
  sounds: getSounds,
};

export default assets;

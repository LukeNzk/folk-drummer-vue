import SfxCollection from '@/common/SfxCollection';

const prefixPath = './';

const sfxList: SfxCollection = {
  skin: { dir: prefixPath, files: ['skinwt-01', 'skinwt-02', 'skinwt-03'] },
  triangle: {
    dir: prefixPath,
    files: ['triangle-01', 'triangle-02', 'triangle-03', 'triangle-04'],
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

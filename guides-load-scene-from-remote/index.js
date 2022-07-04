
import 'https://cdn.img.ly/packages/imgly/cesdk-js/1.7.0-alpha.3/cesdk.umd.js';

CreativeEditorSDK.init('#cesdk_container').then(async (cesdk) => {
  // highlight-url
  const sceneUrl = 'https://cdn.img.ly/packages/imgly/cesdk-js/1.7.0-alpha.3/assets/templates/cesdk_postcard_1.scene';
  // highlight-url

  // highlight-load
  cesdk.loadFromURL(sceneUrl).then(() => {
    console.log('Load succeeded')
  }).catch((error) => {
    console.error('Load failed', error)
  });
  // highlight-load
});

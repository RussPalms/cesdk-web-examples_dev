import 'https://cdn.img.ly/packages/imgly/cesdk-js/1.4.4/cesdk.umd.js';

// highlight-config
let config = {
  license: 'eyJhbGciOiJSUzI1NiIsInR5…' // Replace with private license 
};
// highlight-config

CreativeEditorSDK.init('#cesdk_container', config).then((instance) => {
  /** do something with the instance of CreativeEditor SDK **/
});

import CreativeEditorSDK from 'https://cdn.img.ly/packages/imgly/cesdk-js/1.29.0-rc.0/index.js';

const config = {
  license: 'vERESgSXbYj5Rs-FF4DzkMvhdQLh0Mxe6AD8V-doP6wqe_gmYmx_oUKqIlMkwpMu',
  userId: 'guides-user',
  baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-js/1.29.0-rc.0/assets'
};

CreativeEditorSDK.create('#cesdk_container', config).then((instance) => {
  // highlight-get-absolute-base-path
  /** This will return 'https://cdn.img.ly/packages/imgly/cesdk-js/1.29.0-rc.0/assets/banana.jpg'. */
  instance.engine.editor.getAbsoluteURI('/banana.jpg');
  // highlight-get-absolute-base-path

  // highlight-resolver
  /** Replace all .jpg files with the IMG.LY logo! **/
  instance.engine.editor.setURIResolver((uri) => {
    if (uri.endsWith('.jpg')) {
      return 'https://img.ly/static/ubq_samples/imgly_logo.jpg';
    }
    /** Make use of the default URI resolution behavior. */
    return instance.engine.editor.defaultURIResolver(uri);
  });
  // highlight-resolver

  // highlight-get-absolute-custom
  /**
   * The custom resolver will return a path to the IMG.LY logo because the given path ends with '.jpg'.
   * This applies regardless if the given path is relative or absolute.
   */
  instance.engine.editor.getAbsoluteURI('/banana.jpg');

  /** The custom resolver will not modify this path because it ends with '.png'. */
  instance.engine.editor.getAbsoluteURI('https://example.com/orange.png');

  /** Because a custom resolver is set, relative paths that the resolver does not transform remain unmodified! */
  instance.engine.editor.getAbsoluteURI('/orange.png');
  // highlight-get-absolute-custom

  // highlight-remove-resolver
  /** Removes the previously set resolver. */
  instance.engine.editor.setURIResolver(null);

  /** Since we've removed the custom resolver, this will return 'https://cdn.img.ly/packages/imgly/cesdk-js/1.29.0-rc.0/assets/banana.jpg' like before. */
  instance.engine.editor.getAbsoluteURI('/banana.jpg');
  // highlight-remove-resolver
});

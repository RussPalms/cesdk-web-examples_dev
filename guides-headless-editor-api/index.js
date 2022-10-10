// highlight-setup
import CreativeEngine from 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.8.0/index.js';

const config = {
  baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.8.0/assets'
};

CreativeEngine.init(config).then(async (engine) => {
  let scene = engine.scene.create();
  scene = await engine.scene.createFromImage(
    'https://img.ly/static/ubq_samples/sample_4.jpg'
  );
  // highlight-setup

  // highlight-onStateChanged
  const unsubscribeState = engine.editor.onStateChanged(() => console.log('Editor state has changed'));

  // highlight-editMode
  engine.editor.setEditMode('Crop');
  engine.editor.getEditMode();
  // highlight-editMode

  // highlight-cursor
  engine.editor.getCursorType();
  engine.editor.getCursorRotation();
  // highlight-cursor

  // highlight-textCursor
  engine.editor.getTextCursorPositionInScreenSpaceX();
  engine.editor.getTextCursorPositionInScreenSpaceY();
  // highlight-textCursor

  // highlight-addUndoStep
  engine.editor.addUndoStep();

  // highlight-undo
  if (engine.editor.canUndo()) {
    engine.editor.undo();
  }
  // highlight-undo

  // highlight-redo
  if (engine.editor.canRedo()) {
    engine.editor.redo();
  }
  // highlight-redo

  // highlight-onSettingsChanged
  const unsubscribeSettings = engine.editor.onSettingsChanged(() => console.log('Editor settings have changed'));

  // highlight-setSettingBool
  engine.editor.setSettingBool('ubq://doubleClickToCropEnabled', true);
  // highlight-getSettingBool
  engine.editor.getSettingBool('ubq://doubleClickToCropEnabled');
  // highlight-setSettingFloat
  engine.editor.setSettingFloat('ubq://positionSnappingThreshold', 2.0);
  // highlight-getSettingFloat
  engine.editor.getSettingFloat('ubq://positionSnappingThreshold');
  // highlight-setSettingString
  engine.editor.setSettingString('ubq://license', 'invalid');
  // highlight-getSettingString
  engine.editor.getSettingString('ubq://license');
  // highlight-setSettingColorRGBA
  engine.editor.setSettingColorRGBA('ubq://highlightColor', 1, 0, 1, 1); // Pink
  // highlight-getSettingColorRGBA
  engine.editor.getSettingColorRGBA('ubq://highlightColor');
  // highlight-setSettingEnum
  engine.editor.setSettingEnum('ubq://role', 'Presenter');
  // highlight-getSettingEnum
  engine.editor.getSettingEnum('ubq://role');

  // Export the scene to an image
  await engine.block.export(scene);

  engine.dispose();
});

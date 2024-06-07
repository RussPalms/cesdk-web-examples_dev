// highlight-setup
import CreativeEngine from 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.29.0-rc.0/index.js';

const config = {
  license: 'vERESgSXbYj5Rs-FF4DzkMvhdQLh0Mxe6AD8V-doP6wqe_gmYmx_oUKqIlMkwpMu',
  userId: 'guides-user',
  baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.29.0-rc.0/assets'
};

CreativeEngine.init(config).then(async (engine) => {
  document.getElementById('cesdk_container').append(engine.element);

  const scene = engine.scene.create();

  const page = engine.block.create('page');
  engine.block.setWidth(page, 800);
  engine.block.setHeight(page, 600);
  engine.block.appendChild(scene, page);

  engine.scene.zoomToBlock(page, 40, 40, 40, 40);

  const block = engine.block.create('graphic');
  engine.block.setShape(block, engine.block.createShape('rect'));
  const imageFill = engine.block.createFill('image');
  engine.block.setString(
    imageFill,
    'fill/image/imageFileURI',
    'https://img.ly/static/ubq_samples/sample_1.jpg'
  );
  engine.block.setFill(block, imageFill);
  engine.block.setPositionX(block, 100);
  engine.block.setPositionY(block, 50);
  engine.block.setWidth(block, 300);
  engine.block.setHeight(block, 300);
  engine.block.appendChild(page, block);
  // highlight-setup

  // highlight-hasEffects
  engine.block.hasEffects(scene); // Returns false
  engine.block.hasEffects(block); // Returns true
  // highlight-hasEffects

  // highlight-createEffect
  const pixelize = engine.block.createEffect('pixelize');
  const adjustments = engine.block.createEffect('adjustments');
  // highlight-createEffect

  // highlight-addEffect
  engine.block.appendEffect(block, pixelize);
  engine.block.insertEffect(block, adjustments, 0);
  // engine.block.removeEffect(rect, 0);
  // highlight-addEffect

  // highlight-getEffects
  // This will return [adjustments, pixelize]
  const effectsList = engine.block.getEffects(block);
  // highlight-getEffects

  // highlight-destroyEffect
  const unusedEffect = engine.block.createEffect('half_tone');
  engine.block.destroy(unusedEffect);
  // highlight-destroyEffect

  // highlight-getProperties
  const allPixelizeProperties = engine.block.findAllProperties(pixelize);
  const allAdjustmentProperties = engine.block.findAllProperties(adjustments);
  // highlight-getProperties
  // highlight-modifyProperties
  engine.block.setInt(pixelize, 'pixelize/horizontalPixelSize', 20);
  engine.block.setFloat(adjustments, 'effect/adjustments/brightness', 0.2);
  // highlight-modifyProperties

  // highlight-disableEffect
  engine.block.setEffectEnabled(pixelize, false);
  engine.block.setEffectEnabled(
    pixelize,
    !engine.block.isEffectEnabled(pixelize)
  );
  // highlight-disableEffect
});

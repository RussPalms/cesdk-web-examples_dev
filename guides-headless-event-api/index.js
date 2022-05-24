// highlight-setup
import CreativeEngine from 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.6.2/index.js';

const config = {
  baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.6.2/assets'
};

CreativeEngine.init(config).then(async (engine) => {
  // highlight-setup
  const scene = engine.scene.create();
  const page = engine.block.create('page');
  engine.block.appendChild(scene, page);

  const star = engine.block.create('shapes/star');
  engine.block.appendChild(page, star);

  // hightlight-subscribe
  let unsubscribe = engine.event.subscribe([star], (events) => {
    for (var i = 0; i < events.length; i++) {
      let event = events[i];
      console.log('Event:', event.type, event.block);
      if (engine.block.isValid(event.block)) {
        console.log('Block type:', engine.block.getType(event.block));
      }
    }
  });

  await sleep(1000);
  engine.block.setRotation(star, 0.5 * Math.PI);
  await sleep(1000);
  engine.block.destroy(star);
  await sleep(1000);

  // highlight-unsubscribe
  unsubscribe();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
});

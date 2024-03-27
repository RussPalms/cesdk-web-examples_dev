'use client';

import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner';
import classes from './CaseComponent.module.css';
import CUSTOM_LAYOUT_ASSET from './CustomLayout.json';
import CUSTOM_STICKER_ASSETS from './CustomSticker.json';
import { EditorProvider } from './EditorContext';
import PhotoBookUI from './components/PhotoBookUI/PhotoBookUI';
import { EngineProvider } from './lib/EngineContext';
import { PagePreviewProvider } from './lib/PagePreviewContext';
import { SinglePageModeProvider } from './lib/SinglePageModeContext';
import createUnsplashSource from './lib/UnsplashSource';
import { createApplyLayoutAsset } from './lib/createApplyLayoutAsset';
import loadAssetSourceFromContentJSON from './lib/loadAssetSourceFromContentJSON';
import { caseAssetPath } from './util';

const CaseComponent = () => {
  return (
    <div className={classes.fullHeightWrapper}>
      <div className={classes.wrapper}>
        <div className={classes.innerWrapper}>
          <EngineProvider
            LoadingComponent={<LoadingSpinner />}
            config={{
              role: 'Adopter',
              featureFlags: {
                preventScrolling: true
              },
              license: process.env.NEXT_PUBLIC_LICENSE
            }}
            configure={async (engine) => {
              engine.editor.setSettingBool('page/title/show', false);
              await engine.addDefaultAssetSources({
                baseURL: 'https://cdn.img.ly/assets/v2',
                excludeAssetSourceIds: ['ly.img.sticker']
              });
              await engine.addDemoAssetSources({
                sceneMode: 'Design',
                baseURL: 'https://cdn.img.ly/assets/demo/v2',
                withUploadAssetSources: true,
                exclude: ['ly.img.image']
              });
              loadAssetSourceFromContentJSON(
                engine,
                CUSTOM_STICKER_ASSETS,
                caseAssetPath('')
              );
              loadAssetSourceFromContentJSON(
                engine,
                CUSTOM_LAYOUT_ASSET,
                caseAssetPath(''),
                createApplyLayoutAsset(engine)
              );

              engine.editor.setGlobalScope('lifecycle/destroy', 'Defer');

              let UNSPLASH_API_URL = ''; // INSERT YOUR UNSPLASH PROXY URL HERE
              engine.asset.addSource(
                createUnsplashSource(UNSPLASH_API_URL, engine)
              );
            }}
          >
            <SinglePageModeProvider
              defaultVerticalTextScrollEnabled={true}
              defaultPaddingBottom={92}
              defaultPaddingLeft={40}
              defaultPaddingRight={40}
              defaultPaddingTop={110}
            >
              <PagePreviewProvider>
                <EditorProvider>
                  <PhotoBookUI />
                </EditorProvider>
              </PagePreviewProvider>
            </SinglePageModeProvider>
          </EngineProvider>
        </div>
      </div>
    </div>
  );
};

export default CaseComponent;

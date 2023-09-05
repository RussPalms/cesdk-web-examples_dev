import CreativeEditorSDK from '@cesdk/cesdk-js';
import { useEffect, useRef } from 'react';
import { airtableAssetLibrary } from './airtableAssetLibrary';

const CaseComponent = () => {
  const cesdkContainer = useRef(null);

  useEffect(() => {
    let cesdk;
    let config = {
      role: 'Adopter',
      license: process.env.REACT_APP_LICENSE,
      callbacks: {
        onExport: 'download',
        onUpload: 'local'
      },
      ui: {
        elements: {
          panels: {
            settings: true
          },
          navigation: {
            action: {
              export: {
                show: true,
                format: ['image/png', 'application/pdf']
              }
            }
          },
          libraries: {
            insert: {
              floating: false,
              entries: (defaultEntries) => {
                const entriesWithoutDefaultImages = defaultEntries.filter(
                  (entry) => {
                    return entry.id !== 'ly.img.image';
                  }
                );
                return [
                  {
                    id: 'airtable',
                    sourceIds: ['airtable'],
                    previewLength: 3,
                    gridItemHeight: 'auto',
                    gridBackgroundType: 'cover',
                    gridColumns: 2
                  },
                  ...entriesWithoutDefaultImages
                ];
              }
            },
            replace: {
              floating: false,
              entries: (defaultEntries, context) => {
                if (
                  context.selectedBlocks.length !== 1 ||
                  context.selectedBlocks[0].blockType !== '//ly.img.ubq/image'
                ) {
                  return [];
                }
                return [
                  {
                    id: 'airtable',
                    sourceIds: ['airtable'],
                    previewLength: 3,
                    gridItemHeight: 'auto',
                    gridBackgroundType: 'cover',
                    gridColumns: 2
                  }
                ];
              }
            }
          }
        }
      },
      i18n: {
        en: {
          'libraries.airtable.label': 'Airtable'
        }
      }
    };
    if (cesdkContainer.current) {
      CreativeEditorSDK.create(cesdkContainer.current, config).then(
        async (instance) => {
          instance.addDefaultAssetSources();
          instance.addDemoAssetSources({ sceneMode: 'Design' });
          instance.engine.asset.addSource(airtableAssetLibrary);
          instance.engine.editor.setSettingBool('page/title/show', false);
          cesdk = instance;
          await instance.loadFromURL(
            `${window.location.protocol + "//" + window.location.host}/cases/airtable-image-assets/airtable.scene`
          );
        }
      );
    }
    return () => {
      if (cesdk) {
        cesdk.dispose();
      }
    };
  }, [cesdkContainer]);

  return (
    <div style={wrapperStyle}>
      <div style={cesdkWrapperStyle}>
        <div ref={cesdkContainer} style={cesdkStyle}></div>
      </div>
      <div style={sidebarStyle}>
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/shr4x8s9jqaxiJxm5?backgroundColor=orange"
          frameBorder="0"
          width="280"
          title="airtable"
          style={airtableStyle}
        ></iframe>
      </div>
    </div>
  );
};

const cesdkStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
const cesdkWrapperStyle = {
  position: 'relative',
  minHeight: '640px',
  overflow: 'hidden',
  flexGrow: 1,
  display: 'flex',
  borderRadius: '0.75rem',
  boxShadow:
    '0px 0px 2px rgba(22, 22, 23, 0.25), 0px 4px 6px -2px rgba(22, 22, 23, 0.12), 0px 2px 2.5px -2px rgba(22, 22, 23, 0.12), 0px 1px 1.75px -2px rgba(22, 22, 23, 0.12)'
};

const wrapperStyle = {
  flex: '1',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem'
};

const sidebarStyle = {
  flexBasis: '280px',
  flexShrink: 0,
  boxShadow:
    '0px 0px 2px rgba(18, 26, 33, 0.25), 0px 6px 6px -2px rgba(18, 26, 33, 0.12), 0px 2.5px 2.5px -2px rgba(18, 26, 33, 0.12), 0px 1.25px 1.25px -2px rgba(18, 26, 33, 0.12)',
  borderRadius: '12px'
};
const airtableStyle = {
  background: 'transparent',
  border: '1px solid #ccc',
  borderRadius: '12px',
  flexGrow: 1,
  height: '100%'
};

export default CaseComponent;

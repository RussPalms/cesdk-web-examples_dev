import CreativeEditorSDK from '@cesdk/cesdk-js';
import SegmentedControl from 'components/ui/SegmentedControl/SegmentedControl';
import React, { useEffect, useRef, useState } from 'react';

const CaseComponent = () => {
  const cesdkContainer = useRef(null);
  /** @type {[import("@cesdk/cesdk-js").default, Function]} cesdk */
  const [cesdk, setCesdk] = useState();
  const pageIds = useRef(null);
  const [activePageId, setActivePageId] = useState(null);

  useEffect(() => {
    let cesdk;
    let config = {
      role: 'Adopter',
      theme: 'light',
      initialSceneURL: `${window.location.protocol + "//" + window.location.host}/example-1-adopter.scene`,
      license: process.env.REACT_APP_LICENSE,
      featureFlags: {
        singlePageMode: true
      },
      page: {
        title: {
          show: false
        }
      },
      ui: {
        elements: {
          libraries: {
            template: false
          },
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
          }
        }
      },
      callbacks: {
        onExport: 'download',
        onUpload: 'local'
      }
    };
    if (cesdkContainer.current) {
      CreativeEditorSDK.init(cesdkContainer.current, config).then(
        async (instance) => {
          instance.addDefaultAssetSources();
          instance.addDemoAssetSources();
          cesdk = instance;
          setCesdk(instance);
          pageIds.current = await instance.unstable_getPages();
          setActivePageId(pageIds.current[0]);
        }
      );
    }
    return () => {
      if (cesdk) {
        cesdk.dispose();
      }
    };
  }, [cesdkContainer]);

  useEffect(() => {
    activePageId && cesdk && cesdk.unstable_switchPage(activePageId);
  }, [cesdk, activePageId]);

  return (
    <div style={wrapperStyle} className="space-y-2">
      <div className="flex flex-col items-center">
        {pageIds.current && (
          <SegmentedControl
            options={pageIds.current.map((id, index) => ({
              label: cesdk.engine.block.getName(id) || `Page ${index + 1}`,
              value: id
            }))}
            value={activePageId}
            name="pageId"
            onChange={(value) => setActivePageId(value)}
            size="md"
          />
        )}
      </div>

      <div style={cesdkWrapperStyle}>
        <div ref={cesdkContainer} style={cesdkStyle}></div>
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
    '0px 0px 2px rgba(0, 0, 0, 0.25), 0px 18px 18px -2px rgba(18, 26, 33, 0.12), 0px 7.5px 7.5px -2px rgba(18, 26, 33, 0.12), 0px 3.75px 3.75px -2px rgba(18, 26, 33, 0.12)'
};

const wrapperStyle = {
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'center',
  justifyContent: 'center'
};
export default CaseComponent;

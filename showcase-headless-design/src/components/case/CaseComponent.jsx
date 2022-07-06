import CreativeEngine from '@cesdk/engine';
import classNames from 'classnames';
import { ColorPicker } from 'components/ui/ColorPicker/ColorPicker';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { hexToRgba } from './convert';

const caseAssetPath = (path, caseId = 'headless-design') =>
  `${window.location.protocol + "//" + window.location.host}/cases/${caseId}${path}`;

const CaseComponent = () => {
  const engineRef = useRef(null);

  const [headline, setHeadline] = useState();
  const [image, setImage] = useState(null);
  const [font, setFont] = useState(null);
  const [colorHex, setColorHex] = useState('#C0C3C5');
  const [initialized, setInitialized] = useState(false);

  const colorRGBA = useMemo(() => hexToRgba(colorHex), [colorHex]);

  useEffect(() => {

    const config = {
      page: {
        title: {
          show: false
        }
      },
      variables: {
        quote: {
          value: '{{TextInput}}'
        }
      }
    };

    CreativeEngine.init(config, document.getElementById('cesdk_canvas')).then(
      async (instance) => {
        await instance.scene.loadFromURL(caseAssetPath('/example.scene'));
        engineRef.current = instance;
        const camera = instance.block.findByType('camera')[0];

        let dpr = window.devicePixelRatio;

        instance.block.setFloat(camera, 'camera/pixelRatio', dpr);
        instance.block.setFloat(camera, 'camera/zoomLevel', dpr);

        instance.block.setFloat(camera, 'camera/resolution/width', 640.0);
        instance.block.setFloat(camera, 'camera/resolution/height', 400.0);
        instance.block.setPositionX(camera, 640 / 2);
        instance.block.setPositionY(camera, 400 / 2);
        instance.block.setColorRGBA(
          camera,
          'camera/clearColor',
          colorRGBA.r / 255,
          colorRGBA.g / 255,
          colorRGBA.b / 255,
          1.0
        );
        setInitialized(true);
      }
    );

    return function shutdownCreativeEngine() {
      engineRef?.current?.dispose();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      initialized &&
      engineRef.current &&
      engineRef.current.block &&
      colorRGBA
    ) {
      const page = engineRef.current.block.findByType('page')[0];
      const text = engineRef.current.block.findByType('//ly.img.ubq/text')[1];
      engineRef.current.block.setColorRGBA(
        page,
        'fill/solid/color',
        colorRGBA.r / 255,
        colorRGBA.g / 255,
        colorRGBA.b / 255,
        1.0
      );
      engineRef.current.block.setColorRGBA(
        text,
        'fill/solid/color',
        colorRGBA.r / 255,
        colorRGBA.g / 255,
        colorRGBA.b / 255,
        1.0
      );
    }
  }, [colorRGBA, engineRef, initialized]);

  useEffect(() => {
    if (initialized && engineRef.current && engineRef.current.block && font) {
      engineRef.current.block.findByType('//ly.img.ubq/text').forEach((id) => {
        engineRef.current.block.setString(id, 'text/fontFileUri', font.value);
      });
    }
  }, [font, engineRef, initialized]);

  useEffect(() => {
    if (initialized && engineRef.current && engineRef.current.block && image) {
      const img = engineRef.current.block.findByType('image')[0];
      engineRef.current.block.setString(img, 'image/imageFileURI', image.full);
      engineRef.current.block.resetCrop(img);
    }
  }, [image, engineRef, initialized]);

  useEffect(() => {
    if (
      initialized &&
      headline &&
      engineRef.current &&
      engineRef.current.block
    ) {
      engineRef.current.variable.setString('quote', headline);
    }
  }, [headline, engineRef, initialized]);

  const randomizeParameters = () => {
    setFont(FONTS[Math.floor(Math.random() * FONTS.length)]);
    setImage(IMAGES[Math.floor(Math.random() * IMAGES.length)]);
    setHeadline(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    setColorHex(COLORS[Math.floor(Math.random() * COLORS.length)]);
  };

  useEffect(() => {
    // Make sure to adapt the canvas resolution to high-dpi displays
    const canvas = document.getElementById('cesdk_canvas');
    const updatePixelRatio = () => {
      let dpr = window.devicePixelRatio;
      canvas.width = `${dpr * canvas.getBoundingClientRect().width}`;
      canvas.height = `${dpr * canvas.getBoundingClientRect().height}`;

      const camera = engineRef.current?.block.findByType('camera')[0];
      engineRef.current?.block.setFloat(camera, 'camera/pixelRatio', dpr);
      engineRef.current?.block.setFloat(camera, 'camera/zoomLevel', dpr);
      matchMedia(`(resolution: ${dpr}dppx)`).addEventListener(
        'change',
        updatePixelRatio,
        { once: true }
      );
    };
    updatePixelRatio();
  }, []);

  return (
    <div className="flex w-full flex-grow flex-col">
      <div className="caseHeader">
        <h3>Automatic Design Generation</h3>
        <p>
          Use our API and underlying creative engine to autogenerate
          ready-to-use designs by selecting input parameters.
        </p>
      </div>
      <div className="flex flex-col space-y-2" style={inputsWrapperStyle}>
        <h4 className="h4" style={headlineStyle}>
          Select Content
        </h4>
        <div style={imageSelectionWrapper} className="flex space-x-2">
          {IMAGES.map((someImage) => (
            <button
              onClick={() => setImage(someImage)}
              className="h-full"
              key={someImage.thumb}
            >
              <img
                src={someImage.thumb}
                style={{
                  ...imageStyle,
                  ...(someImage.thumb === image?.thumb ? imageActiveState : {})
                }}
                alt=""
              />
            </button>
          ))}
        </div>
        <input
          type="text"
          value={headline}
          placeholder="Enter Text"
          onChange={(e) => setHeadline(e.target.value)}
        />
        <div className="flex space-x-2">
          <div className="select-wrapper flex-grow">
            <select
              name="font"
              id="font"
              className={classNames(
                'select',
                !font?.value && 'select--placeholder'
              )}
              value={font?.value || 'placeholder'}
              onChange={(e) =>
                setFont(FONTS.find((font) => font.value === e.target.value))
              }
            >
              <option value="placeholder" disabled>
                Select Font
              </option>
              {FONTS.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <ColorPicker
            theme="light"
            size="lg"
            onChange={(hex) => setColorHex(hex)}
            value={colorHex}
          />
        </div>
        <div className="flex">
          <button
            className="button button--light-white"
            onClick={() => randomizeParameters()}
          >
            Shuffle
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="h4" style={headlineStyle}>
          Generated Design
        </h4>
        <canvas
          id="cesdk_canvas"
          width="680px"
          height="400px"
          style={canvasStyle}
        ></canvas>
      </div>
    </div>
  );
};

const COLORS = ['#2B3B52', '#4700BB', '#72332E', '#BA9820', '#FF6363'];

const FONTS = [
  {
    value:
      '/extensions/ly.img.cesdk.fonts/fonts/Playfair_Display/PlayfairDisplay-SemiBold.ttf',
    label: 'Playfair display'
  },
  {
    label: 'Poppins',
    value: '/extensions/ly.img.cesdk.fonts/fonts/Poppins/Poppins-Bold.ttf'
  },
  {
    label: 'Rasa',
    value: '/extensions/ly.img.cesdk.fonts/fonts/Rasa/Rasa-Bold.ttf'
  },
  {
    label: 'Courier Prime',
    value:
      '/extensions/ly.img.cesdk.fonts/fonts/CourierPrime/CourierPrime-Bold.ttf'
  },
  {
    label: 'Caveat',
    value: '/extensions/ly.img.cesdk.fonts/fonts/Caveat/Caveat-Bold.ttf'
  }
];
// https://unsplash.com/photos/9COU9FyUIMU
// https://unsplash.com/photos/A2BMfcZH_Ig
// https://unsplash.com/photos/I7NNdMspF0M
// https://unsplash.com/photos/Ay_HG60pHHw
// https://unsplash.com/photos/FIKD9t5_5zQ
const IMAGES = [
  {
    full: caseAssetPath('/images/wall-1200.jpg'),
    thumb: caseAssetPath('/images/wall-300.jpg')
  },
  {
    full: caseAssetPath('/images/paint-1200.jpg'),
    thumb: caseAssetPath('/images/paint-300.jpg')
  },
  {
    full: caseAssetPath('/images/window-1200.jpg'),
    thumb: caseAssetPath('/images/window-300.jpg')
  },
  {
    full: caseAssetPath('/images/face-1200.jpg'),
    thumb: caseAssetPath('/images/face-300.jpg')
  },
  {
    full: caseAssetPath('/images/clouds-1200.jpg'),
    thumb: caseAssetPath('/images/clouds-300.jpg')
  }
];
const QUOTES = [
  'Good design is honest. — Dieter Rams',
  'Try not to become a man of success. Rather become a man of value. — Albert Einstein',
  'Imagination creates reality. — Richard Wagner',
  'Time you enjoy wasting, was not wasted. — John Lennon',
  'May the Force be with you. — Obi-Wan Kenobi'
];

const inputsWrapperStyle = {
  maxWidth: 'fit-content',
  minWidth: '340px',
  marginBottom: '2rem'
};

const imageSelectionWrapper = {
  display: 'flex',
  height: 50
};

const imageStyle = {
  height: '100%',
  borderRadius: '6px',
  objectFit: 'cover',
  cursor: 'pointer',
  border: '2px solid transparent',
  // For safari:
  minWidth: '50px'
};
const imageActiveState = {
  border: '2px solid #471aff'
};

const headlineStyle = {
  color: 'white'
};

const canvasStyle = {
  width: '640px',
  height: '400px',
  minHeight: '400px',
  border: '1px solid gray',
  backgroundColor: '#9CA0A5'
};

export default CaseComponent;

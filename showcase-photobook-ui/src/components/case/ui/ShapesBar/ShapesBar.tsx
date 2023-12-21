import { CompleteAssetResult } from '@cesdk/engine';
import { useCallback, useEffect, useState } from 'react';
import { useEngine } from '../../lib/EngineContext';
import AdjustmentsBar from '../AdjustmentsBar/AdjustmentsBar';
import IconButton from '../IconButton/IconButton';

const ShapeBar = ({
  onClick
}: {
  onClick: (asset: CompleteAssetResult) => void;
}) => {
  const { engine } = useEngine();
  const [shapes, setShapes] = useState<CompleteAssetResult[]>([]);

  const queryShapes = useCallback(async () => {
    const SHAPE_ASSET_LIBRARY_ID = 'ly.img.vectorpath';
    const queryParameters = { page: 0, perPage: 999 };
    const results = await engine.asset.findAssets(
      SHAPE_ASSET_LIBRARY_ID,
      queryParameters
    );
    return results;
  }, [engine]);

  useEffect(() => {
    const loadShapes = async () => {
      const newShapes = await queryShapes();
      setShapes(newShapes.assets);
    };
    loadShapes();
  }, [queryShapes]);

  return (
    <AdjustmentsBar gap="md">
      {shapes.map((asset, i) => (
        <IconButton
          key={asset.id}
          onClick={() => onClick(asset)}
          icon={<img src={asset.meta?.thumbUri} alt={`Add shape ${i}`} />}
        ></IconButton>
      ))}
    </AdjustmentsBar>
  );
};
export default ShapeBar;

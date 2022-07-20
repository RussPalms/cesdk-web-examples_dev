import { useEditor } from '../../EditorContext';

import DeleteSelectedButton from '../DeleteSelectedButton/DeleteSelectedButton';

import { ReactComponent as RectIcon } from '../../icons/shapes/rect.svg';
import { ReactComponent as LineIcon } from '../../icons/shapes/line.svg';
import { ReactComponent as StarIcon } from '../../icons/shapes/star.svg';
import { ReactComponent as PolygonIcon } from '../../icons/shapes/polygon.svg';

import IconButton from '../IconButton/IconButton';

export const ALL_SHAPES = [
  { type: 'shapes/rect', label: 'Rectangle', icon: <RectIcon /> },
  { type: 'shapes/line', label: 'Line', icon: <LineIcon /> },
  { type: 'shapes/star', label: 'Star', icon: <StarIcon /> },
  { type: 'shapes/polygon', label: 'Polygon', icon: <PolygonIcon /> }
];

const ShapesBar = () => {
  const {
    customEngine: { addShape }
  } = useEditor();

  return (
    <div className="gap-md inline-flex">
      <div className="flex">
        {ALL_SHAPES.map(({ type, icon }) => (
          <IconButton
            key={type}
            onClick={() => addShape(type)}
            icon={icon}
          ></IconButton>
        ))}
      </div>
      <div>
        <DeleteSelectedButton />
      </div>
    </div>
  );
};
export default ShapesBar;

import * as React from "react";

import "./index.less";

const Bar = ({ heights, label }, ref): JSX.Element => {
  return (
    <div className="bar" ref={ref}>
      <div className="bar__content">
        {heights.map((height, index) => (
          <div
            key={index}
            className="bar__content__section"
            style={{
              height: `${height}px`,
            }}
          >
            <span>{height}</span>
          </div>
        ))}
      </div>
      <div className="bar__label">{label}</div>
    </div>
  );
};

export default React.forwardRef(Bar);

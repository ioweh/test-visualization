import * as React from "react";

import "./index.less";

const Bar = ({ heights, label, isStandard }, ref): JSX.Element => {
  return (
    <div className="bar" ref={ref}>
      <div
        className={`bar__content ${isStandard ? "bar__content--standard" : ""}`}
      >
        {heights.map((height, index) => (
          <div
            key={index}
            className="bar__content__section"
            style={{
              height: `${height}px`,
            }}
          >
            <span
              className={
                isStandard ? "bar__content__section__standard-text" : ""
              }
            >
              {height}
            </span>
          </div>
        ))}
      </div>
      <div className="bar__label">{label}</div>
    </div>
  );
};

export default React.forwardRef(Bar);

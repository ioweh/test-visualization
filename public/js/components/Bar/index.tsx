import * as React from "react";

import "./index.less";
import { BAR_ARROW_OFFSET } from "../constants";

const Bar = (
  { heights, label, isStandard, containerHeight, maxBarHeight },
  ref,
): JSX.Element => {
  const totalBarHeight = heights.reduce((acc, x) => acc + x, 0);

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
              height: `${height * ((containerHeight - BAR_ARROW_OFFSET * 2) / maxBarHeight)}px`,
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

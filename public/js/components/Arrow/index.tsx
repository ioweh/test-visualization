import * as React from "react";

import "./index.less";

const Arrow = ({ start, finish }) => {
  return (
    <svg className="arrow">
      {/* Arrow path */}
      <path
        d={`M${start.x},${start.y} L${start.x},250 L${finish.x},250 L${finish.x},${finish.y}`}
        className="arrow__path"
      />
      {/* Arrowhead */}
      <path
        d={`M${finish.x - 5},${finish.y - 5} L${finish.x},${finish.y} L${finish.x + 5},${finish.y - 5}`}
        className="arrow__head"
      />
    </svg>
  );
};

export default Arrow;

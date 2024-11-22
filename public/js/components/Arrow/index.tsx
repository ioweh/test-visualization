import * as React from "react";
import "./index.less";

const Arrow = ({ start, finish, height, diff }) => {
  return (
    <>
      <svg className="arrow">
        {/* Arrow path */}
        <path
          d={`M${start.x},${start.y} L${start.x},${height} L${finish.x},${height} L${finish.x},${finish.y}`}
          className="arrow__path"
        />
        {/* Arrowhead */}
        <path
          d={`M${finish.x - 5},${finish.y - 5} L${finish.x},${finish.y} L${finish.x + 5},${finish.y - 5}`}
          className="arrow__head"
        />
      </svg>
      <div
        className={`label ${diff < 0 ? "label--decrease" : "label--increase"}`}
        style={{
          top: `${height - 10}px`,
          left: `${start.x + (finish.x - start.x) / 2 - 20}px`,
          width: "40px",
          height: "20px",
        }}
      >
        {diff > 0 && <span>↑+</span>}
        {diff < 0 && <span>↓</span>}
        {diff}
      </div>
    </>
  );
};

export default Arrow;

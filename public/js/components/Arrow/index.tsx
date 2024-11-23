import * as React from "react";
import "./index.less";

const Arrow = ({ start, finish, height, diff }) => {
  const labelRef = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    if (labelRef.current) {
      setLabelWidth(labelRef.current.offsetWidth);
    }
  }, []);

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
        className={`label ${diff === 0 ? "label--equal" : diff < 0 ? "label--decrease" : "label--increase"}`}
        ref={labelRef}
        style={{
          top: `${height - 10}px`,
          left: `${start.x + (finish.x - start.x) / 2 - labelWidth / 2}px`,
          width: "auto",
          height: "20px",
        }}
      >
        {diff > 0 && <img src="static/up-arrow.svg" />}
        {diff < 0 && <img src="static/down-arrow.svg" />}
        <div className="label__text">
          {diff > 0 && <span>+</span>}
          {diff}
        </div>
      </div>
    </>
  );
};

export default Arrow;

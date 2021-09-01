import React, { useEffect } from "react";
import { useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const [width, setWidth] = useState(window.innerWidth * 0.75);
  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  const verticalProps: ResizableBoxProps = {
    height: 300,
    width: Infinity,
    resizeHandles: ["s"],
    maxConstraints: [Infinity, innerHeight * 0.9],
    minConstraints: [Infinity, 50],
  };
  const horizontalProps: ResizableBoxProps = {
    height: Infinity,
    width: width,
    resizeHandles: ["e"],
    maxConstraints: [innerWidth * 0.9, Infinity],
    minConstraints: [innerWidth * 0.2, Infinity],
    className: "resize-horizontal",
    onResizeStop: (event, data) => {
      setWidth(data.size.width);
    },
  };

  const props = direction === "horizontal" ? horizontalProps : verticalProps;

  return <ResizableBox {...props}>{children}</ResizableBox>;
};

export default Resizable;

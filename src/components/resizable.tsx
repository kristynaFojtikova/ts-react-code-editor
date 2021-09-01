import React from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const verticalProps: ResizableBoxProps = {
    height: 300,
    width: Infinity,
    resizeHandles: ["s"],
    maxConstraints: [Infinity, window.innerHeight * 0.9],
    minConstraints: [Infinity, 50],
  };
  const horizontalProps: ResizableBoxProps = {
    height: Infinity,
    width: window.innerWidth * 0.75,
    resizeHandles: ["e"],
    maxConstraints: [window.innerWidth * 0.9, Infinity],
    minConstraints: [window.innerWidth * 0.2, Infinity],
    className: "resize-horizontal",
  };

  const props = direction === "horizontal" ? horizontalProps : verticalProps;

  return <ResizableBox {...props}>{children}</ResizableBox>;
};

export default Resizable;

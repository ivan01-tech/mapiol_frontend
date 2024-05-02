import React from "react";

type Props = { width?: number; height?: number; className?: string };

function Loading({ width, height, className }: Props) {
  return (
    <div
      className={`h-${height ? width : 10} w-${width ? width : 10} ${className} animate-spin rounded-full border-4 border-solid border-secondary border-t-transparent`}
    ></div>
  );
}

export default Loading;

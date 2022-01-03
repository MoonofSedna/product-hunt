import React from "react";
import Image from "next/image";
// images
import Logo from "../../public/images/P.Hunt.png";

export default function Images({
  width,
  height,
  name,
  className,
  maxWidth,
  maxHeight,
  url,
}) {
  const imagesMap = new Map([["Logo", { src: Logo, alt: "Logo" }]]);
  const image = imagesMap.get(name);

  if (!image) {
    return <React.Fragment />;
  }

  return (
    <Image
      src={image.src || url}
      alt={image.alt || name}
      width={width}
      height={height}
      maxwidth={maxWidth}
      maxheight={maxHeight}
      className={`${className && className} images-style`}
    />
  );
}

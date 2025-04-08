import React from "react";
import { useEffect, useState, ReactNode } from "react";

export interface ImageLoaderProps {
  src: string;
  children: ReactNode;
  onImageLoad: () => void;
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({ src, children, onImageLoad }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setImageLoaded(true);
      onImageLoad();
    };
  }, [src, onImageLoad]);

  if (!imageLoaded) {
    return null;
  }

  return <div>{children}</div>;
};
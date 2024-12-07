import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  errorImg: string;
}

const ErrorCover: FC<Props> = (props) => {
  const { src, alt, width, height, className, errorImg } = props;
  const [imgSrc, setImgSrc] = useState(
    src.trim() ? `${src}?t=${Date.now()}` : errorImg
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src.trim() ? `${src}?t=${Date.now()}` : errorImg);
    setHasError(false);
  }, [src, errorImg]);

  return (
    <Image
      width={width}
      height={height}
      src={imgSrc}
      alt={alt}
      className={className}
      priority={true}
      placeholder="blur"
      blurDataURL={errorImg}
      onError={() => {
        if (!hasError) {
          setImgSrc(errorImg);
          setHasError(true);
        }
      }}
    />
  );
};

export default ErrorCover;

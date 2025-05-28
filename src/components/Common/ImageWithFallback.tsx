import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface Props {
  src: string;
  alt: string;
  fallbackSrc: string;
  isChecked?: boolean;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  isBlur?: boolean;
  loading?: "eager" | "lazy";
}

const ImageWithFallback: FC<Props> = (props) => {
  const {
    src,
    alt,
    fallbackSrc,
    isChecked,
    width,
    height,
    className,
    priority,
    isBlur,
    loading,
    ...rest
  } = props;

  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <>
      {src && src !== "" ? (
        <Image
          width={width}
          height={height}
          src={imgSrc}
          alt={alt}
          className={className}
          onError={() => {
            setImgSrc(fallbackSrc);
          }}
          placeholder={isBlur ? "blur" : "empty"}
          blurDataURL={fallbackSrc}
          priority={priority}
          loading={loading}
          {...rest}
        />
      ) : (
        <Image
          width={width}
          height={height}
          src={fallbackSrc}
          className="w-full h-full object-cover hoverimg"
          alt={fallbackSrc}
          unoptimized={true}
          loading={loading}
          {...rest}
        />
      )}
    </>
  );
};

export default ImageWithFallback;

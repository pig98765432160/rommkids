import React, { FC } from "react";

interface Props {
  videoId: string;
}

const YouTubeEmbed: FC<Props> = (props) => {
  const { videoId } = props;
  return (
    <iframe
      width="100%"
      height="auto"
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        aspectRatio: "16/9",
      }}
    ></iframe>
  );
};

export default YouTubeEmbed;

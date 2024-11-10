import React, { FC } from "react";

interface Props {
  videoId: string;
}

const YouTubeEmbed: FC<Props> = (props) => {
  const { videoId } = props;
  return (
    <iframe
      width="380"
      height="211"
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default YouTubeEmbed;

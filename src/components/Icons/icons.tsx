import React, { FC } from "react";

interface Props {
  width: number | string;
  height: number | string;
  className: string;
  hoverColor?: string;
}

export const FBIcon: FC<Props> = (props) => {
  const { width, height, className } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M35.714.64H4.286A4.286 4.286 0 0 0 0 4.926v31.428a4.286 4.286 0 0 0 4.286 4.286H16.54v-13.6h-5.625v-6.4h5.625v-4.879c0-5.549 3.304-8.614 8.364-8.614 2.423 0 4.957.432 4.957.432v5.447h-2.792c-2.751 0-3.61 1.707-3.61 3.458v4.156h6.142l-.982 6.4h-5.16v13.6h12.255A4.286 4.286 0 0 0 40 36.354V4.926A4.285 4.285 0 0 0 35.714.64z"
        fill="#A0A0A0"
      />
    </svg>
  );
};

export const YTIcon: FC<Props> = (props) => {
  const { width, height, className, hoverColor } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M36.289.64H3.71A3.711 3.711 0 0 0 0 4.351V36.93a3.711 3.711 0 0 0 3.711 3.711H36.29A3.711 3.711 0 0 0 40 36.929V4.35A3.711 3.711 0 0 0 36.289.64z"
        fill={hoverColor}
      />
      <path
        d="M31.916 14.626c-.5-1.538-2.155-2.47-3.677-2.684-5.477-.582-11-.582-16.478 0-1.522.214-3.181 1.137-3.677 2.684a31.232 31.232 0 0 0 0 12.03c.5 1.536 2.155 2.47 3.677 2.684 5.477.582 11 .582 16.478 0 1.522-.214 3.181-1.136 3.677-2.684.78-3.972.78-8.058 0-12.03zM17.009 25.431v-9.582l7.8 4.791-7.8 4.791z"
        fill="#fff"
      />
    </svg>
  );
};

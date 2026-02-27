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

export const IGIcon: FC<Props> = (props) => {
  const { width, height, className, hoverColor } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill="#A0A0A0"
        d="M25 4.5c6.68 0 7.47 0 10.1.15a13.83 13.83 0 014.64.86 7.8 7.8 0 012.88 1.87 7.8 7.8 0 011.87 2.88 13.83 13.83 0 01.86 4.64c.12 2.63.15 3.42.15 10.1s0 7.47-.15 10.1a13.83 13.83 0 01-.86 4.64 8.26 8.26 0 01-4.75 4.75 13.83 13.83 0 01-4.64.86c-2.63.12-3.42.15-10.1.15s-7.47 0-10.1-.15a13.83 13.83 0 01-4.64-.86 7.8 7.8 0 01-2.88-1.87 7.8 7.8 0 01-1.87-2.88 13.83 13.83 0 01-.86-4.64c-.12-2.63-.15-3.42-.15-10.1s0-7.47.15-10.1a13.83 13.83 0 01.86-4.64 7.8 7.8 0 011.87-2.88 7.8 7.8 0 012.88-1.87 13.83 13.83 0 014.64-.86c2.63-.12 3.42-.15 10.1-.15M25 0c-6.79 0-7.64 0-10.31.15a18.28 18.28 0 00-6.07 1.16A12.29 12.29 0 004.2 4.2a12.29 12.29 0 00-2.89 4.42 18.28 18.28 0 00-1.16 6.07C0 17.36 0 18.21 0 25s0 7.64.15 10.31a18.28 18.28 0 001.16 6.07A12.29 12.29 0 004.2 45.8a12.29 12.29 0 004.42 2.89 18.28 18.28 0 006.07 1.16C17.36 50 18.21 50 25 50s7.64 0 10.31-.15a18.28 18.28 0 006.07-1.16 12.89 12.89 0 007.31-7.31 18.28 18.28 0 001.16-6.07C50 32.64 50 31.79 50 25s0-7.64-.15-10.31a18.28 18.28 0 00-1.16-6.07A12.29 12.29 0 0045.8 4.2a12.29 12.29 0 00-4.42-2.89A18.28 18.28 0 0035.31.15C32.64 0 31.79 0 25 0z"
      />
      <path
        fill="#A0A0A0"
        d="M25 12.16A12.84 12.84 0 1037.84 25 12.84 12.84 0 0025 12.16zm0 21.17A8.33 8.33 0 1133.33 25 8.33 8.33 0 0125 33.33z"
      />
      <circle fill="#A0A0A0" cx="38.35" cy="11.65" r="3" />
    </svg>
  );
};

export const YTIcon: FC<Props> = (props) => {
  const { width, height, className, hoverColor } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
      className={className}
    >
      <path
        fill="#A0A0A0"
        d="M508.64,148.79c0-45-33.1-81.2-74-81.2C379.24,65,322.74,64,265,64H247c-57.6,0-114.2,1-169.6,3.6-40.8,0-73.9,36.4-73.9,81.4C1,184.59-.06,220.19,0,255.79q-.15,53.4,3.4,106.9c0,45,33.1,81.5,73.9,81.5,58.2,2.7,117.9,3.9,178.6,3.8q91.2.3,178.6-3.8c40.9,0,74-36.5,74-81.5,2.4-35.7,3.5-71.3,3.4-107Q512.24,202.29,508.64,148.79ZM207,353.89V157.39l145,98.2Z"
      />
    </svg>
  );
};

export const EnvelopeIcon: FC<Props> = (props) => {
  const { width, height, className } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_737_5087)">
        <path
          d="M12.688 1.75H1.312C.589 1.75 0 2.338 0 3.063v7.874c0 .725.588 1.313 1.313 1.313h11.374c.725 0 1.313-.588 1.313-1.313V3.064c0-.725-.588-1.313-1.313-1.313zm0 1.313v1.115c-.614.5-1.591 1.276-3.68 2.912C8.546 7.452 7.634 8.323 7 8.312c-.635.01-1.547-.86-2.007-1.222a272.633 272.633 0 0 1-3.68-2.912V3.063h11.374zM1.312 10.936V5.862c.627.5 1.516 1.2 2.87 2.26.598.47 1.644 1.51 2.818 1.503 1.168.006 2.201-1.017 2.818-1.502a467.87 467.87 0 0 0 2.87-2.26v5.074H1.312z"
          fill="#A0A0A0"
        />
      </g>
      <defs>
        <clipPath id="clip0_737_5087">
          <path fill="#fff" d="M0 0h14v14H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CloseIcon: FC<Props> = (props) => {
  const { width, height, className } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_1072_6197)">
        <path
          d="M1 1.648c.013-.037.027-.072.039-.109a.776.776 0 0 1 1.248-.345c.048.04.091.086.135.13l4.473 4.478c.033.033.053.077.079.116l.05-.003c.027-.038.05-.082.082-.114 1.51-1.513 3.02-3.025 4.531-4.536.268-.268.61-.336.92-.187.45.217.583.79.274 1.183-.04.049-.084.093-.128.137L8.204 6.9c-.033.033-.07.061-.133.115.054.038.096.06.129.093l4.533 4.534c.204.204.307.442.25.73-.059.308-.245.507-.54.605-.018.007-.035.016-.053.024h-.351c-.225-.077-.387-.237-.55-.4-1.462-1.466-2.926-2.93-4.389-4.394l-.116-.111c-.036.046-.062.087-.094.12-1.469 1.47-2.938 2.939-4.405 4.41-.155.156-.312.302-.525.375H1.61c-.168-.06-.332-.13-.434-.282-.072-.108-.118-.234-.176-.352v-.258c.054-.235.203-.404.369-.57C2.847 10.063 4.323 8.584 5.8 7.107c.032-.032.076-.052.137-.093-.07-.056-.11-.082-.143-.115C4.32 5.424 2.847 3.947 1.37 2.475c-.166-.166-.315-.336-.371-.57v-.257z"
          fill="#A0A0A0"
        />
      </g>
      <defs>
        <clipPath id="clip0_1072_6197">
          <path fill="#fff" transform="translate(1 1)" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const DeleteIcon: FC<Props> = (props) => {
  const { width, height, className } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 37 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M31.572 5.968h-4.625A7.473 7.473 0 0 0 19.637 0h-2.985a7.473 7.473 0 0 0-7.31 5.968H4.717a1.492 1.492 0 1 0 0 2.984h1.492v19.395a7.469 7.469 0 0 0 7.46 7.46h8.951a7.469 7.469 0 0 0 7.46-7.46V8.952h1.492a1.492 1.492 0 1 0 0-2.984zm-14.92 19.395a1.492 1.492 0 1 1-2.983 0V16.41a1.492 1.492 0 0 1 2.983 0v8.952zm5.968 0a1.492 1.492 0 1 1-2.984 0V16.41a1.492 1.492 0 0 1 2.984 0v8.952zM12.432 5.968a4.485 4.485 0 0 1 4.22-2.984h2.984a4.485 4.485 0 0 1 4.221 2.984H12.432z"
        fill="#A0A0A0"
      />
    </svg>
  );
};

export const QuestionIcon: FC<Props> = (props) => {
  const { width, height, className } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18.25 9a9 9 0 0 1-9 9 9 9 0 0 1-9-9c0-4.969 4.03-9 9-9s9 4.031 9 9zM9.492 2.976c-1.978 0-3.24.833-4.23 2.314a.436.436 0 0 0 .098.59l1.26.954c.189.144.458.11.604-.077.649-.822 1.093-1.299 2.08-1.299.741 0 1.658.477 1.658 1.196 0 .544-.448.823-1.18 1.233-.854.479-1.984 1.075-1.984 2.565v.145c0 .24.195.435.436.435h2.032c.24 0 .436-.195.436-.435v-.049c0-1.033 3.018-1.075 3.018-3.87 0-2.105-2.183-3.702-4.228-3.702zm-.242 9c-.92 0-1.67.749-1.67 1.67 0 .92.75 1.668 1.67 1.668.92 0 1.67-.748 1.67-1.669 0-.92-.75-1.67-1.67-1.67z"
        fill="#A0A0A0"
      />
    </svg>
  );
};

export const ErrorIcon: FC<Props> = (props) => {
  const { width, height, className } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M67.5 35c0 17.95-14.55 32.5-32.5 32.5S2.5 52.95 2.5 35 17.05 2.5 35 2.5 67.5 17.05 67.5 35z"
        fill="#fff"
        stroke="#DFE3E8"
        strokeWidth="5"
      />
      <path
        d="M45.995 27.666l-7.332 7.335 7.332 7.334L42.33 46l-7.332-7.332L27.667 46 24 42.335 31.332 35 24 27.667 27.666 24l7.332 7.332L42.33 24l3.665 3.666z"
        fill="red"
      />
    </svg>
  );
};

export const SuccessIcon: FC<Props> = (props) => {
  const { width, height, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 70 70"
      fill="none"
      className={className}
    >
      <path
        d="M67.5 35C67.5 52.9493 52.9493 67.5 35 67.5C17.0507 67.5 2.5 52.9493 2.5 35C2.5 17.0507 17.0507 2.5 35 2.5C52.9493 2.5 67.5 17.0507 67.5 35Z"
        fill="white"
        stroke="#DFE3E8"
        strokeWidth="5"
      />
      <path
        d="M47.8178 23.916L51.9125 28.0723L35.0168 44.7178C33.8875 45.8471 32.4041 46.409 30.9125 46.409C29.4209 46.409 27.9225 45.8402 26.7822 44.7027L18.668 36.84L22.7313 32.6482L30.877 40.5438L47.8205 23.916H47.8178Z"
        fill="#68AA01"
      />
    </svg>
  );
};

export const InfoIcon: FC<Props> = (props) => {
  const { width, height, className } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 37 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_745_5131)">
        <path
          d="M36.241 17.903A17.903 17.903 0 1 1 18.338 0a17.923 17.923 0 0 1 17.903 17.903zm-14.92 0a2.984 2.984 0 0 0-2.983-2.984h-2.984v2.984h2.984v10.444h2.984V17.903zM18.339 7.46a2.238 2.238 0 1 0 0 4.476 2.238 2.238 0 0 0 0-4.476z"
          fill="#A0A0A0"
        />
      </g>
      <defs>
        <clipPath id="clip0_745_5131">
          <path
            fill="#fff"
            transform="translate(.435)"
            d="M0 0h35.806v35.806H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const NoticeIcon: FC<Props> = (props) => {
  const { width, height, className } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 14a7 7 0 1 0-7-7 7.008 7.008 0 0 0 7 7zM6.417 3.5a.583.583 0 1 1 1.166 0v4.667a.583.583 0 1 1-1.166 0V3.5zm.583 7a.583.583 0 1 1 0 1.167.583.583 0 0 1 0-1.167z"
        fill="#A0A0A0"
      />
    </svg>
  );
};

export const DropDownIcon: FC<Props> = (props) => {
  const { width, height, className } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.002 9.727a2.084 2.084 0 0 1-1.475-.609L2.123 5.714a.418.418 0 1 1 .591-.591l3.404 3.404a1.25 1.25 0 0 0 1.767 0l3.404-3.404a.418.418 0 0 1 .592.591L8.477 9.118a2.083 2.083 0 0 1-1.475.609z"
        fill="#A0A0A0"
      />
    </svg>
  );
};

export const HeartIcon: FC<Props> = (props) => {
  const { width, height, className } = props;
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      focusable="false"
      role="img"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M7.999 14s6.666-3.917 6.666-8.16a3.856 3.856 0 0 0-1.115-2.715 3.758 3.758 0 0 0-5.55.2 3.79 3.79 0 0 0-1.287-.976 3.758 3.758 0 0 0-4.265.776A3.856 3.856 0 0 0 1.332 5.84c0 4.243 6.667 8.16 6.667 8.16ZM5.139 3.333c-.652 0-1.28.262-1.745.73a2.522 2.522 0 0 0-.729 1.777c0 .713.283 1.5.827 2.34.54.833 1.285 1.633 2.068 2.343A21.623 21.623 0 0 0 8 12.418a22.474 22.474 0 0 0 2.438-1.895c.784-.71 1.528-1.51 2.068-2.343.544-.84.827-1.627.827-2.34 0-.668-.263-1.307-.729-1.776a2.424 2.424 0 0 0-3.59.127L7.998 5.377 6.985 4.191a2.424 2.424 0 0 0-1.845-.858Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

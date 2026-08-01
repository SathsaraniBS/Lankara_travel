import React from "react";
import { Link } from "react-router-dom";

const STYLES = ["btn--primary", "btn--outline"];
const SIZES = ["btn--medium", "btn--large", "btn--mobile"];

// .btn--primary / .btn--outline
const STYLE_CLASSES = {
  "btn--primary": "bg-white text-[#222] border border-white",
  "btn--outline": "bg-transparent text-white border border-white",
};

// .btn--medium / .btn--large / .btn--mobile (+ their :hover rules)
const SIZE_CLASSES = {
  "btn--medium":
    "px-5 py-2 text-xl hover:bg-white hover:text-[#222] hover:duration-300 hover:ease-out",
  "btn--large":
    "px-[26px] py-3 text-xl hover:bg-white hover:text-[#222] hover:duration-300 hover:ease-out",
  "btn--mobile": "px-5 py-2 text-base",
};

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  to = "/",
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to={to} className="max-[768px]:block max-[768px]:no-underline">
      <button
        className={`rounded-[2px] outline-none cursor-pointer m-2 flex justify-center items-center
        transition-all duration-500 ease-in-out max-[768px]:w-full
        ${STYLE_CLASSES[checkButtonStyle]} ${SIZE_CLASSES[checkButtonSize]}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
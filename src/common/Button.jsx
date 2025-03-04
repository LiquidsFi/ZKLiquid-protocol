import React from "react";
import clsx from "clsx";

const Button = ({
  children,
  className,
  bgColor = "bg-[#1F3E85]",
  textColor = "text-[#FFFFFF]",
  rounded = "rounded-[8px]",
  height = "h-[44px]",
  px = "px-4",
  fontSize = "text-[14px]",
  leading = "leading-[20px]",
  font = "font-display font-bold",
  ...rest
}) => {
  return (
    <button
      type="submit"
      className={clsx(
        bgColor,
        textColor,
        rounded,
        height,
        px,
        fontSize,
        leading,
        font,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

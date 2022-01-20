import React from "react";

function Button(props) {
  return (
    <button
      type="submit"
      className={`p-6   flex justify-center rounded-[38px] cursor-pointer transform scale-75 md:scale-100 
      ${props.size === "small" ? "w-[275px]" : "w-[275px] md:w-[400px]"} 
      ${
        props.bg === "light"
          ? "bg-[#E5F7FF] text-[#00709F]"
          : "bg-[#4CC2F4] text-white"
      } `}
      onClick={props.onClick}
    >
      <div className="text-[24px]  font-semibold">{props.text}</div>
    </button>
  );
}

export default Button;

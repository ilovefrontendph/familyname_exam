import React from "react";
import logo from "../assets/logo.png";
import exit_btn from "../assets/exit_btn.png";

function Modal(props) {
  return (
    <div className="fixed flex justify-center items-center h-screen w-screen  bg-black/[0.5] left-0 top-0 z-10">
      <div className=" transform scale-75 md:scale-100">
        <div className="p-6 flex justify-center items-center bg-[#5DCFFF]  md:space-x-[100px]">
          <div className="w-[100px] md:w-[170px]">
            <img src={logo} />
          </div>
          <div className="flex flex-col justify-center items-center ">
            <div className="hidden md:flex text-[30px] text-white">
              Licensing Of Vehicle for Everyone
            </div>
            <div>{props.title}</div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              props.setShowModal(!props.showModal);
            }}
          >
            <img src={exit_btn} />
          </div>
        </div>
        {props.content}
      </div>
    </div>
  );
}

export default Modal;

"use client";
import search from "../../public/pin.svg";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Modal = ({ setShowModal, showModal, event }) => {
  const handleClick = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [showModal]);

  if (!showModal || !event) return null;

  return (
    <>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-4">
                <div className="w-full h-full">
                  <div className="flex text-[1.875rem] font-semibold justify-between mb-4">
                    <span>{event.title.slice(0, 12)}...</span>
                    <div className="bg-[#ECEAFF] px-2 py-2 w-[12.3rem] h-fit p-2 text-sm text-[#5041BC] ml-16">
                      {event.start}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <span className="text-[#475569] text-xl mb-4">
                      Category: AI
                    </span>
                    <hr />
                    <p>Description:</p>
                    <span className="text-base text-[#9E9E9E]">
                      {event.description}
                    </span>
                    <p>Location: {event.location.join(", ")}</p>
                    <hr />
                    <div className="flex">
                      <Image src={search} alt="search" className="mr-2" />
                      <span>Bahria Intellectual Village</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;

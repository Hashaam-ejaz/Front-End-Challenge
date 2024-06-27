import Image from "next/image";
import eventBadge from "../../public/eventBadge.svg";
import group from "../../public/group.png";
import pin from "../../public/pin.svg";
const EventMonth = () => {
  return (
    <div className="h-[12rem] rounded-[0.375rem] backgroundOverlay mx-[1.375rem] flex flex-col items-center justify-center">
      <div className="flex h-full font-bold text-2xl text-white mt-4 mx-4 justify-around gap-[8rem]">
        <div className="flex flex-col ">
          <div className="flex">Event of</div>
          <div className="flex">the month</div>
        </div>
        <div className="flex flex-col">
          <Image src={eventBadge} alt="badge" />
        </div>
      </div>
      <div className="flex h-full w-[22.5rem] bg-white rounded-[0.375rem] mx-4 mb-4 mt-0 pt-0">
        <div className="flex gap-16">
          <div className="flex flex-col text-[0.75rem] ml-[0.938rem] mt-[0.688rem]">
            <div className="flex text-[#5041BC] font-bold">Web Development</div>
            <div className="flex">
              Category: <span className="text-[#797D8C]"> AI</span>
            </div>
            <div className="flex">
              <Image src={pin} alt="pin" className="mr-[0.094rem]" /> Bahria
              Intellectual Village
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <Image src={group} alt="group" />
            </div>
            <div className="flex text-[#D2D2D2] text-[0.75rem] mt-[-1rem]">
              Thu 2 Nov 2023
            </div>
            <div className="flex  text-[#D2D2D2] text-[0.75rem]">12:00 am</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { EventMonth };

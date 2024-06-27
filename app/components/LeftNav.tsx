import Image from "next/image";
import eventSidebarButton from "../../public/eventSidebarButton.svg";
import heartSidebar from "../../public/heartSidebar.svg";
const LeftNav = () => {
  return (
    <div className="w-[5rem] rounded-[2.5rem] bg-white mx-[1.375rem] hidden md:flex md:flex-col">
      <div className="flex justify-center mt-[1.75rem]">
        <Image
          src={eventSidebarButton}
          alt="button"
          className="w-[3rem] h-[3rem]"
        />
      </div>
      <div className="flex justify-center mt-[2.75rem]">
        <Image
          src={heartSidebar}
          alt="button"
          className="w-[1.563rem] h-[1.563rem]"
        />
      </div>
    </div>
  );
};
export { LeftNav };

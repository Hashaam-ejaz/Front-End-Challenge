import Image from "next/image";
import stixorLogo from "../../public/stixorLogo.svg";
import menuNavbar from "../../public/menuNavbar.svg";
import search from "../../public/Search.svg";
const Navbar = () => {
  return (
    <div className="flex h-[4.438rem] mx-[1.375rem] mt-[1.125rem] pb-0 ">
      <div className="flex flex-col h-[2.188rem] ml-5 md:mr-[4rem] mr-[0.5rem]">
        <div className="flex justify-center">
          <Image src={stixorLogo} alt="Stixor Logo" />
        </div>
      </div>
      <div className="flex flex-col h-[2.25rem] ml-[0.5rem] rounded-[0.375rem] bg-[#F9FAFC] max-w-[36rem] w-[18.75rem] md:w-[36rem]">
        <div className="flex items-center">
          <Image src={search} alt="Stixor Logo" className="ml-2 mt-1" />
          <input
            type="text"
            name="NavbarSearch"
            className="outline-none w-full h-full bg-[#F9FAFC] mt-2"
            placeholder="Search events..."
          />
        </div>
      </div>
      <div className="flex flex-col h-[2.188rem] md:hidden ml-[0.875rem]">
        <div className="flex justify-center">
          <Image src={menuNavbar} alt="Stixor Logo" />
        </div>
      </div>
    </div>
  );
};

export { Navbar };

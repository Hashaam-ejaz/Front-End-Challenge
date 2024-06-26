import Image from "next/image";
import stixorLogo from "../../public/stixorLogo.svg";
import menuNavbar from "../../public/menuNavbar.svg";
import search from "../../public/Search.svg";
const Navbar = () => {
  return (
    <div className="flex h-[4.438rem] mx-[1.375rem] my-[1.125rem]">
      <div className="flex flex-col w-1/5 h-[2.188rem]">
        <div className="flex justify-center">
          <Image src={stixorLogo} alt="Stixor Logo" />
        </div>
      </div>
      <div className="flex flex-col w-3/5 h-[2.25rem] ml-[0.5rem] rounded-[0.375rem] bg-[#F9FAFC] max-w-[36rem]">
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
      <div className="flex flex-col w-1/5 h-[2.188rem] md:hidden">
        <div className="flex justify-center">
          <Image src={menuNavbar} alt="Stixor Logo" />
        </div>
      </div>
    </div>
  );
};

export { Navbar };

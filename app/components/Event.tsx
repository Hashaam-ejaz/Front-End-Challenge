import Image from "next/image";
import emptyHeart from "../../public/emptyHeart.svg";
import heart from "../../public/heart.svg";

interface eventPropTypes {
  id: number;
  title: string;
  start: string;
  location: [number, number];
}

const Event: React.FC<{ eventProps: eventPropTypes; id: number }> = ({
  eventProps,
  id,
}) => {
  return (
    <div className="w-full mt-[0.875rem] h-[2.118rem] flex justify-around items-center border-[#F3F3F3] text-[0.65rem] bg-white rounded-md">
      <div className="flex max-w-[5.75rem] truncate">{id}</div>
      <div className="flex font-medium text-[#797D8C] max-w-[5rem] truncate">
        {eventProps.title}
      </div>
      <div className="flex max-w-[5.75rem] truncate">
        {eventProps.start.slice(11, -1)}
      </div>
      <div className="flex max-w-[5.75rem] truncate">
        {eventProps.start.slice(0, 10)}
      </div>
      <div className="flex font-medium text-[#797D8C] max-w-[5.75rem] truncate">
        {eventProps.location}
      </div>
      <div className="flex">
        <div className="flex justify-center items-center w-[0.813rem] h-[0.8rem]">
          <Image src={emptyHeart} alt="Empty Heart" />
        </div>
      </div>
    </div>
  );
};

export { Event };

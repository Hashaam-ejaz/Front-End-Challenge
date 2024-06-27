import Image from "next/image";
import emptyHeart from "../../public/emptyHeart.svg";

interface eventPropTypes {
  id: number;
  title: string;
  start: string;
  location: [number, number];
}

const UpcomingEvent: React.FC<{ eventProps: eventPropTypes; id: number }> = ({
  eventProps,
  id,
}) => {
  return (
    <div className="flex w-[11rem] md:w-[20.75rem] max-w-full h-[2.875rem] text-[#797D8C] border border-[#F3F3F3] mb-[0.375rem] rounded-[0.25rem]">
      <div className="flex flex-col w-3/4">
        <span className="text-[0.738rem] font-semibold truncate text-black">
          {eventProps.title}
        </span>
        <span className="text-[0.554rem] font-normal truncate">
          {eventProps.start.slice(11, -1)}
        </span>
        <span className="text-[0.554rem] font-normal truncate">
          {eventProps.start.slice(0, 10)}
        </span>
      </div>
      <div className="flex w-1/4">
        <Image src={emptyHeart} alt="heart" />
      </div>
    </div>
  );
};

export { UpcomingEvent };

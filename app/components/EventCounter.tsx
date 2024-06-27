interface EventCounterProps {
  title: string;
  eventNum: number;
}

const EventCounter: React.FC<EventCounterProps> = ({ title, eventNum }) => {
  return (
    <div className="flex w-[7.563rem] h-[6.25rem] bg-white md:w-[16.688rem]">
      <div className="flex flex-col md:flex-row">
        <div className="flex text-sm font-semibold text-[#797D8C] text-center items-center justify-center px-4 pt-4">
          {title}
        </div>
        <div className="flex text-[2rem] font-bold justify-center items-center md:mt-2">
          {eventNum}
        </div>
      </div>
    </div>
  );
};

export { EventCounter };

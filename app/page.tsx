import { EventList } from "./components/EventList";
import { LeftNav } from "./components/LeftNav";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { EventMonth } from "./components/EventMonth";
export default function Home() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col md:flex-row-reverse">
        <div className="flex flex-col order-first md:order-first">
          <UpcomingEvents />
          <div className="hidden md:flex">
            {" "}
            <EventMonth />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <LeftNav />
          <EventList />
          <div className="flex md:hidden justify-center">
            <EventMonth />
          </div>
        </div>
      </div>
    </div>
  );
}

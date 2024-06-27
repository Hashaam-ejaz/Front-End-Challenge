import { EventList } from "./components/EventList";
import { LeftNav } from "./components/LeftNav";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { EventMonth } from "./components/EventMonth";
export default function Home() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col md:flex-row-reverse">
        <div className="flex flex-col order-last md:order-first">
          {" "}
          {/* Adjust order on mobile */}
          <UpcomingEvents />
          <EventMonth />
        </div>
        <div className="flex md:flex-row flex-col">
          <LeftNav />
          <EventList />
        </div>
      </div>
    </div>
  );
}

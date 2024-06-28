"use client";
import { useEffect, useState } from "react";
import { UpcomingEvent } from "./UpcomingEvent";
import eventType from "../types/Event";

const UpcomingEvents = () => {
  const [events, setEvents] = useState<eventType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://api.predicthq.com/v1/events", {
          method: "GET",
          headers: {
            Authorization: "Bearer 1_RzCNAPNdliim07v8NL_uEJvKup1xB8y4YmTFBH",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching events: ${response.statusText}`);
        }

        const eventsData = await response.json();
        const sortedEvents = eventsData.results.sort(
          (a: any, b: any) =>
            new Date(a.start).getTime() - new Date(b.start).getTime()
        );
        setEvents(sortedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="loader flex justify-center items-center w-screen h-screen ml-40"></div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-[0.375rem] m-[1.375rem] h-fit md:w-[23.75rem]">
      <span className="text-base font-normal">Upcoming events</span>
      <div className="flex md:flex-col mt-[0.625rem] gap-4 md:gap-0">
        <div className="flex flex-col w-1/2 items-center md:w-full">
          {events &&
            events
              .slice(0, 3)
              .map((event, index) => (
                <UpcomingEvent eventProps={event} key={index} id={index} />
              ))}
        </div>
        <div className="flex flex-col w-1/2 items-center md:w-full">
          {events &&
            events
              .slice(3, 6)
              .map((event, index) => (
                <UpcomingEvent eventProps={event} key={index} id={index} />
              ))}
        </div>
      </div>
    </div>
  );
};

export { UpcomingEvents };

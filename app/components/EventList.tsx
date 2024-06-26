"use client";
import menuButton from "../../public/eventMenu.svg";
import { Event } from "./Event";
import Image from "next/image";
import { useEffect, useState } from "react";
const EventList = () => {
  interface eventPropTypes {
    id: number;
    title: string;
    start: string;
    location: [number, number];
  }
  const [events, setEvents] = useState<eventPropTypes[] | null>();
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
        console.log(eventsData);
        setEvents(eventsData.results);
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
    return <div className="flex w-screen justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:w-[53.875rem] mx-[1.25rem]">
      <div className="flex justify-between">
        <div className="text-base font-semibold">Events List</div>
        <div className="w-[1.563rem] h-[1.563rem]">
          <Image src={menuButton} alt="Menu Button" />
        </div>
      </div>
      <div className="flex text-base font-semibold justify-between">
        <div className="flex flex-col pl-12">#</div>
        <div className="flex flex-col">Name</div>
        <div className="flex flex-col">Time</div>
        <div className="flex flex-col">Date</div>
        <div className="flex flex-col">Location</div>
        <div className="flex flex-col min-w-[2rem]"></div>
      </div>
      {events &&
        events.map((event, index) => (
          <Event key={event.id} eventProps={event} id={index} />
        ))}
    </div>
  );
};

export { EventList };

"use client";
import menuButton from "../../public/eventMenu.svg";
import { Event } from "./Event";
import { EventCounter } from "./EventCounter";
import Modal from "../components/modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import event from "../types/Event";

const EventList = () => {
  const [events, setEvents] = useState<event[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<event | null>(null);
  const [allEventsCount, setAllEventsCount] = useState<number>(0);
  const [thisMonthEventsCount, setThisMonthEventsCount] = useState<number>(0);

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
        setEvents(eventsData.results);
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const allEvents = eventsData.results.length;
        const thisMonthEvents = eventsData.results.filter((event: event) => {
          const eventDate = new Date(event.start);
          return (
            eventDate.getMonth() === currentMonth &&
            eventDate.getFullYear() === currentYear
          );
        }).length;

        setAllEventsCount(allEvents);
        setThisMonthEventsCount(thisMonthEvents);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event: event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="loader flex justify-center items-center w-screen h-screen"></div>
    );
  }

  return (
    <div className="flex flex-col w-full md:w-[53.875rem] mx-[1.25rem]">
      <div className="flex justify-between">
        <div className="text-base font-semibold">Events List</div>
        <div className="w-[1.563rem] h-[1.563rem]">
          <Image src={menuButton} alt="Menu Button" />
        </div>
      </div>
      <div className="flex text-base font-semibold justify-between">
        <div className="flex flex-col pl-8">#</div>
        <div className="flex flex-col">Name</div>
        <div className="flex flex-col">Time</div>
        <div className="flex flex-col">Date</div>
        <div className="flex flex-col">Location</div>
        <div className="flex flex-col min-w-[2rem]"></div>
      </div>
      {events &&
        events.map((event, index) => (
          <Event
            key={event.id}
            eventProps={event}
            id={index}
            modalOpen={() => handleEventClick(event)}
          />
        ))}
      <Modal
        setShowModal={setShowModal}
        showModal={showModal}
        event={selectedEvent}
      />
      <div className="flex w-full md:w-[53.875rem] justify-evenly mt-[1.188rem] mx-[1.375rem] mb-[1.25rem]">
        <EventCounter title="All Events" eventNum={allEventsCount} />
        <EventCounter
          title="This Months Events"
          eventNum={thisMonthEventsCount}
        />
        <EventCounter title="Favourite Events" eventNum={0} />
      </div>
    </div>
  );
};

export { EventList };

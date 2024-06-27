"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Event } from "./Event";
import { EventCounter } from "./EventCounter";
import Modal from "../components/modal";
import CategoryFilterModal from "../components/CategoryFilterModal";
import EventType from "../types/Event";

const EventList = () => {
  const [events, setEvents] = useState<EventType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [allEventsCount, setAllEventsCount] = useState<number>(0);
  const [thisMonthEventsCount, setThisMonthEventsCount] = useState<number>(0);
  const [showCategoryFilterModal, setShowCategoryFilterModal] =
    useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [eventCategories, setEventCategories] = useState<string[]>([]); // State to hold event categories

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

        // Extract and set event categories
        const categories: string[] = eventsData.results.map(
          (event: EventType) => event.category
        );
        const uniqueCategories = Array.from(new Set(categories)); // Ensure uniqueness
        setEventCategories(uniqueCategories);

        // Calculate event counts
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const allEvents = eventsData.results.length;
        const thisMonthEvents = eventsData.results.filter(
          (event: EventType) => {
            const eventDate = new Date(event.start);
            return (
              eventDate.getMonth() === currentMonth &&
              eventDate.getFullYear() === currentYear
            );
          }
        ).length;

        setAllEventsCount(allEvents);
        setThisMonthEventsCount(thisMonthEvents);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false); // Ensure loading state is updated on error
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event: EventType) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setShowCategoryFilterModal(false); // Close modal after selecting category
  };

  const handleCloseCategoryFilterModal = () => {
    setShowCategoryFilterModal(false);
  };

  // Filter events based on selectedCategory
  const filteredEvents = selectedCategory
    ? events?.filter((event: EventType) => event.category === selectedCategory)
    : events;

  if (loading) {
    return (
      <div className="loader flex justify-center items-center w-screen h-screen"></div>
    );
  }

  return (
    <div className="flex flex-col w-full md:w-[53.875rem] mx-[1.25rem]">
      <div className="flex justify-between items-center">
        <div className="text-base font-semibold">Events List</div>
        <div
          className="w-[1.563rem] h-[1.563rem] cursor-pointer"
          onClick={() => setShowCategoryFilterModal(true)}
        >
          <Image
            src="/eventMenu.svg"
            alt="Menu Button"
            width={20}
            height={20}
          />
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
      {filteredEvents && filteredEvents.length > 0 ? (
        filteredEvents.map((event, index) => (
          <Event
            key={event.id}
            eventProps={event}
            id={index + 1}
            modalOpen={() => handleEventClick(event)}
          />
        ))
      ) : (
        <div className="text-center mt-4">No events found.</div>
      )}
      <Modal
        setShowModal={setShowEventModal}
        showModal={showEventModal}
        event={selectedEvent}
      />
      <CategoryFilterModal
        showModal={showCategoryFilterModal}
        onSelectCategory={handleCategorySelect}
        onCloseModal={handleCloseCategoryFilterModal}
        categories={eventCategories} // Pass eventCategories state as prop
      />
      <div className="flex w-full md:w-[53.875rem] justify-evenly mt-[1.188rem] mx-[1.375rem] mb-[1.25rem]">
        <EventCounter title="All Events" eventNum={allEventsCount} />
        <EventCounter
          title="This Month's Events"
          eventNum={thisMonthEventsCount}
        />
        <EventCounter title="Favourite Events" eventNum={0} />
      </div>
    </div>
  );
};

export { EventList };

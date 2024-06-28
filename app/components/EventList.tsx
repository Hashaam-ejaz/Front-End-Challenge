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
  const [eventCategories, setEventCategories] = useState<string[]>([]);
  const [selectedFromDate, setSelectedFromDate] = useState<string | null>(null);
  const [selectedToDate, setSelectedToDate] = useState<string | null>(null);

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

  // Filter events based on selectedCategory, selectedFromDate, and selectedToDate
  const filteredEvents = events?.filter((event: EventType) => {
    let matchesCategory = true;
    let matchesFromDate = true;
    let matchesToDate = true;

    if (selectedCategory) {
      matchesCategory = event.category === selectedCategory;
    }

    if (selectedFromDate) {
      matchesFromDate = new Date(event.start) >= new Date(selectedFromDate);
    }

    if (selectedToDate) {
      matchesToDate = new Date(event.start) <= new Date(selectedToDate);
    }

    return matchesCategory && matchesFromDate && matchesToDate;
  });

  return (
    <div className="flex flex-col w-full max-w-full md:max-w-[53.875rem] mx-auto overflow-x-hidden px-4 md:px-0">
      {loading ? (
        <div className="flex justify-center items-center w-full h-32">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="text-base font-semibold">Events List</div>
            <div
              className="w-6 h-6 cursor-pointer"
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
          <div className="grid grid-cols-5 gap-2 text-base font-semibold mb-2">
            <div className="pl-4">#</div>
            <div>Name</div>
            <div>Time</div>
            <div>Date</div>
            <div>Location</div>
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
            categories={eventCategories}
            setSelectedFromDate={setSelectedFromDate}
            setSelectedToDate={setSelectedToDate}
          />
          <div className="flex justify-evenly mt-4 mb-4">
            <EventCounter title="All Events" eventNum={allEventsCount} />
            <EventCounter
              title="This Month's Events"
              eventNum={thisMonthEventsCount}
            />
            <EventCounter title="Favourite Events" eventNum={0} />
          </div>
        </div>
      )}
    </div>
  );
};

export { EventList };

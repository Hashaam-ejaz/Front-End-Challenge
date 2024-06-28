"use client";
import Image from "next/image";
import eventBadge from "../../public/eventBadge.svg";
import group from "../../public/group.png";
import pin from "../../public/pin.svg";
import { useEffect, useState } from "react";
import eventType from "../types/Event";

const EventMonth = () => {
  const [highestRankEvent, setHighestRankEvent] = useState<eventType | null>(
    null
  );

  useEffect(() => {
    const fetchHighestRankEvent = async () => {
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

        if (eventsData.results.length === 0) {
          setHighestRankEvent(null);
          return;
        }

        const highestRankEvent = eventsData.results.reduce(
          (max: eventType, event: eventType) => {
            return event.rank > max.rank ? event : max;
          },
          eventsData.results[0]
        );

        setHighestRankEvent(highestRankEvent);
      } catch (error) {
        console.error("Error fetching highest rank event:", error);
      }
    };

    fetchHighestRankEvent();
  }, []);

  if (!highestRankEvent) {
    return (
      <div className="loader flex justify-center items-center ml-40 mt-32"></div>
    );
  }

  return (
    <div className="h-[14rem] rounded-[0.375rem] backgroundOverlay mx-[1.375rem] flex flex-col items-center justify-center">
      <div className="flex h-full font-bold text-2xl text-white mt-4 mx-4 justify-around gap-[8rem]">
        <div className="flex flex-col ">
          <div className="flex">Event of</div>
          <div className="flex">the month</div>
        </div>
        <div className="flex flex-col">
          <Image src={eventBadge} alt="badge" />
        </div>
      </div>
      <div className="flex h-full w-3/4 max-w-[22.5rem] bg-white rounded-[0.375rem] mx-4 mb-4 mt-0 pt-0">
        <div className="flex gap-16">
          <div className="flex flex-col text-[0.75rem] ml-[0.938rem] mt-[0.688rem]">
            <div className="flex text-[#5041BC] font-bold ">
              {highestRankEvent.title}
            </div>
            <div className="flex">
              Category:{" "}
              <span className="text-[#797D8C]">
                {" "}
                {highestRankEvent.category}
              </span>
            </div>
            <div className="flex">
              <Image src={pin} alt="pin" className="mr-[0.094rem]" />{" "}
              <span className="truncate w-[8rem]">
                {highestRankEvent?.entities[0]?.formatted_address}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <Image src={group} alt="group" />
            </div>
            <div className="flex text-[#D2D2D2] text-[0.75rem] mt-[-1rem]">
              {new Date(highestRankEvent.start_local).toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            </div>
            <div className="flex text-[#D2D2D2] text-[0.75rem]">
              {new Date(highestRankEvent.start_local).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EventMonth };

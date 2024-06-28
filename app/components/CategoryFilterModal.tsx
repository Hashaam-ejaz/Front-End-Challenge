import React, { useEffect } from "react";

interface CategoryFilterModalProps {
  showModal: boolean;
  onSelectCategory: (category: string | null) => void;
  onCloseModal: () => void;
  categories: string[];
  setSelectedFromDate: (date: string | null) => void;
  setSelectedToDate: (date: string | null) => void;
}

const CategoryFilterModal: React.FC<CategoryFilterModalProps> = ({
  showModal,
  onSelectCategory,
  onCloseModal,
  categories,
  setSelectedFromDate,
  setSelectedToDate,
}) => {
  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "") {
      onSelectCategory(null);
    } else {
      onSelectCategory(selectedCategory);
    }
  };

  const handleFromDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFromDate(e.target.value);
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedToDate(e.target.value);
  };

  const generateDateOptions = () => {
    const dates = [];
    const now = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(now.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const dateOptions = generateDateOptions();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".bg-white")) {
        onCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, onCloseModal]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 ${
        showModal ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-lg w-[15.625rem] md:w-[30rem] h-[21rem] flex flex-col ml-[1.25rem]">
        <div className="text-sm font-normal mt-[1.063rem] mb-[0.75rem]">
          Category
        </div>
        <div className="flex mb-[1.625rem]">
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={handleCategorySelect}
          >
            <option defaultChecked value="">
              None
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex font-normal text-sm mb-[0.813rem]">
          Date & Time
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col mb-[0.375rem] md:mb-0">
            <div className="mb-[0.375rem]">From</div>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={handleFromDateChange}
            >
              <option value="">Select Date</option>
              {dateOptions.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mt-[0.75rem] md:mt-0">
            <div className="mb-[0.375rem]">To</div>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={handleToDateChange}
            >
              <option value="">Select Date</option>
              {dateOptions.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterModal;

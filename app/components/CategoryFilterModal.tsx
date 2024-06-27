import React, { useEffect } from "react";

interface CategoryFilterModalProps {
  showModal: boolean;
  onSelectCategory: (category: string | null) => void; // Updated to accept null
  onCloseModal: () => void;
  categories: string[];
}

const CategoryFilterModal: React.FC<CategoryFilterModalProps> = ({
  showModal,
  onSelectCategory,
  onCloseModal,
  categories,
}) => {
  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "") {
      onSelectCategory(null); // Handle "None" option
    } else {
      onSelectCategory(selectedCategory);
    }
  };

  // Add event listener when component mounts to handle click outside modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".bg-white")) {
        onCloseModal(); // Close modal if clicked outside the modal content
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
      <div className="bg-white p-4 rounded-lg w-[15.625rem] h-[18rem] flex flex-col ml-[1.25rem]">
        <div className="text-sm font-normal  mt-[1.063rem] mb-[0.75rem]">
          Category
        </div>
        <div className="flex mb-[1.625rem]">
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={handleCategorySelect}
          >
            <option defaultChecked value="">
              None
            </option>{" "}
            {/* Add "None" option */}
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
        <div className="flex mb-[0.375rem]">From</div>
        <div className="flex">Date from Dropdown</div>
        <div className="flex mb-[0.375rem] mt-[0.75rem]">To</div>
        <div className="flex">Date To Dropdown</div>
      </div>
    </div>
  );
};

export default CategoryFilterModal;

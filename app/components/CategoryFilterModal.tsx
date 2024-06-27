import React, { useEffect } from "react";

interface CategoryFilterModalProps {
  showModal: boolean;
  onSelectCategory: (category: string) => void;
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
    onSelectCategory(selectedCategory);
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
      <div className="bg-white p-4 rounded-lg">
        <div className="text-lg font-semibold mb-2">Filter by Category</div>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={handleCategorySelect}
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoryFilterModal;

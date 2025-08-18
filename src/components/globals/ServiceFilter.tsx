import React, { useState } from "react";
import { X, Search, MapPin, SlidersHorizontal, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterState {
  category: string;
  service: string;
  location: string;
  priceRange: [number, number];
  rating: number;
}

const ServiceFilter: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    service: "",
    location: "",
    priceRange: [10500, 155500],
    rating: 0,
  });

  const categories = [
    "All Categories",
    "Home Cleaning",
    "Repairs & Fixing",
    "Plumbing",
    "Electrical",
    "Gardening",
    "Painting",
  ];

  const services = [
    "House Cleaning",
    "Apartment Cleaning",
    "Office Cleaning",
    "Deep Cleaning",
    "Move-in/Move-out Cleaning",
  ];

  const locations = [
    "All Locations",
    "Lagos, Nigeria",
    "Abuja, Nigeria",
    "Port Harcourt, Nigeria",
    "Ibadan, Nigeria",
    "Kano, Nigeria",
  ];

  const handleApplyFilter = () => {
    console.log("Applying filters:", filters);
    setIsModalOpen(false);
  };

  const handleClearFilter = () => {
    setFilters({
      category: "",
      service: "",
      location: "",
      priceRange: [10500, 155500],
      rating: 0,
    });
  };

  const handlePriceRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = parseInt(e.target.value);
    const newRange: [number, number] = [...filters.priceRange];
    newRange[index] = value;

    if (index === 0 && value <= filters.priceRange[1]) {
      newRange[0] = value;
    } else if (index === 1 && value >= filters.priceRange[0]) {
      newRange[1] = value;
    }

    setFilters({ ...filters, priceRange: newRange });
  };

  // Animation variants
  const backdropVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const modalVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4,
      },
    },
    exit: {
      y: "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  // Desktop Filter Row
  const DesktopFilterRow = () => (
    <div className="hidden md:flex items-center gap-4 p-4">
      <div className="relative">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="appearance-none bg-white border border-[#F0F0F0] rounded-lg px-4 py-2 pr-8 min-w-[120px] text-gray-700 focus:outline-none focus:border-teal-500 focus:bg-white"
        >
          <option value="">Category</option>
          {categories.map((cat) => (
            <option className="bg-yellow-500" key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex-1 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="What services are you looking for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white pl-10 pr-4 py-2 border border-[#F0F0F0] rounded-lg focus:outline-none focus:border-teal-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Service Dropdown */}
      <div className="relative">
        <select
          value={filters.service}
          onChange={(e) => setFilters({ ...filters, service: e.target.value })}
          className="appearance-none bg-white border border-[#F0F0F0] rounded-lg px-4 py-2 pr-8 min-w-[120px] text-gray-700 focus:outline-none focus:border-teal-500 focus:bg-white"
        >
          <option value="">Service</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Location Dropdown */}
      <div className="relative">
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="appearance-none bg-white border border-[#F0F0F0] rounded-lg px-4 py-2 pr-8 min-w-[120px] text-gray-700 focus:outline-none focus:border-teal-500 focus:bg-white"
        >
          <option value="">Location</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Filter Icon */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 bg-white border border-[#F0F0F0] rounded-lg hover:bg-gray-100 transition-colors"
      >
        <SlidersHorizontal className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );

  // Mobile Search Bar
  const MobileSearchBar = () => (
    <div className="md:hidden p-4 bg-white">
      <div className="relative">
        <div className="flex items-center border-2 border-teal-500 rounded-full px-4 py-3 bg-white">
          <Search className="text-gray-400 w-5 h-5 mr-3" />
          <div className="w-px h-6 bg-teal-500 mr-3"></div>
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-gray-700"
          />
          <div className="flex items-center gap-2 ml-3">
            <button className="p-1">
              <X className="w-5 h-5 text-teal-500" />
            </button>
            <button onClick={() => setIsModalOpen(true)} className="p-1">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Animated Filter Modal
  const FilterModal = () => (
    <AnimatePresence mode="wait">
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Animated Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            variants={backdropVariants as any}
            onClick={() => setIsModalOpen(false)}
          />

          {/* Animated Modal */}
          <motion.div
            className="relative bg-white rounded-t-2xl lg:rounded-2xl p-6 w-full max-w-xl mx-0 lg:mx-4 max-h-[90vh] overflow-y-auto lg:mb-8"
            variants={modalVariants as any}
            style={{
              marginBottom: window.innerWidth >= 1024 ? "2rem" : "0",
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Filter</h2>
              <motion.button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* Category Dropdown */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative">
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  className="w-full appearance-none bg-white border-2 border-teal-500 rounded-lg px-4 py-3 pr-10 text-[#989FB0] focus:outline-none focus:bg-white transition-all focus:shadow-lg"
                >
                  <option value="">Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Service Search */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <input
                type="text"
                placeholder="What services are you looking for?"
                className="w-full bg-white border-2 border-teal-500 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white transition-all focus:shadow-lg"
              />
            </motion.div>

            {/* Location */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                  className="w-full bg-white border-2 border-teal-500 rounded-lg px-4 py-3 pr-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white transition-all focus:shadow-lg"
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
              </div>
            </motion.div>

            {/* Price Range */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <h3 className="text-lg font-medium text-[#8E8E93] mb-3">
                Price Range
              </h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  ₦{filters.priceRange[0].toLocaleString()}
                </span>
                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  ₦{filters.priceRange[1].toLocaleString()}
                </span>
              </div>

              {/* Dual Range Slider */}
              <div className="relative h-6">
                {/* Track */}
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-[#F0F0F0] rounded-lg"></div>

                {/* Active Track */}
                <motion.div
                  className="absolute top-1/2 transform -translate-y-1/2 h-2 bg-teal-500 rounded-lg"
                  style={{
                    left: `${
                      ((filters.priceRange[0] - 10500) / (200000 - 10500)) * 100
                    }%`,
                    width: `${
                      ((filters.priceRange[1] - filters.priceRange[0]) /
                        (200000 - 10500)) *
                      100
                    }%`,
                  }}
                  layoutId="price-range"
                ></motion.div>

                {/* Min Range Input */}
                <input
                  type="range"
                  min="10500"
                  max="200000"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(e, 0)}
                  className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-transparent appearance-none cursor-pointer z-10"
                  style={{
                    background: "transparent",
                    WebkitAppearance: "none",
                  }}
                />

                {/* Max Range Input */}
                <input
                  type="range"
                  min="10500"
                  max="200000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(e, 1)}
                  className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-transparent appearance-none cursor-pointer z-20"
                  style={{
                    background: "transparent",
                    WebkitAppearance: "none",
                  }}
                />
              </div>
            </motion.div>

            {/* Rating */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-medium text-[#8E8E93] mb-3">
                Rating
              </h3>
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((rating, index) => (
                  <motion.button
                    key={rating}
                    onClick={() => setFilters({ ...filters, rating })}
                    className={`flex items-center gap-1 px-5 py-2 rounded-2xl border-2 transition-colors ${
                      filters.rating === rating
                        ? "bg-teal-500 border-teal-500 text-white"
                        : "border-teal-500 text-teal-500 hover:bg-teal-50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 + index * 0.05 }}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        filters.rating === rating
                          ? "fill-white"
                          : "fill-teal-500"
                      }`}
                    />
                    <span className="font-medium">{rating}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={handleApplyFilter}
                className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Filter
              </motion.button>
              <motion.button
                onClick={handleClearFilter}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Clear Filter
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <DesktopFilterRow />
      <MobileSearchBar />
      <FilterModal />
    </>
  );
};

export default ServiceFilter;

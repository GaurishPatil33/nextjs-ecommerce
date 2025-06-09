import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export interface FilterOption {
  label: string;
  type: "checkbox" | "radio";
  options: string[];
}

interface FiltersProps {
  isOpen: boolean;
  filters: FilterOption[];
  selectedFilters: Record<string, string[]>;
  setSelectedFilters: (filters: Record<string, string[]>) => void;
  onClose: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  isOpen,
  onClose,
  filters,
  setSelectedFilters,
  selectedFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<Record<string, string[]>>(
    {}
  );

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(selectedFilters);
    }
  }, [isOpen, selectedFilters]);

  const handleChange = (
    filterLabel: string,
    option: string,
    type: "checkbox" | "radio"
  ) => {
    setLocalFilters((prev) => {
      const currentSelections = prev[filterLabel] || [];

      if (type === "checkbox") {
        if (currentSelections.includes(option)) {
          return {
            ...prev,
            [filterLabel]: currentSelections.filter((v) => v !== option),
          };
        } else {
          return {
            ...prev,
            [filterLabel]: [...currentSelections, option],
          };
        }
      } else if (type === "radio") {
        return {
          ...prev,
          [filterLabel]: [option],
        };
      }
      return prev;
    });
  };

  const handleClear = () => {
    setLocalFilters({});
  };

  const handleApply = () => {
    setSelectedFilters(localFilters);
    onClose();
  };

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div className="fixed inset-0 " onClick={onClose} />
            <motion.div
              className="fixed top-37 right-5 max-h-max max-w-max bg-white shadow-lg p-6 flex flex-col "
              initial="hidden"
              animate="visible"
              exit={"hidden"}
              transition={{ type: "tween" }}
            >
              <div className="overflow-y-auto flex-grow">
                {filters.map(({ label, type, options }) => (
                  <div className="mb-6" key={label}>
                    <p className="font-medium mb-2">{label}</p>
                    <div className="flex flex-col gap-2">
                      {options.map((opt) => {
                        const checked =
                          localFilters[label]?.includes(opt) ?? false;
                        return (
                          <label
                            key={opt}
                            className="inline-flex items-center gap-2 cursor-pointer select-none"
                          >
                            <input
                              type={type}
                              name={label}
                              value={opt}
                              checked={checked}
                              onChange={() => handleChange(label, opt, type)}
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between gap-4">
                <button
                  onClick={handleClear}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Clear
                </button>
                <button
                  onClick={handleApply}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filters;

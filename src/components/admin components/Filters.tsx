
"use client"
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, RotateCcw } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  key: string;
  label: string;
  type: 'single' | 'multi';
  options: FilterOption[];
  placeholder: string;
  maxSelections?: number;
}

// Enhanced UnifiedDropdown component
const UnifiedDropdown: React.FC<{
  type: 'single' | 'multi';
  options: FilterOption[];
  selected: string | string[];
  onChange: (selected: string | string[]) => void;
  placeholder: string;
  label: string;
  disabled?: boolean;
  maxSelections?: number;
}> = ({ 
  type, 
  options, 
  selected, 
  onChange, 
  placeholder, 
  label, 
  disabled = false,
  maxSelections 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const isMulti = type === 'multi';
  const selectedArray = isMulti ? (selected as string[]) : [];
  const selectedString = !isMulti ? (selected as string) : '';
  const hasSelection = isMulti ? selectedArray.length > 0 : selectedString !== '';

  const toggleOption = (value: string) => {
    if (disabled) return;
    
    if (isMulti) {
      const currentSelected = selected as string[];
      const isCurrentlySelected = currentSelected.includes(value);
      
      if (isCurrentlySelected) {
        const newSelected = currentSelected.filter(item => item !== value);
        onChange(newSelected);
      } else {
        if (maxSelections && currentSelected.length >= maxSelections) {
          return;
        }
        const newSelected = [...currentSelected, value];
        onChange(newSelected);
      }
    } else {
      onChange(value);
      setIsOpen(false);
    }
  };

  const removeOption = (value: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    if (isMulti && !disabled) {
      const currentSelected = selected as string[];
      onChange(currentSelected.filter(item => item !== value));
    }
  };

  const clearSelection = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!disabled) {
      onChange(isMulti ? [] : '');
    }
  };

  const getSelectedLabels = () => {
    if (!isMulti) return [];
    return selectedArray.map(value => 
      options.find(opt => opt.value === value)?.label || value
    );
  };

  const getDisplayText = () => {
    if (isMulti) {
      if (selectedArray.length === 0) return placeholder;
      if (selectedArray.length === 1) return `1 selected`;
      return `${selectedArray.length} selected`;
    } else {
      if (!selectedString) return placeholder;
      return options.find(opt => opt.value === selectedString)?.label || selectedString;
    }
  };

  const getDisplayTextColor = () => {
    if (disabled) return 'text-gray-400';
    return hasSelection ? 'text-gray-900' : 'text-gray-500';
  };

  const isOptionSelected = (value: string) => {
    return isMulti 
      ? selectedArray.includes(value)
      : selectedString === value;
  };

  const canSelectMore = () => {
    if (!isMulti || !maxSelections) return true;
    return selectedArray.length < maxSelections;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {maxSelections && isMulti && (
            <span className="text-xs text-gray-500 ml-1">
              (max {maxSelections})
            </span>
          )}
        </label>
        {hasSelection && !disabled && (
          <button
            onClick={clearSelection}
            className="text-xs text-gray-500 hover:text-red-600 underline transition-colors"
            type="button"
          >
            Clear
          </button>
        )}
      </div>
      
      {isMulti && selectedArray.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {getSelectedLabels().map((label, index) => (
            <motion.span
              key={selectedArray[index]}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {label}
              {!disabled && (
                <button
                  onClick={(e) => removeOption(selectedArray[index], e)}
                  className="ml-1 hover:text-blue-600 transition-colors"
                  type="button"
                  aria-label={`Remove ${label}`}
                >
                  <X size={10} />
                </button>
              )}
            </motion.span>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full border rounded-lg px-3 py-2 text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white flex items-center justify-between transition-colors text-sm
          ${disabled 
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
            : 'border-gray-300 hover:border-gray-400'
          }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={getDisplayTextColor()}>
          {getDisplayText()}
        </span>
        <ChevronDown 
          size={14} 
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''} ${
            disabled ? 'text-gray-400' : 'text-gray-600'
          }`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-auto"
            role="listbox"
            aria-multiselectable={isMulti}
          >
            {options.map((option,i) => {
              const isSelected = isOptionSelected(option.value);
              const canSelect = canSelectMore() || isSelected;
              
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleOption(option.value)}
                  disabled={!canSelect && !isSelected}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between transition-colors text-sm first:rounded-t-lg last:rounded-b-lg
                    ${isSelected 
                      ? 'bg-blue-50 text-blue-700' 
                      : canSelect 
                        ? 'text-gray-900' 
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <span className="text-blue-600">✓</span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Filter Panel Component
const FilterPanel: React.FC<{
  configs: FilterConfig[];
  filters: Record<string, string | string[]>;
  onChange: (filters: Record<string, string | string[]>) => void;
  className?: string;
}> = ({ configs, filters, onChange, className = '' }) => {
  const handleFilterChange = (key: string, value: string | string[]) => {
    const newFilters = { ...filters };
    if ((typeof value === 'string' && value === '') || (Array.isArray(value) && value.length === 0)) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    onChange(newFilters);
  };

  const clearAllFilters = () => {
    onChange({});
  };

  const getActiveFiltersCount = () => {
    return Object.keys(filters).length;
  };

  const hasActiveFilters = getActiveFiltersCount() > 0;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {/* <Filter size={18} className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3> */}
          {hasActiveFilters && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {getActiveFiltersCount()} active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <RotateCcw size={14} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {configs.map((config) => (
          <UnifiedDropdown
            key={config.key}
            type={config.type}
            options={config.options}
            selected={filters[config.key] || (config.type === 'multi' ? [] : '')}
            onChange={(value) => handleFilterChange(config.key, value)}
            placeholder={config.placeholder}
            label={config.label}
            maxSelections={config.maxSelections}
          />
        ))}
      </div>
    </div>
  );
};


export default FilterPanel;
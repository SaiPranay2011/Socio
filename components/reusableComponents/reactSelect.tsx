import { User } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { HiCheck } from "react-icons/hi2";

type SelectOption = {
  label: string | null;
  value: string;
};
type CustomSelectProps = {
  label: string;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
  options: SelectOption[];
  disabled?: boolean;
};

const ReactSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearOptions = () => {
    onChange([]);
  };

  const selectOption = (option: SelectOption) => {
    if (
      value.some((val) => {
        return val.label == option.label;
      })
    ) {
      onChange(value.filter((o) => o != option));
    } else {
      onChange([...value, option]);
    }
  };

  function isOptionSelected(option: SelectOption) {
    return value.some((val) => {
      return val.label == option.label;
    });
  }
  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen,highlightedIndex,options]);
  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className="relative w-full flex  items-center min-h-4 ring-1 ring-inset dark:bg-inherit ring-gray-200 dark:ring-gray-50 focus:ring-2 focus:ring-inset focus:ring-sky-500  gap-1 p-2 rounded-lg outline-none"
    >
      <span className="flex-grow flex gap-2 flex-wrap">
        {value?.map((v) => (
          <button
            key={v.value}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(v);
            }}
            className="flex items-center group border border-gray-400 dark:border-neutral-100 rounded px-1 py-1 gap-1 cursor-pointer bg-none outline-none hover:bg-red-300 focus:bg-red-300 hover:border-red-600 focus:border-red-600 dark:hover:bg-red-400 dark:focus:bg-red-400"
          >
            {v.label}
            <span className="text-xl text-gray-400 group-hover:text-red-600 group-focus:text-red-600">
              &times;
            </span>
          </button>
        ))}
      </span>
      <button
        className="bg-none text-gray-500 dark:text-neutral-300 border-none outline-none cursor-pointer p-0 text-xl focus:text-gray-400 dark:focus:text-neutral-200 hover:text-gray-400 dark:hover:text-neutral-200"
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
      >
        &times;
      </button>
      <div className="bg-gray-400 dark:bg-neutral-400 rounded-sm self-stretch w-1"></div>
      <div className="border-transparent border-4 translate-x-0 translate-y-1/4 border-t-gray-300"></div>
      <ul
        className={clsx(
          "absolute bg-white dark:bg-gray-700  z-50 m-0 p-0 list-none border-2 border-gray-300 rounded-lg w-full left-0 top-[calc(100%+.25rem)] max-h-24 overflow-y-auto no-scrollbar",
          isOpen ? "block" : "hidden"
        )}
      >
        {options.map((user, index) => (
          <li
            key={user.value}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(user);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            className={clsx(
              "px-1 py-2 border cursor-pointer rounded-sm ",

              isOptionSelected(user)
                ? "bg-neutral-400 dark:bg-gray-500 flex flex-row items-center justify-between"
                : "",
              index == highlightedIndex
                ? "bg-neutral-300 dark:bg-gray-400"
                : ""
            )}
          >
            {user.label}
            {isOptionSelected(user) && (
              <HiCheck className=" font-bold" size={20} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReactSelect;

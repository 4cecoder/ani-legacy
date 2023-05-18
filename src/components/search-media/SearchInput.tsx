// src/components/search-media/SearchInput.tsx
import React from "react";

type Props = {
  searchTerm: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled: boolean;
};

const SearchInput: React.FC<Props> = ({
  searchTerm,
  onChange,
  onKeyDown,
  placeholder,
  disabled,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      className="w-64 rounded-2xl border border-gray-800 bg-gradient-to-tr from-indigo-800 to-purple-900 px-4 py-2 text-pink-500 placeholder-purple-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 sm:w-96"
    />
  );
};

export default SearchInput;

import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded-xl px-4 py-2 w-56 focus:outline-none focus:ring-2 focus:ring-amber-400"
    />
  );
};

export default SearchBar;

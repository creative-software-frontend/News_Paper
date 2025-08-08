'use client'
import { useState } from 'react';
import { HiOutlineSearch, HiX } from 'react-icons/hi';

const SearchInput = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  return (
   
     
      
      <div className="flex items-center ml-2">
        {isSearchOpen ? (
          <div className="flex items-center bg-white rounded-full overflow-hidden transition-all duration-300 ease-in-out">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="এখানে খুঁজুন..."
              className="px-4  w-64 focus:outline-none text-gray-800"
              autoFocus
            />
            <button 
              onClick={toggleSearch}
              className="px-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <HiX className="text-lg" />
            </button>
          </div>
        ) : (
          <HiOutlineSearch 
            onClick={toggleSearch}
            className="text-lg cursor-pointer hover:text-red-600 transition-colors" 
          />
        )}
      </div>
 
  );
};

export default SearchInput;
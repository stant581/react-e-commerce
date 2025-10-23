import React, { useState } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'; // Used for the search icon

interface SearchBarProps {
  /** Function called only when the search button is clicked or Enter is pressed. */
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  // Local state to manage what's currently typed in the input field
  const [inputValue, setInputValue] = useState('');

  // Handler for button click or Enter key
  const handleSearch = () => {
    // Only call the parent's handler (setSearchTerm) on explicit action
    onSearch(inputValue);
  };

  // Allow searching when Enter key is pressed in the input field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <InputGroup style={{ width: '300px' }}>
      <FormControl
        placeholder="Search products..."
        aria-label="Search products"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Update local state as user types
        onKeyDown={handleKeyDown}
      />
      
      {/* 🚀 THE SEARCH BUTTON - Triggers the onSearch prop */}
      <Button 
        variant="primary" 
        onClick={handleSearch} 
        style={{ zIndex: 100 }} // Ensure button is clickable over other elements
      >
        <Search size={18} />
      </Button>
    </InputGroup>
  );
};

export default SearchBar;

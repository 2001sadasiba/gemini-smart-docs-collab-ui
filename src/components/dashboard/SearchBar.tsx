import React from 'react';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    showQnA: boolean;
    onToggleQnA: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchTerm,
    onSearchChange,
    showQnA,
    onToggleQnA,
}) => {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search documents by title, content, or tags..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />
            <button
                className={`btn-primary ${showQnA ? 'active' : ''}`}
                onClick={onToggleQnA}
            >
                {showQnA ? 'Hide AI Assistant' : 'Ask AI Assistant'}
            </button>
        </div>
    );
};

export default SearchBar;
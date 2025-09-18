import React from 'react';

interface TagsFilterProps {
    allTags: string[];
    selectedTags: string[];
    searchTerm: string;
    onTagClick: (tag: string) => void;
    onClearAllFilters: () => void;
    onClearTags: () => void;
}

const TagsFilter: React.FC<TagsFilterProps> = ({
    allTags,
    selectedTags,
    searchTerm,
    onTagClick,
    onClearAllFilters,
    onClearTags,
}) => {
    const hasFilters = searchTerm || selectedTags.length > 0;

    return (
        <div className="tags-filter">
            <div className="tags-header">
                <h3>Filter by Tags:</h3>
                {hasFilters && (
                    <button className="clear-filters" onClick={onClearAllFilters}>
                        Clear all filters
                    </button>
                )}
            </div>
            <div className="tags-list">
                {allTags.map(tag => (
                    <button
                        key={tag}
                        className={`tag ${selectedTags.includes(tag) ? 'active' : ''}`}
                        onClick={() => onTagClick(tag)}
                    >
                        {tag}
                    </button>
                ))}
                {selectedTags.length > 0 && (
                    <button className="tag-clear" onClick={onClearTags}>
                        Clear tags
                    </button>
                )}
            </div>
        </div>
    );
};

export default TagsFilter;
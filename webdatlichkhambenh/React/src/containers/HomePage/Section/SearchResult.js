// SearchResult.js
import React from 'react';

const SearchResult = ({ results, onItemClick }) => {
    return (
        <ul>
            {results.map(result => (
                <li key={result.id} onClick={() => onItemClick(result)}>
                    {result.valueVi} ({result.valueEn})
                </li>
            ))}
        </ul>
    );
};

export default SearchResult;

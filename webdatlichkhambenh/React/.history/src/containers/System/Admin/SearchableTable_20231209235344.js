import React, { useState } from 'react';

const SearchableTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:7070/admin/search?searchTerm=${searchTerm}`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="searchable-table-container">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <table>
                {/* Display data in table rows */}
                <thead>
                    <tr>
                        {/* Table headers */}
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Reason</th>
                        <th>Date</th>
                        <th>Birthday</th>
                        <th>Status ID</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map((result) => (
                        <tr key={result.id}>
                            {/* Display data in table rows */}
                            <td>{result.id}</td>
                            <td>{result.firstName}</td>
                            <td>{result.lastName}</td>
                            <td>{result.reasons}</td>
                            <td>{result.date}</td>
                            <td>{result.birthday}</td>
                            <td>{result.statusId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SearchableTable;

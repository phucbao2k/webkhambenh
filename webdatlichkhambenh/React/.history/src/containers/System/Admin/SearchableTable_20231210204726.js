import React, { Component } from 'react';
import './SearchableTable.scss';

class SearchableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchResults: [],
            error: null,
        };
    }

    handleSearch = async () => {
        try {
            const { searchTerm } = this.state;

            if (searchTerm.trim() !== "") {
                const response = await fetch(`http://localhost:7070/admin/search?searchTerm=${encodeURIComponent(searchTerm)}`);

                if (response.ok) {
                    const data = await response.json();

                    // Loại bỏ các bản ghi trùng lặp dựa trên trường id
                    const uniqueResults = data.reduce((unique, current) => {
                        return unique.some(entry => entry.id === current.id) ? unique : [...unique, current];
                    }, []);

                    this.setState({ searchResults: uniqueResults, error: null });
                } else {
                    this.setState({ error: `Error: ${response.status} - ${response.statusText}` });
                }
            } else {
                this.setState({ searchResults: [], error: null });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ error: 'Error fetching data' });
        }
    };



    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleSearch();
        }
    };

    render() {
        const { searchTerm, searchResults, error } = this.state;

        return (
            <div className="searchable-table-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => this.setState({ searchTerm: e.target.value })}
                    onKeyDown={this.handleKeyDown}
                />
                <button onClick={this.handleSearch}>Search</button>

                {error && <p className="error-message">{error}</p>}

                <table>
                    <thead>
                        <tr>
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
    }
}

export default SearchableTable;

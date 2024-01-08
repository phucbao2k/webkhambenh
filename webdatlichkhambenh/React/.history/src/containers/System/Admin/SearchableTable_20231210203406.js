import React, { Component } from 'react';
import './SearchableTable.scss';

class SearchableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchResults: [],
        };
    }

    handleSearch = async () => {
        try {
            const { searchTerm } = this.state;
            const response = await fetch(`http://localhost:7070/admin/search?searchTerm=${searchTerm}`);
            const data = await response.json();
            this.setState({ searchResults: data });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    render() {
        const { searchTerm, searchResults } = this.state;

        return (
            <div className="searchable-table-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => this.setState({ searchTerm: e.target.value })}
                />
                <button onClick={this.handleSearch}>Search</button>

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

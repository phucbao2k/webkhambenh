import React, { Component } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';

import './SearchDoctor.scss';

class SearchDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            searchTerm: '',
        };
    }

    fetchData = async () => {
        try {
            const response = await axios.get('/api/search-doctor');
            this.setState({ searchResults: response.data });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        this.setState({ searchTerm });
    };

    handleFormSubmit = (event) => {
        event.preventDefault(); // Prevents the default form submission behavior
        this.fetchData();
    };

    filterResults = () => {
        const { searchResults, searchTerm } = this.state;

        if (!searchTerm) {
            return searchResults;
        }

        const fuse = new Fuse(searchResults, { keys: ['name'], includeScore: true });
        const filteredResults = fuse.search(searchTerm);

        return filteredResults.map((result) => result.item);
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const filteredResults = this.filterResults();

        return (
            <div className="search-bar-container">
                <form onSubmit={this.handleFormSubmit}>
                    <input
                        type="text"
                        placeholder="Nhập từ khóa..."
                        value={this.state.searchTerm}
                        onChange={this.handleSearchChange}
                    />
                </form>
                <ul className="search-results">
                    {filteredResults.map((result) => (
                        <li key={result.id}>{result.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default SearchDoctor;

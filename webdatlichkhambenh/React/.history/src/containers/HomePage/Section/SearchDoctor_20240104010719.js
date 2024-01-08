// SearchDoctor.js

import React, { Component } from 'react';
import axios from 'axios';
import './SearchDoctor.scss';

class SearchDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            searchTerm: '',
            showDropdown: false,
        };
    }

    fetchData = async () => {
        try {
            const response = await axios.post('/api/search-doctor', { searchTerm: this.state.searchTerm });
            const filteredResults = response.data.filter(result => {
                return searchKeywords.some(keyword =>
                    result.valueVi.toLowerCase().includes(keyword.toLowerCase()) ||
                    result.valueEn.toLowerCase().includes(keyword.toLowerCase())
                );
            });
            this.setState({ searchResults: filteredResults });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };


    handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        this.setState({ searchTerm, showDropdown: searchTerm.trim() !== '' }, () => {
            if (searchTerm.trim() !== '') {
                this.fetchData();
            }
        });
    };

    handleItemClick = (result) => {
        console.log('Selected:', result);
        // Perform other actions here, e.g., redirect to detail page
    };

    handleOutsideClick = () => {
        this.setState({ showDropdown: false });
    };

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    }

    render() {
        const { searchResults, searchTerm, showDropdown } = this.state;

        return (
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Nhập từ khóa..."
                    value={searchTerm}
                    onChange={this.handleSearchChange}
                />
                {showDropdown && (
                    <ul className="search-results">
                        {searchResults.map((result) => (
                            <li key={result.id} onClick={() => this.handleItemClick(result)}>
                                {result.valueVi} ({result.valueEn})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

export default SearchDoctor;

// SearchDoctor.js

import React, { Component } from 'react';
import axios from 'axios';
import './SearchDoctor.scss';
const searchKeywords = ["Thạc sĩ", "Tiến sĩ", "Phó giáo sư", "Giáo sư", "Bachelor", "Doctor", "Associate Professor", "Professor"];
class SearchDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            searchTerm: '',
            showDropdown: false,
            selectedDoctor: null,
        };
    }

    fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:7070/api/search-doctor', { searchTerm: this.state.searchTerm });
            const filteredResults = response.data.filter(result => {
                // Lọc kết quả chỉ trong phạm vi 'POSITION'
                if (result.type === 'POSITION') {
                    return searchKeywords.some(keyword =>
                        result.valueVi.toLowerCase().includes(keyword.toLowerCase()) ||
                        result.valueEn.toLowerCase().includes(keyword.toLowerCase())
                    );
                }
                return false;
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

    handleItemClick = async (result) => {
        console.log('Selected:', result);
        try {
            const response = await axios.get(`http://localhost:7070/api/doctor-info/${result.id}`);
            const selectedDoctor = response.data;
            this.setState({ selectedDoctor });
        } catch (error) {
            console.error('Error fetching doctor info:', error);
        }
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
        const { searchResults, searchTerm, showDropdown, selectedDoctor } = this.state;

        return (
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Tìm bác sĩ theo chức danh..."
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

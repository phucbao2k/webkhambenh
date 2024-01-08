// SearchDoctor.js
import React, { Component } from 'react';
import axios from 'axios';
import './SearchDoctor.scss';
import SearchResult from './SearchResult';
import DoctorDetail from './DoctorDetail';

class SearchDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            searchTerm: '',
            selectedDoctor: null,
            showDropdown: false,
        };
    }

    async fetchData(searchTerm) {
        try {
            const response = await axios.post('http://localhost:7070/api/get-doctors-by-position', { searchTerm });
            this.setState({ searchResults: response.data });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }

    handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        this.setState({ searchTerm, showDropdown: searchTerm.trim() !== '', selectedDoctor: null }, () => {
            if (searchTerm.trim() !== '') {
                this.fetchData(searchTerm);
            }
        });
    };

    handleItemClick = (result) => {
        console.log('Selected:', result);
        // Xử lý logic khi một kết quả được chọn
        this.setState({ selectedDoctor: result });
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
                    <div>
                        <SearchResult results={searchResults} onItemClick={this.handleItemClick} />
                    </div>
                )}

                {/* Hiển thị thông tin chi tiết bác sĩ khi có bác sĩ được chọn */}
                {selectedDoctor && (
                    <DoctorDetail selectedDoctor={selectedDoctor} />
                )}
            </div>
        );
    }
}

export default SearchDoctor;

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

    getDoctorsByPosition = async (searchTerm) => {
        try {
            const response = await axios.post('http://localhost:7070/api/get-doctors-by-position', { searchTerm });

            this.setState({ searchResults: response.data });
        } catch (error) {
            console.error('Error fetching doctors by position:', error);
        }
    };

    handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        this.setState({ searchTerm, showDropdown: searchTerm.trim() !== '', selectedDoctor: null }, () => {
            if (searchTerm.trim() !== '') {
                this.getDoctorsByPosition(searchTerm);
            }
        });
    };

    handleItemClick = async (result) => {
        console.log('Selected:', result);

        try {
            const selectedDoctor = {
                id: result.id,
                valueVi: result.valueVi,
                valueEn: result.valueEn,
                // Add other properties if needed
            };

            this.setState({ selectedDoctor });
        } catch (error) {
            console.error('Error handling item click:', error);
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
                    <div>
                        <SearchResult results={searchResults} onItemClick={this.handleItemClick} />
                    </div>
                )}

                <DoctorDetail selectedDoctor={selectedDoctor} />
            </div>
        );
    }
}

export default SearchDoctor;

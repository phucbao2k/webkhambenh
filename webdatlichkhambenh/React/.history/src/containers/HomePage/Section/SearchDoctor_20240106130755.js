// SearchDoctor.js
import React, { Component } from 'react';
import axios from 'axios';
import './SearchDoctor.scss';
import SearchResult from './SearchResult';
import DoctorDetail from './DoctorDetail';  // Import component mới

const searchKeywords = ["Thạc sĩ", "Tiến sĩ", "Phó giáo sư", "Giáo sư", "Master", "Doctor", "Associate Professor", "Professor"];

class SearchDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            searchTerm: '',
            selectedDoctor: null,  // Thêm trạng thái mới
            showDropdown: false,
        };
    }

    async getDoctorIdsByPosition(positionId) {
        try {
            const response = await axios.post('http://localhost:7070/api/get-doctors-by-position', { positionId });
            return response.data;
        } catch (error) {
            console.error('Error fetching doctorIds by position:', error);
            throw error;
        }
    }

    fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:7070/api/search-doctor', { searchTerm: this.state.searchTerm });
            const filteredResults = response.data.filter(result => {
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
        this.setState({ searchTerm, showDropdown: searchTerm.trim() !== '', selectedDoctor: null }, () => {
            if (searchTerm.trim() !== '') {
                this.fetchData();
            }
        });
    };

    handleItemClick = async (result) => {
        console.log('Selected:', result);

        try {
            const doctorIds = await this.getDoctorIdsByPosition(result.id);

            if (doctorIds && doctorIds.length > 0) {
                const selectedDoctor = {
                    positionId: result.id,
                    doctorIds,
                };

                this.setState({ selectedDoctor });
            } else {
                console.log('No matching doctors found.');
            }
        } catch (error) {
            console.error('Error getting doctorIds by position:', error);
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

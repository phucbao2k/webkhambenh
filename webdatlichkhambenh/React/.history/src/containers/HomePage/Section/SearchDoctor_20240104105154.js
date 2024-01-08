// SearchDoctor.js

import React, { Component } from 'react';
import axios from 'axios';
import './SearchDoctor.scss';
import SearchResult from './SearchResult';
const searchKeywords = ["Thạc sĩ", "Tiến sĩ", "Phó giáo sư", "Giáo sư", "Bachelor", "Doctor", "Associate Professor", "Professor"];
class SearchDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            searchTerm: '',
            showDropdown: false,
           
        };
    }
    componentDidMount() {
        if (this.props.history) {
            // Đảm bảo rằng this.props.history tồn tại trước khi sử dụng
            // Các hành động khác...
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.history !== prevProps.history && this.props.history) {
            // Đảm bảo rằng this.props.history tồn tại và đã thay đổi từ trước đó
            // Các hành động khác...
        }
    }
async  getDoctorIdsByPosition(positionId) {
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
        const doctorIds = await this.getDoctorIdsByPosition(result.positionId);

        if (doctorIds && doctorIds.length > 0) {
            // Chuyển hướng đến trang chi tiết bác sĩ đầu tiên trong danh sách
            this.props.history.push(`/detail-doctor/${doctorIds[0]}`);
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
        const { searchResults, searchTerm, showDropdown } = this.state;

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
                        {/* Hiển thị kết quả tìm kiếm sử dụng SearchResult Component */}
                        <SearchResult results={searchResults} onItemClick={this.handleItemClick} />
                    </div>
                )}
               
            </div>
            
        );
    }
}

export default SearchDoctor;

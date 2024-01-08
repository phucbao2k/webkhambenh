// SearchDoctor.js
import React, { Component } from 'react';
import axios from 'axios';
import './SearchDoctor.scss';
import SearchResult from './SearchResult';
import DoctorDetail from './DoctorDetail';
import { withRouter } from 'react-router-dom';

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

    fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:7070/api/search-doctor', { searchTerm: this.state.searchTerm });

            // Remove duplicate results based on id, valueVi, and valueEn
            const uniqueResults = response.data.reduce((unique, result) => {
                const isDuplicate = unique.some(
                    (uniqueResult) =>
                        uniqueResult.id === result.id &&
                        uniqueResult.valueVi === result.valueVi &&
                        uniqueResult.valueEn === result.valueEn
                );

                if (!isDuplicate) {
                    unique.push(result);
                }

                return unique;
            }, []);

            this.setState({ searchResults: uniqueResults });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

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
                this.fetchData();
            }
        });
    };

    handleItemClick = async (result) => {
        console.log('Selected:', result);

        try {
            const { valueVi, valueEn } = result;

            // Gọi API để lấy danh sách bác sĩ có giá trị valueVi hoặc valueEn khớp
            const response = await axios.post('http://localhost:7070/api/get-doctors-by-position', {
                searchTerm: valueVi || valueEn,
            });

            const selectedDoctor = {
                id: result.id,
                valueVi,
                valueEn,
                doctors: response.data, // Danh sách bác sĩ tương ứng
            };

            this.setState({ selectedDoctor }, () => {
                const { history } = this.props;

                if (history) {
                    // Chuyển hướng trang nếu selectedDoctor có giá trị
                    history.push('/detail-doctor', { selectedDoctor });
                }
            });
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

                {/* Chuyển hướng trang nếu selectedDoctor có giá trị */}
                {selectedDoctor && <DoctorDetail selectedDoctor={selectedDoctor} />}
            </div>
        );
    }
}

export default withRouter(SearchDoctor);

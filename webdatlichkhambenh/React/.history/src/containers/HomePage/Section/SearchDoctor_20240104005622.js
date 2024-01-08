// SearchDoctor.jsx

import React, { Component } from 'react';
import axios from 'axios';
import './SearchDoctor.scss';

class SearchDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchResults: [],
            showDropdown: false,
        };
    }

    handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        this.setState({ searchTerm, showDropdown: true }, () => {
            // Gọi hàm tìm kiếm khi searchTerm thay đổi
            this.search();
        });
    };

    search = async () => {
        const { searchTerm } = this.state;
        try {
            const response = await axios.post('http://api/search-doctor', { searchTerm });
            this.setState({ searchResults: response.data });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    handleItemClick = (result) => {
        console.log('Selected:', result);
        // Thực hiện hành động khác tại đây, ví dụ: chuyển hướng đến trang chi tiết
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
        const { searchTerm, searchResults, showDropdown } = this.state;

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
                                {result.valueVi} / {result.valueEn}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

export default SearchDoctor;

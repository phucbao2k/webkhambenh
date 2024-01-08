import React, { Component } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';

import './SearchBar.scss';

class SearchBar extends Component {
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
            const response = await axios.get('/api/search-doctor');
            this.setState({ searchResults: response.data });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        this.setState({ searchTerm, showDropdown: true }, () => {
            // Gọi fetchData khi searchTerm thay đổi
            this.fetchData();
        });
    };

    handleItemClick = (result) => {
        // Xử lý khi một kết quả được chọn từ dropdown
        console.log('Selected:', result);
        // Có thể thực hiện hành động khác tại đây, ví dụ: chuyển hướng đến trang chi tiết
    };

    handleOutsideClick = () => {
        // Ẩn dropdown khi click ra ngoài
        this.setState({ showDropdown: false });
    };

    componentDidMount() {
        // Bắt sự kiện click ra ngoài để ẩn dropdown
        document.addEventListener('click', this.handleOutsideClick);
    }

    componentWillUnmount() {
        // Hủy bỏ sự kiện khi component unmount
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
                                {result.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

export default SearchBar;

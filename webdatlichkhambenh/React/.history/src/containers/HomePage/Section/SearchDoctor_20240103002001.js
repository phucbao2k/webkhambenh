import React, { Component } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js'; 
import { connect } from 'react-redux';
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

    filterResults = () => {
        const { searchResults, searchTerm } = this.state;

        if (!searchTerm) {
            return searchResults;
        }

        // Sử dụng Fuse để thực hiện tìm kiếm mờ
        const fuse = new Fuse(searchResults, { keys: ['name'], includeScore: true });
        const filteredResults = fuse.search(searchTerm);

        return filteredResults.map(result => result.item);
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const filteredResults = this.filterResults();

        return (
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Nhập từ khóa..."
                    onChange={this.handleSearchChange}
                />
                <ul className="search-results">
                    {filteredResults.map(result => (
                        <li key={result.id}>
                            {/* Hiển thị thông tin kết quả tìm kiếm */}
                            {result.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (SearchDoctor));

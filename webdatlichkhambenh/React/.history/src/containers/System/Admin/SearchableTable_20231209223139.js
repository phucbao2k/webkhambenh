import React, { Component } from 'react';

class SearchableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchTerm: '',
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.onDataLoaded !== this.props.onDataLoaded) {
            this.props.onDataLoaded(this.fetchData);
        }
    }

    fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:7070/admin/search?searchTerm=${this.state.searchTerm}`);
            const result = await response.json();
            this.setState({ data: result });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    handleSearch = () => {
        this.fetchData();
    };

    render() {
        const { data, searchTerm } = this.state;

        return (
            <div className="searchable-table-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => this.setState({ searchTerm: e.target.value })}
                />
                <button onClick={this.handleSearch}>Search</button>
                <table>
                    <thead>
                        <tr>
                            <th>Column 1</th>
                            <th>Column 2</th>
                            {/* Add more columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                <td>{row.patientId}</td>
                                <td>{row.statusId}</td>
                                {/* Render more columns as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SearchableTable;

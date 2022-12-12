import React, { Component } from "react";
import axios from "axios";

import { search } from "./utils";
import dataPatients from "./dataPatients";

class App extends Component {
    state = {
        dataPatients: null,
        loading: false,
        value: ""
    };

    search = async phoneNumber => {
        this.setState({ loading: true });
        const results = await search(
            `http://localhost:7070/api/get-all-booking-for-admin-booking?phoneNumber=${phoneNumber}`
        );
        const dataPatients = results;

        this.setState({ dataPatients, loading: false });
    };

    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });
    };

    get renderMovies() {
        let dataPatients = <h4>Search result is below...</h4>;
        if (this.state.dataPatients) {
            dataPatients = <dataPatients list={this.state.dataPatients} />;
        }

        return dataPatients;
    }

    render() {
        return (
            <div>
                <input
                    value={this.state.value}
                    onChange={e => this.onChangeHandler(e)}
                    placeholder="Type something to search"
                />
                {this.renderMovies}
            </div>
        );
    }
}

export default App;

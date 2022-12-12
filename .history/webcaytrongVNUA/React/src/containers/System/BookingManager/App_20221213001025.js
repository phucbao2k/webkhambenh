import React, { Component } from "react";
import axios from "axios";
import { FormattedMessage } from 'react-intl';
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
            `http://localhost:7070/api/get-search-booking-for-admin-booking?phoneNumber=${phoneNumber}`
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
            dataPatients = this.state.dataPatients;
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
                <div className="manage-patient-body row">

                   

                    <div className="col-12 table-manage-patient">
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <th><FormattedMessage id="patient.booking-modal.numerical-order" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.email" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.time" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.fullName" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.phoneNumber" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.address" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.plantName" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.reason" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.avatar" /></th>
                                    <th>Actions</th>
                                </tr>
                                {dataPatients && dataPatients.length > 0 ?
                                    dataPatients.map((item, index) => {
                                        let time = language === LANGUAGES.VI ?
                                            item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.patientData.email}</td>
                                                <td>{time}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{item.plantName}</td>
                                                <td>{item.reasons}</td>
                                                <td>   <div className="preview-img-container">
                                                    <input id="previewImg" type="file" hidden
                                                        onChange={(event) => this.handleOnChangeImage(event)} />
                                                    <div className="preview-image" style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                                        onClick={() => this.openPreviewImage()}
                                                    >

                                                    </div>
                                                </div>
                                                </td>
                                                <td>
                                                    <button className="mp-btn-confirm"
                                                        onClick={() => this.handleBtnConfirm(item)}><FormattedMessage id="patient.booking-modal.confirm" /></button>
                                                    <button onClick={() => this.handleEditUserFromParent(item)}><FormattedMessage id="patient.booking-modal.check" /></button>

                                                </td>
                                            </tr>
                                        )
                                    })
                                    : <tr>
                                        <td colSpan="6" style={{ textAlign: "center" }}>
                                            no data
                                        </td>
                                    </tr>}
                            </tbody>



                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;

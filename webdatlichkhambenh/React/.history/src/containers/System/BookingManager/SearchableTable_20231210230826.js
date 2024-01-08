import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import { getSearBookingForAdminBooking, postSendSchedule } from '../../../services/userService';
import { LANGUAGES, CommonUtils } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverLay from "react-loading-overlay";
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import Lightbox from 'react-image-lightbox';
import TableManagePaidBooking from './TableManagePaidBooking';
import './SearchableTable.scss';

class SearchableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchResults: [],
            error: null,
            currentDate: moment(new Date()).startOf('day').valueOf(),
            isOpenRemedyModal: false,
            isOpenCancelModal: false,
            dataModal: {},
            isShowLoading: false,
            isOpen: false,
        };
    }
    handleBtnConfirm = (item) => {

        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
            plantName: item.plantName,
            reasons: item.reasons,
            avatar: item.image,
            phoneNumber: item.phoneNumber,
            address: item.patientData.address,
            price: item.priceTypeDataBooking.valueVi,
            doctorName: `${item.doctorNameData.lastName} ${item.doctorNameData.firstName}`
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
            avatar: ''
        })

    }
    handleSearch = async () => {
        try {
            const { searchTerm } = this.state;

            // Kiểm tra nếu searchTerm không rỗng mới gọi API
            if (searchTerm.trim() !== "") {
                const response = await fetch(`http://localhost:7070/admin-booking/search?searchTerm=${encodeURIComponent(searchTerm)}`);

                if (response.ok) {
                    const data = await response.json();
                    this.setState({ searchResults: data, error: null });
                } else {
                    this.setState({ error: `Error: ${response.status} - ${response.statusText}` });
                }
            } else {
                // Nếu searchTerm rỗng, đặt searchResults về mảng rỗng và xóa thông báo lỗi
                this.setState({ searchResults: [], error: null });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ error: 'Error fetching data' });
        }
    };


    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleSearch();
        }
    };

    render() {
        const { searchTerm, searchResults, error } = this.state;

        return (
            <div className="searchable-table-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => this.setState({ searchTerm: e.target.value })}
                    onKeyDown={this.handleKeyDown}
                />
                <button onClick={this.handleSearch}>Search</button>

                {error && <p className="error-message">{error}</p>}

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Reason</th>
                            <th>Date</th>
                            <th>Birthday</th>
                            <th>Status ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((result) => (
                            <tr key={result.id}>
                                <td>{result.id}</td>
                                <td>{result.firstName}</td>
                                <td>{result.lastName}</td>
                                <td>{result.reasons}</td>
                                <td>{result.date}</td>
                                <td>{result.birthday}</td>
                                <td>{result.statusId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SearchableTable;

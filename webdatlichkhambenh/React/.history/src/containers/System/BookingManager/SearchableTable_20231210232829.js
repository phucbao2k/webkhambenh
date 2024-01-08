import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import { getSearchBookingForAdminBooking, postSendSchedule } from '../../../services/userService';
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
            previewImgURL: '',
            avatar: '',
        };
    }
    handleBtnConfirm = (item) => {

        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
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
                const response = await await getSeaBookingForAdminBooking({
                    statusId: status,
                    date: formatedDate
                })

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
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })

    }
    closeCancelModal = () => {
        this.setState({
            isOpenCancelModal: false,
            dataModal: {}
        })

    }
    sendSchedule = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await postSendSchedule({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Success');
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Something went wrong...');
            console.log('error  is:', res)
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleEditUserFromParent = (item) => {
        let imageBase64 = '';
        if (item.image) {
            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
            //Buffer cung cấp cách xử lý dữ liệu dạng nhị phân, 
            //câu lệnh trên xử lý dữ liệu BLOB (được mã hóa là base64) sang dữ liệu binary 
        }
        this.setState({

            avatar: '',
            previewImgURL: imageBase64,

        })
    }
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

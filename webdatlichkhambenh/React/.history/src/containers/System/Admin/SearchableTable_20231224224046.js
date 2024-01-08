import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import { getSearchBookingForAdminBooking, postSendSchedule } from '../../../services/userService';
import { LANGUAGES, CommonUtils } from '../../../utils';
import RemedyModal from '../BookingManager/RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverLay from "react-loading-overlay";
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import TableManagePaidBooking from '../BookingManager/TableManagePaidBooking';
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
            doctorName: `${item.doctorNameData.lastName} ${item.doctorNameData.firstName}`,
            statusId: item.statusTypeDataBooking.valueVi
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
            avatar: ''
        });
    };

    handleSearch = async () => {
        try {
            const { searchTerm } = this.state;

            if (searchTerm.trim() !== "") {
                const response = await getSearchBookingForAdminBooking(searchTerm);

                if (response.errCode === 0) {
                    const data = response.data;
                    // Kiểm tra xem data có dữ liệu hay không
                    if (Object.keys(data).length > 0) {
                        this.setState({ searchResults: [data], error: null });
                    } else {
                        // Không có dữ liệu
                        this.setState({ searchResults: [], error: "No data found." });
                    }
                } else {
                    this.setState({ error: `Error: ${response.errCode} - ${response.errMessage}` });
                }
            } else {
                this.setState({ searchResults: [], error: null });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ error: 'Error fetching data' });
        }
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter' && this.state.searchTerm.trim() !== "") {
            this.handleSearch();
        }
    };

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        });
    };

    closeCancelModal = () => {
        this.setState({
            isOpenCancelModal: false,
            dataModal: {}
        });
    };

    sendSchedule = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        });

        let res = await postSendSchedule({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        });

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            });
            toast.success('Success');
            this.closeRemedyModal();
            await this.handleSearch();
        } else {
            this.setState({
                isShowLoading: false
            });
            toast.error('Something went wrong...');
            console.log('error is:', res);
        }
    };

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            });
        }
    };

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        });
    };

    handleEditUserFromParent = (item) => {
        let imageBase64 = '';
        if (item.image) {
            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
        }
        this.setState({
            avatar: '',
            previewImgURL: imageBase64,
        });
    };

    render() {
        const { searchTerm, searchResults, error } = this.state;
        let { language } = this.props;
        let { isOpenRemedyModal, dataModal } = this.state;

        return (
            <>
                <LoadingOverLay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'>
                    <div className="manage-patient-container">
                        <div className="m-p-title">
                            <FormattedMessage id="patient.booking-modal.manage-booking" />
                        </div>

                        <div className="manage-patient-body row">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => this.setState({ searchTerm: e.target.value })}
                                onKeyDown={this.handleKeyDown}
                            />
                            <button onClick={this.handleSearch}>Search</button>

                            {error && <p className="error-message">{error}</p>}

                            <div className="col-12 table-manage-patient">
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th><FormattedMessage id="patient.booking-modal.numerical-order" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.doctorName" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.price" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.email" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.time" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.fullName" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.phoneNumber" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.address" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.reason" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.status" /></th>
                                            <th>Actions</th>
                                        </tr>
                                        {searchResults && searchResults.length > 0 ? (
                                            searchResults.map((item, index) => {
                                                let status =
                                                    language === LANGUAGES.VI
                                                        ? item.statusTypeDataBooking.valueVi
                                                        : item.statusTypeDataBooking.valueEn;
                                                let time =
                                                    language === LANGUAGES.VI
                                                        ? item.timeTypeDataPatient.valueVi
                                                        : item.timeTypeDataPatient.valueEn;
                                                let date = moment.unix(+item.date / 1000).locale('en').format('ddd -MM/DD/YYYY')
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{`${item.doctorNameData.lastName} ${item.doctorNameData.firstName}`}</td>
                                                        <td>{item.priceTypeDataBooking.valueVi}</td>
                                                        <td>{item.patientData.email}</td>
                                                        <td>{`${time} ${date}`}</td>
                                                        <td>{item.patientName}</td>
                                                        <td>{item.phoneNumber}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{item.reasons}</td>
                                                        <td>{status}</td>
                                                        {/* <td>
                                                            <div className="preview-img-container">
                                                                <input
                                                                    id="previewImg"
                                                                    type="file"
                                                                    hidden
                                                                    onChange={(event) => this.handleOnChangeImage(event)}
                                                                />
                                                                <div
                                                                    className="preview-image"
                                                                    style={{
                                                                        backgroundImage: `url(${this.state.previewImgURL})`,
                                                                    }}
                                                                    onClick={() => this.openPreviewImage()}
                                                                ></div>
                                                            </div>
                                                        </td> */}
                                                        <td>
                                                            <button
                                                                className="mp-btn-confirm"
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                            >
                                                                <FormattedMessage id="patient.booking-modal.confirm" />
                                                            </button>
                                                            {/* <button onClick={() => this.handleEditUserFromParent(item)}>
                                                                <FormattedMessage id="patient.booking-modal.check" />
                                                            </button> */}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: "center" }}>
                                                    no data
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendSchedule={this.sendSchedule}
                        searchResults={searchResults}
                    />

                    {this.state.isOpen === true && (
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )}
                </LoadingOverLay>

                <div className="col-12 mb-5">
                    <TableManagePaidBooking
                        handleEditUserFromParentKey={this.handleEditUserFromParent}
                        action={this.state.action}
                    />
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchableTable);

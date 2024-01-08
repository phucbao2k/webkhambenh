import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './CombinedManageBooking.scss'; 
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { LANGUAGES, CommonUtils } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverLay from "react-loading-overlay";
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import Lightbox from 'react-image-lightbox';
import TableManagePaidBooking from './TableManagePaidBooking';

class CombinedManageBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
            isOpen: false,
            previewImgURL: '',
            avatar: '',
            searchTerm: '',
            searchResults: [],
        }
    }

    handleSearch = async () => {
        try {
            const { searchTerm } = this.state;
            const response = await fetch(`http://localhost:7070/admin/search?searchTerm=${searchTerm}`);
            const data = await response.json();
            this.setState({ searchResults: data });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    async componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async () => {
        let status = 'S3';
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getAllBookingForAdminBooking({
            statusId: status,
            date: formatedDate
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        });
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
        };
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
            avatar: ''
        });
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        });
    }

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
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false
            });
            toast.error('Something went wrong...');
            console.log('error is:', res);
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
            });
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        });
    }

    handleEditUserFromParent = (item) => {
        let imageBase64 = '';
        if (item.image) {
            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
        }
        this.setState({
            avatar: '',
            previewImgURL: imageBase64,
        });
    }

    render() {
        let { language } = this.props;
        let { dataPatient, isOpenRemedyModal, dataModal, searchTerm, searchResults } = this.state;

        return (
            <>
                <LoadingOverLay active={this.state.isShowLoading} spinner text='Loading...'>
                    <div className="combined-manage-booking-container">
                        <div className="m-p-title"><FormattedMessage id="patient.booking-modal.manage-booking" /></div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label><FormattedMessage id="patient.booking-modal.time" /></label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate} />
                            </div>
                            <div className="col-4 form-group">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => this.setState({ searchTerm: e.target.value })}
                                />
                                <button onClick={this.handleSearch}>Search</button>
                            </div>
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
                                            <th><FormattedMessage id="patient.booking-modal.avatar" /></th>
                                            <th>Actions</th>
                                        </tr>
                                        {(searchResults && searchResults.length > 0) ?
                                            searchResults.map((item, index) => {
                                                let time = language === LANGUAGES.VI ?
                                                    item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{`${item.doctorNameData.lastName} ${item.doctorNameData.firstName}`}</td>
                                                        <td>{item.priceTypeDataBooking.valueVi}</td>
                                                        <td>{item.patientData.email}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.phoneNumber}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{item.reasons}</td>
                                                        <td>
                                                            <div className="preview-img-container">
                                                                <input id="previewImg" type="file" hidden
                                                                    onChange={(event) => this.handleOnChangeImage(event)} />
                                                                <div className="preview-image" style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                                                    onClick={() => this.openPreviewImage()}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button className="mp-btn-confirm"
                                                                onClick={() => this.handleBtnConfirm(item)}><FormattedMessage id="patient.booking-modal.confirm" /></button>
                                                            <button onClick={() => this.handleEditUserFromParent(item)}><FormattedMessage id="patient.booking-modal.check" /></button>
                                                        </td>
                                                    </tr>
                                                );
                                            }) :
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: "center" }}>
                                                    no data
                                                </td>
                                            </tr>}
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
                        dataPatient={dataPatient} />
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })} />}
                </LoadingOverLay>
                <div className="col-12 mb-5">
                    <TableManagePaidBooking
                        handleEditUserFromParentKey={this.handleEditUserFromParent}
                        action={this.state.action} />
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
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CombinedManageBooking);

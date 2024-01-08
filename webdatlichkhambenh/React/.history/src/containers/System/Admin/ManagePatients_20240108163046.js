// HIỂN THỊ TẤT CẢ CÁC LỊCH THEO NGÀY


import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { getAllBookingForAdmin } from '../../../services/userService';
import { LANGUAGES, CommonUtils, CRUD_ACTIONS } from '../../../utils';
import RemedyAdminModal from '../Doctor/RemedyAdminModal';

import LoadingOverLay from "react-loading-overlay";

import * as actions from "../../../store/actions";
import TableManagePatients from './TableManagePatients';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn


class ManagePatients extends Component {

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
            bookingArr: [],
            booking: '',
            action: '',
        }

    }


    async componentDidMount() {
        this.props.getBookingAdminStart();
        this.getDataPatient();



    }
    getDataPatient = async () => {
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getAllBookingForAdmin({

            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    convertToValidDate = (birthday) => {
        // Kiểm tra xem birthday có giá trị không
        if (!birthday) {
            return null;
        }

        // Tạo một đối tượng Date từ birthday
        const dateObject = new Date(birthday);

        // Kiểm tra xem đối tượng Date có hợp lệ hay không
        if (isNaN(dateObject.getTime())) {
            return null;
        }

        return dateObject;
    }
    calculateAge = (birthday) => {
        if (!birthday) {
            return 'N/A';
        }

        // Chuyển đổi chuỗi timestamp thành số
        const timestamp = parseInt(birthday, 10);

        // Kiểm tra xem chuyển đổi có thành công không
        if (isNaN(timestamp)) {
            return 'N/A';
        }

        // Chuyển đổi timestamp thành đối tượng Date
        const dateObject = new Date(timestamp);

        // Kiểm tra xem đối tượng Date có hợp lệ hay không
        if (isNaN(dateObject.getTime())) {
            return 'N/A';
        }

        // Lấy ngày hiện tại
        const currentDate = moment();

        // Tính tuổi
        const age = currentDate.diff(moment(dateObject), 'years');

        return age.toString();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.bookingRedux !== this.props.bookingRedux) {
            let arrBookings = this.props.bookingRedux;
            this.setState({
                bookingArr: arrBookings,
                booking: arrBookings && arrBookings.length > 0 ? arrBookings[0].keyMap : '',
            })
        }
        if (prevProps.listBookings !== this.props.listBookings) {
            let arrBookings = this.props.bookingRedux;
            this.setState({
                email: '',
                // plantName: '',
                firstName: '',
                reasons: '',
                address: '',
                action: CRUD_ACTIONS.DELETE,
                booking: arrBookings && arrBookings.length > 0 ? arrBookings[0].keyMap : ''
            })
        }
    }


    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        },
            async () => {

                await this.getDataPatient()
            })
    }
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
            // plantName: item.plantName,
            reasons: item.reasons,
            avatar: item.image,
            statusId: item.statusTypeDataBooking.valueVi,
            doctorName: `${item.doctorNameData.lastName} ${item.doctorNameData.firstName}`
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
            avatar: ''
        })

    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })

    }
    // sendRemedy = async (dataChild) => {
    //     let { dataModal } = this.state;
    //     this.setState({
    //         isShowLoading: true
    //     })
    //     let res = await postSendRemedy({
    //         email: dataChild.email,
    //         imgBase64: dataChild.imgBase64,
    //         doctorId: dataModal.doctorId,
    //         patientId: dataModal.patientId,
    //         timeType: dataModal.timeType,
    //         language: this.props.language,
    //         patientName: dataModal.patientName,
    //     })
    //     if (res && res.errCode === 0) {
    //         this.setState({
    //             isShowLoading: false
    //         })
    //         toast.success('Send Remedy succeeds');
    //         this.closeRemedyModal();
    //         await this.getDataPatient();
    //     } else {
    //         this.setState({
    //             isShowLoading: false
    //         })
    //         toast.error('Something went wrong...');
    //         console.log('error remdey is:', res)
    //     }
    // }
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
        let { language } = this.props;
        let { dataPatient, isOpenRemedyModal, dataModal, avatar } = this.state;
        console.log('checl lang: ' + language)
        return (
            <>

                <LoadingOverLay active={this.state.isShowLoading}
                    spinner
                    text='Loading...'>
                    <div className="manage-patient-container">
                        <div className="title text-center">MANAGE BOOKING</div>

                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label><FormattedMessage id="patient.booking-modal.time" /></label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate} />
                            </div>
                           
                            <div className="col-12 table-manage-patient">
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th><FormattedMessage id="patient.booking-modal.numerical-order" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.doctorName" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.email" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.time" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.fullName" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.phoneNumber" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.address" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.gender" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.age" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.reason" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.avatar" /></th>
                                            <th><FormattedMessage id="patient.booking-modal.status" /></th>
                                            <th>Actions</th>


                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI ?
                                                    item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                let status =
                                                    language === LANGUAGES.VI
                                                        ? item.statusTypeDataBooking.valueVi
                                                        : item.statusTypeDataBooking.valueEn;
                                                let gender =
                                                    language === LANGUAGES.VI
                                                        ? item.genderData.valueVi
                                                        : item.genderData.valueEn;
                                                let age = this.calculateAge(item.birthday);  
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{`${item.doctorNameData.lastName} ${item.doctorNameData.firstName}`}</td>
                                                        <td>{item.patientData.email}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientName}</td>
                                                        <td>{item.phoneNumber}</td>
                                                        <td>{item.patientData.address}</td>
                                                        
                                                        <td>{age}</td>
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
                                                        <td>{status}</td>
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
                                            </tr>
                                            }
                                      
                                    </tbody>



                                </table>
                            </div>

                        </div>
                    </div>

                    <RemedyAdminModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        />
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })} />}

                </LoadingOverLay>

                <div className="col-12 mb-5">
                    <TableManagePatients
                        handleEditUserFromParentKey={this.handleEditUserFromParent}
                        action={this.state.action} />
                </div>
            </>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
        listBookings: state.admin.bookings
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBookingAdminStart: () => dispatch(actions.fetchAllBookingAdminStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatients);





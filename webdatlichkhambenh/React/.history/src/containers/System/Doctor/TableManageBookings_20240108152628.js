// HIỂN THỊ LỊCH SỬ LỊCH HẸN CỦA BÁC SĨ



import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageBookings.scss';
import { LANGUAGES} from '../../../utils';
import { getHistoryBookingForDoctor } from '../../../services/userService';
import moment from 'moment';

import RemedyPatientModal from '../Doctor/RemedyPatientModal';
// nếu muốn import 1 function thì ta dùng dấu ngoặc nhọn
class TableManageBookings extends Component {
    // PROPS stands for properties and is being used for passing data from one component to another.
    // But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)
    constructor(props) {
        super(props);
        this.state = {
           
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {}

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
    //để lưu giá trị của 1 biến components, ta dùng state
    //Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.
    async componentDidMount() {
       
        this.getDataPatient();

    }
    getDataPatient = async () => {
        let { user } = this.props;

        let res = await getHistoryBookingForDoctor({
            doctorId: user.id
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
       
        if (this.props.language !== prevProps.language) {

        }
    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
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
            statusId: item.statusId,
            phoneNumber: item.phoneNumber,
            price: item.priceTypeDataBooking.valueVi,
            status: item.statusTypeDataBooking.valueVi,
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
            avatar: ''
        })

    }
    // handleEditUser = (user) => {
    //     this.props.handleEditUserFromParentKey(user)
    // }
    render() {


        //khi muốn render ra 1 thứ gì đó trong react, chúng ta phải có hàm return, và trong đó bắt buộc là 1 khối
        let { language } = this.props;
       
        let { dataPatient ,isOpenRemedyModal, dataModal } = this.state;
        return (
            <React.Fragment>
                <div className="users-container">




                    <div className="col-12 users-table mt-3 mx-1">
                        <div className="title"><FormattedMessage id="patient.booking-modal.booking-history" /></div>
                        <div className="col-2 form-group">
                            <label><FormattedMessage id="patient.booking-modal.total" /> : {dataPatient && dataPatient.length > 0 ? '' + dataPatient.length : ''}</label>

                        </div>

                        <table id="TableManageBookings" style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <th><FormattedMessage id="patient.booking-modal.numerical-order" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.price" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.time" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.fullName" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.phoneNumber" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.address" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.age" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.reason" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.avatar" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.status" /></th>
                                    <th>Actions</th>
                                </tr>
                                {dataPatient && dataPatient.length > 0 && dataPatient.map((item, index) => {
                                    // để duyệt 1 vòng lặp, ta có thể dùng function map(), bắt buộc phải return ra 1 thứ gì đó
                                    let date = moment.unix(+item.date / 1000).locale('en').format('ddd -MM/DD/YYYY')
                                    // thì function map() mới hoạt động được
                                    let status =
                                        language === LANGUAGES.VI
                                            ? item.statusTypeDataBooking.valueVi
                                            : item.statusTypeDataBooking.valueEn;
                                    let age = this.calculateAge(item.birthday);
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.priceTypeDataBooking.valueVi}</td>
                                            <td>{date}</td>
                                            <td>{item.patientName}</td>
                                            <td>{item.phoneNumber}</td>
                                         
                                            <td>{item.patientData.address}</td>
                                            <td>{age}</td>
                                            <td>{item.reasons}</td>
                                            <td>{status}</td>
                                            <td>
                                                <button className="mp-btn-confirm"
                                                    onClick={() => this.handleBtnConfirm(item)}><FormattedMessage id="patient.booking-modal.viewbooking" /></button>
                                                {/* <button className="btn-delete" onClick={() => this.handleDeleteBooking(item)}><i className="fa-solid fa-trash"></i></button> */}
                                                {/* item là 1 object lưu trữ tất cả thông tin của người dùng */}
                                            </td>
                                           
                                        </tr>
                                    )
                                })}
                            </tbody>

                        </table>
                    </div>


                </div>

                <RemedyPatientModal
                    isOpenModal={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                />
            </React.Fragment>

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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageBookings);

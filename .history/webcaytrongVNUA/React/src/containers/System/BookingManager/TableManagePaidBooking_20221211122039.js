import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageBooking.scss';
import { getHistoryBookingForPatient } from '../../../services/userService';
import moment from 'moment';
import RemedyPatientModal from '../Doctor/RemedyPatientModal';
// nếu muốn import 1 function thì ta dùng dấu ngoặc nhọn
class TableManageBooking extends Component {
    // PROPS stands for properties and is being used for passing data from one component to another.
    // But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)
    constructor(props) {
        super(props);
        this.state = {

            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
          doctorId: ''
        }
    }
    //để lưu giá trị của 1 biến components, ta dùng state
    //Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.
    async componentDidMount() {

        this.getDataPatient();

    }
    getDataPatient = async () => {
        let { user } = this.props;
      
        let res = await getHistoryBookingForPatient({
            patientId: user.id
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
            plantName: item.plantName,
            reasons: item.reasons,
            avatar: item.image,
            statusId: item.statusId,
            // phoneNumber: item.doctorPhone.phoneNumber
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

       
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        return (
            <React.Fragment>
                <div className="users-container">




                    <div className="col-12 users-table mt-3 mx-1">
                        <div className="title"><FormattedMessage id="patient.booking-modal.booking-history" /></div>
                        <div className="col-2 form-group">
                            <label><FormattedMessage id="patient.booking-modal.total" /> : {dataPatient && dataPatient.length > 0 ? '' + dataPatient.length : ''}</label>

                        </div>

                        <table id="TableManageBooking" style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <th><FormattedMessage id="patient.booking-modal.numerical-order" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.time" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.fullName" /></th>
                                    {/* <th>Số điện thoại bác sĩ:</th> */}
                                    <th><FormattedMessage id="patient.booking-modal.email" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.address" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.plantName" /></th>
                                    <th><FormattedMessage id="patient.booking-modal.reason" /></th>
                                    <th>Actions</th>
                                </tr>
                                {dataPatient && dataPatient.length > 0 && dataPatient.map((item, index) => {
                                    // để duyệt 1 vòng lặp, ta có thể dùng function map(), bắt buộc phải return ra 1 thứ gì đó
                                    let date = moment.unix(+item.date / 1000).locale('en').format('ddd -MM/DD/YYYY')
                                    // thì function map() mới hoạt động được
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{date}</td>
                                            <td>{item.patientData.firstName}</td>
                                            
                                            <td>{item.patientData.email}</td>
                                            <td>{item.patientData.address}</td>
                                            <td>{item.plantName}</td>
                                            <td>{item.reasons}</td>
                                            <td>
                                                <button className="mp-btn-confirm"
                                                    onClick={() => this.handleBtnConfirm(item)}><FormattedMessage id="patient.booking-modal.check" /></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageBooking);

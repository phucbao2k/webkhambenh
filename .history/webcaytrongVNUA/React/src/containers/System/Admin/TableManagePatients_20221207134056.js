import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagePatients.scss';
import * as actions from "../../../store/actions";
import { getAllBookings } from '../../../services/userService';
import moment from 'moment';

// nếu muốn import 1 function thì ta dùng dấu ngoặc nhọn
class TableManagePatients extends Component {
    // PROPS stands for properties and is being used for passing data from one component to another.
    // But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)
    constructor(props) {
        super(props);
        this.state = {
            bookingsAdminRedux: [],
            dataPatient: []
            
        }
    }
    //để lưu giá trị của 1 biến components, ta dùng state
    //Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.
    async componentDidMount() {
        this.props.fetchBookingAdminRedux();
        this.getDataPatient();
       
    }
    getDataPatient = async () => {
        
        let res = await getAllBookings({

           
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
   
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listBookings !== this.props.listBookings) {
            this.setState({
                bookingsAdminRedux: this.props.listBookings,
            })
        }
        if (this.props.language !== prevProps.language) {

        }
    }

    handleDeleteBooking = (booking) => {
        this.props.deleteBookingRedux(booking.id);
    }

    // handleEditUser = (user) => {
    //     this.props.handleEditUserFromParentKey(user)
    // }
    render() {
      

        //khi muốn render ra 1 thứ gì đó trong react, chúng ta phải có hàm return, và trong đó bắt buộc là 1 khối
        let arrBookings = this.state.bookingsAdminRedux;
      console.log('check bookings',arrBookings)
     
        return (
            <React.Fragment>
                <div className="users-container">




                    <div className="col-12 users-table mt-3 mx-1">
                        <div className="title">List Bookings</div>
                        <div className="col-2 form-group">
                            <label><FormattedMessage id="patient.booking-modal.total" /> : {arrBookings && arrBookings.length > 0 ? '' + arrBookings.length : ''}</label>
                           
                        </div>
                       
                        <table id="TableManagePatients" style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <th><FormattedMessage id="patient.booking-modal.numerical-order" /></th>
                                        <th><FormattedMessage id="patient.booking-modal.time" /></th>
                                        <th><FormattedMessage id="patient.booking-modal.fullName" /></th>
                                        <th><FormattedMessage id="patient.booking-modal.email" /></th>
                                        <th><FormattedMessage id="patient.booking-modal.address" /></th>
                                        <th><FormattedMessage id="patient.booking-modal.plantName" /></th>
                                        <th><FormattedMessage id="patient.booking-modal.reason" /></th>
                                        <th>Actions</th>
                                    </tr>
                                    {arrBookings && arrBookings.length > 0 && arrBookings.map((item, index) => {
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
                                                    {/* <button className="mp-btn-confirm"
                                                    onClick={() => this.handleBtnConfirm(item)}>Xác nhận</button> */}
                                                    <button className="btn-delete" onClick={() => this.handleDeleteBooking(item)}><i className="fa-solid fa-trash"></i></button>
                                                    {/* item là 1 object lưu trữ tất cả thông tin của người dùng */}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>

                            </table>
                        </div>
                        
                    
                </div>
               

            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        listBookings: state.admin.bookings
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBookingAdminRedux: () => dispatch(actions.fetchAllBookingAdminStart()),
        deleteBookingRedux: (id) => dispatch(actions.deleteBookingService(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagePatients);

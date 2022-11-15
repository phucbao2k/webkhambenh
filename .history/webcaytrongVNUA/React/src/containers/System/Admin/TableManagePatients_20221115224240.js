import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagePatients.scss';
import * as actions from "../../../store/actions";
import { getAllBookings } from '../../../services/userService';
import moment from 'moment';
import _ from 'lodash';
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




                    <div className=" users-table mt-3 mx-1">
                        <div className="title">List Bookings</div>
                        <div className="col-2 form-group">
                            <label>Tổng cộng:  {arrBookings && arrBookings.length > 0 ? '' + arrBookings.length : ''}</label>
                           
                        </div>
                        <div className="col-12 table-manage-patient"></div>
                        
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

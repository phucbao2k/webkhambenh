import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../store/actions";
class TableManageClinic extends Component {
    // PROPS stands for properties and is being used for passing data from one component to another.
    // But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)
    constructor(props) {
        super(props);
        this.state = {
            clinicsRedux: [],
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }
    //để lưu giá trị của 1 biến components, ta dùng state
    //Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.
    componentDidMount() {
        this.props.fetchClinicRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listClinics !== this.props.listClinics) {
            this.setState({
                clinicsRedux: this.props.listClinics,
            })
        }
    }

    handleDeleteClinic = (clinic) => {
        this.props.deleteClinicRedux(clinic.id);
    }

    handleEditClinic = (clinic) => {
        this.props.handleEditClinicFromParentKey(clinic)
    }
   
    render() {


        //khi muốn render ra 1 thứ gì đó trong react, chúng ta phải có hàm return, và trong đó bắt buộc là 1 khối
        let arrClinics = this.state.clinicsRedux;
        console.log('check clinics: ',arrClinics)

        return (
            <React.Fragment>
                <div className="users-container">




                    <div className="users-table mt-3 mx-1">
                        <table id="TableManageUser">
                            <tbody>
                                <tr>
                                    <th><FormattedMessage id="menu.admin.clinic-name" /></th>
                                    <th><FormattedMessage id="menu.admin.address" /></th>
                                    <th><FormattedMessage id="menu.admin.detail" /></th>
                                    <th>Actions</th>
                                </tr>
                                {arrClinics && arrClinics.length > 0 && arrClinics.map((item, index) => {
                                    // để duyệt 1 vòng lặp, ta có thể dùng function map(), bắt buộc phải return ra 1 thứ gì đó
                                    // thì function map() mới hoạt động được
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td> 
                                            <td>{item.address}</td>
                                            <td>{item.descriptionMarkdown}</td>
                                            <td>
                                                <button className="btn-edit"
                                                    onClick={() => this.handleEditClinic(item)}><i className="fa-solid fa-pencil"></i></button>
                                                <button className="btn-delete" onClick={() => this.handleDeleteClinic(item)}><i className="fa-solid fa-trash"></i></button>
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
        listClinics: state.admin.clinics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClinicRedux: () => dispatch(actions.fetchAllClinicStart()),
        deleteClinicRedux: (id) => dispatch(actions.deleteClinic(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);

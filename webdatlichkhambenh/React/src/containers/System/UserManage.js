import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
// import ModalUser from './ModalUser';
// import { emitter } from '../../utils/emitter';
// import ModalEditUser from './ModalEditUser';
// import Header from '../Header/Header';
// import { getAllSpecialty, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
// nếu muố import 1 function thì ta dùng dấu ngoặc nhọn
class UserManage extends Component {
    // stands for properties and is being used for passing data from one component to another.
    // But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)
    constructor(props) {
        super(props);
        this.state = {
            // arrUsers: [],
            // isOpenModalUser: false,
            // isOpenModalEditUser: false,
            // userEdit: {},
            // dataSpecialty: []
        }
    }
    //để lưu giá trị của 1 biến components, ta dùng state
    //Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.
   
    // getAllUsersFromReact = async () => {
    //     let response = await getAllUsers('ALL');
    //     if (response && response.errCode === 0) {
    //         this.setState({
    //             arrUsers: response.users
    //         })
    //     }
    // }
    // handleAddNewUser = () => {
    //     this.setState({
    //         isOpenModalUser: true,
    //     })
    // }
    // toggleUserModal = () => {
    //     this.setState({
    //         isOpenModalUser: !this.state.isOpenModalUser,
    //     })
    // }
    // toggleUserEditModal = () => {
    //     this.setState({
    //         isOpenModalEditUser: !this.state.isOpenModalEditUser,
    //     })
    // }
    // createNewUser = async (data) => {
    //     try {
    //         let response = await createNewUserService(data);
    //         if (response && response.errCode !== 0) {
    //             alert(response.errMessage);
    //         } else {
    //             await this.getAllUsersFromReact(); //
    //             this.setState({
    //                 isOpenModalUser: false,
    //             })
    //             emitter.emit('EVENT_CLEAR_MODAL_DATA')
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    // handleDeleteUser = async (user) => {
    //     try {
    //         let res = await deleteUserService(user.id);
    //         if (res && res.errCode === 0) {
    //             await this.getAllUsersFromReact();
    //         }
    //         else {
    //             alert(res.errMessage);
    //         }
    //     } catch (e) {

    //     }
    // }
    // handleEditUser = (user) => {
    //     this.setState({
    //         isOpenModalEditUser: true,
    //         userEdit: user
    //     })
    // }
    // doEditUser = async (user) => {
    //     try {
    //         let res = await editUserService(user);
    //         if (res && res.errCode === 0) {
    //             this.setState({
    //                 isOpenModalEditUser: false
    //             })
    //             await this.getAllUsersFromReact()

    //         } else {
    //             alert(res.errCode)
    //         }
    //     } catch (e) {

    //     }


    // }
    //toggle nghĩa là click ra bên ngoài, tác dụng là đóng hoặc mở modal
    render() {
        // let { dataSpecialty } = this.state;
        // console.log('check render', this.state)
        //khi muốn render ra 1 thứ gì đó trong react, chúng ta phải có hàm return, và trong đó bắt buộc là 1 khối
        // let arrUsers = this.state.arrUsers;

        return (
            <div className="user-container" >
              
                {/* <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser} />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                } */}

                <div className="user-container title text-center">Welcome!</div>
               
                {/* <div className="mx-1">
                    <button className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}><i className="fa-solid fa-plus"></i>Add new user</button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                // để duyệt 1 vòng lặp, ta có thể dùng function map(), bắt buộc phải return ra 1 thứ gì đó
                                // thì function map() mới hoạt động được
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit" onClick={() => this.handleEditUser(item)} ><i className="fa-solid fa-pencil"></i></button>
                                            <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div> */}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

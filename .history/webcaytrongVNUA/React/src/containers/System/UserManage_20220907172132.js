import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import ModalUser from './ModalUser';
import {getAllUsers, cre}
import {getAllUsers} from '../../services/userService'; // nếu muố import 1 function thì ta dùng dấu ngoặc nhọn
class UserManage extends Component {
// stands for properties and is being used for passing data from one component to another.
// But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)
   constructor(props) {
    super(props);
    this.state ={
        arrUsers:[],
        isOpenModalUser:false,
    }
   }
//để lưu giá trị của 1 biến components, ta dùng state
//Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.
    async componentDidMount() {
let response = await getAllUsers('ALL');
if(response && response.errCode ===0){
    this.setState({
        arrUsers: response.users
    })
}
    }
handleAddNewUser =()=>{
this.setState({
    isOpenModalUser:true,
})
}
toggleUserModal =() =>
{
this.setState({
    isOpenModalUser: !this.state.isOpenModalUser,
})
}
//toggle nghĩa là click ra bên ngoài, tác dụng là đóng hoặc mở modal
    render() {
        
        // console.log('check render', this.state)
        //khi muốn render ra 1 thứ gì đó trong react, chúng ta phải có hàm return, và trong đó bắt buộc là 1 khối
        let arrUsers = this.state.arrUsers;
        return (
           <div className="users-container">
             <ModalUser
             isOpen={this.state.isOpenModalUser}
             toggleFromParent={this.toggleUserModal}/>
            <div className="title text-center">Manage Users with BaoPhuc</div>
            <div className="mx-1">
                <button className="btn btn-primary px-3"
                onClick={()=>this.handleAddNewUser()}><i className="fa-solid fa-plus"></i>Add new user</button>
            </div>
            <div className="users-table mt-3 mx-1">
                <table id="customers">
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {arrUsers && arrUsers.map((item, index)=>{
                        // để duyệt 1 vòng lặp, ta có thể dùng function map(), bắt buộc phải return ra 1 thứ gì đó
                        // thì function map() mới hoạt động được
                        return(
                            <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className="btn-edit"><i class="fa-solid fa-pencil"></i></button>
                                    <button className="btn-delete"><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
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

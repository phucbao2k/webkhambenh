import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../store/actions";
// import Header from '../Header/Header';

 // nếu muốn import 1 function thì ta dùng dấu ngoặc nhọn
class TableManageUser extends Component {
// stands for properties and is being used for passing data from one component to another.
// But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)
   constructor(props) {
    super(props);
    this.state ={
       usersRedux: []
    }
   }
//để lưu giá trị của 1 biến components, ta dùng state
//Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.
     componentDidMount() {
      this.props.fetchUserRedux();
    }
//     getAllUsersFromReact = async()=>{
// let response = await getAllUsers('ALL');
// if(response && response.errCode === 0){
//     this.setState({
//         arrUsers: response.users
//     })
// }
//     }
componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.listUsers !== this.props.listUsers){
        this.setState({
            usersRedux: this.props.listUsers,
        })
    }
}
// handleAddNewUser =()=>{
// this.setState({
//     isOpenModalUser:true,
// })
// }
handleDeleteUser=(user)=>{
    this.props.deleteUserRedux(user.id);
}
// toggleUserModal =() =>
// {
// this.setState({
//     isOpenModalUser: !this.state.isOpenModalUser,
// })
// }
// toggleUserEditModal =()=>{
//     this.setState({
//         isOpenModalEditUser: !this.state.isOpenModalEditUser,
//     })
// }
// createNewUser = async(data) =>{
//     try{
// let response = await createNewUserService(data);
// if(response && response.errCode !==0){
//     alert(response.errMessage);
// }else{
//     await this.getAllUsersFromReact(); //
//     this.setState({
//         isOpenModalUser: false,
//     })
//     emitter.emit('EVENT_CLEAR_MODAL_DATA')
// }
//     }catch(e){
// console.log(e);
//     }
// }
// handleDeleteUser = async(user)=>{
//     try{
// let res = await deleteUserService(user.id);
// if(res && res.errCode ===0){
//     await this.getAllUsersFromReact();
// }
// else{
//     alert(res.errMessage);
// }
//     }catch(e){

//     }
// }
// handleEditUser =(user)=>{
//     this.setState({
//         isOpenModalEditUser: true,
//         userEdit: user
//     })
// }
// doEditUser = async (user) =>{
//     try{
//         let res = await editUserService(user);
//         if(res && res.errCode === 0){
//             this.setState({
//                 isOpenModalEditUser: false
//             })
//             await this.getAllUsersFromReact()
           
//         }else{
//             alert(res.errCode)
//         }
//     }catch(e){

//     }


// }
//toggle nghĩa là click ra bên ngoài, tác dụng là đóng hoặc mở modal
    render() {
        
        // console.log('check render', this.state)
        //khi muốn render ra 1 thứ gì đó trong react, chúng ta phải có hàm return, và trong đó bắt buộc là 1 khối
        let arrUsers = this.state.usersRedux;
        console.log('check all users', this.props.);
        return (
           <div className="users-container">
             
         
            <div className="title text-center">Manage Users with TaBaoPhuc</div>
           
            <div className="users-table mt-3 mx-1">
                <table id="TableManageUser">
                    <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {arrUsers && arrUsers.length>0 || arrUsers.map((item, index)=>{
                        // để duyệt 1 vòng lặp, ta có thể dùng function map(), bắt buộc phải return ra 1 thứ gì đó
                        // thì function map() mới hoạt động được
                        return(
                            <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className="btn-edit" ><i className="fa-solid fa-pencil"></i></button>
                                    <button className="btn-delete" onClick={()=>this.handleDeleteUser(item)}><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                   
                </table>
            </div>
           </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);

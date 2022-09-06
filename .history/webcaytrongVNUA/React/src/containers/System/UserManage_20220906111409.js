import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers} from '../../services/userService';
class UserManage extends Component {

   constructor(props) {
    super(props);
    this.state ={
        arrUsers:[]
    }
   }

    async componentDidMount() {
let response = await getAllUsers('ALL');
if(response && response.errCode ===0){
    this.setState({
        arrUsers: response.users
    })
}
    }


    render() {
        console.log('check render', this.state)
        let arrUsers = this.state.arrUsers;
        return (
           <div className="users-container">
            <div className="title text-center">Manage Users with Baop</div>
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

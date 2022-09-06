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

    componentDidMount() {

    }


    render() {
        return (
            <div className="text-center">Manage users</div>
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

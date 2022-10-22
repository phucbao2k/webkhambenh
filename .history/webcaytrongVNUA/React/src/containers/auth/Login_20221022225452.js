import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
// import {userService} from '../../services'

import { handleLoginApi } from '../../services/userService';
import { reject } from 'lodash';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isShowPassword: false,
      errMessage: ''
    }
  }

  handleOnChangeUsername = (event) => {
    this.setState({ username: event.target.value })
  }
  handleOnChangePassword = (event) => {
    this.setState({ password: event.target.value })
  }
  handleLogin = async () => {
    this.setState({
      errMessage: ''
      // để clear mã lỗi trong trường hợp lần đăng nhập trước
      // bị lỗi, lần nhập thông tin sau sẽ hiện ra mã lỗi khác hoặc đăng nhập thành công 
    })
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message
        })
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user)

      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errorMessage: error.response.data.message
          })
        }
      }
    }
  }

  handleShowHidePassword = (event) => {
    this.setState({
      isShowPassword: !this.state.isShowPassword
    })
  }
  handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.handleLogin();
    }
  }
  render() {
    //JSX

    return (
      <form>

      </form>
     
    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
    // adminLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

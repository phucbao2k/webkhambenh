import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import Register from './Register';
// import {userService} from '../../services'
import { emitter } from '../../utils/emitter';
import { handleLoginApi, createNewUserService } from '../../services/userService';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
       isOpenModalUser: false,
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
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    })
  }
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    })
  }
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        this.setState({
          isOpenModalUser: false,
        })
        emitter.emit('EVENT_CLEAR_MODAL_DATA')
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    //JSX

    return (
     
        <div className="login-background">
        <Register
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser} />
          <div className="login-container">
            <div className="login-content row">

              <div className="col-12  text-login">Login </div>
              <div className="col-12 form-group login-input">
              <label><FormattedMessage id="create-user.email" /></label>
                <input type="text" className="form-control" placeholder="Enter your username"
                  value={this.state.username} onChange={(event) => this.handleOnChangeUsername(event)}></input>
              </div>
              <div className="col-12 form-group login-input">
              <label><FormattedMessage id="create-user.password" /></label>
                <div className="cus-password-input">
                  <input type={this.state.isShowPassword ? 'text' : 'password'}
                    className="form-control" placeholder="Enter your password"
                    value={this.state.password}
                    onChange={(event) => { this.handleOnChangePassword(event) }}
                    onKeyDown={(event) => this.handleKeyDown(event)} ></input>
                  <span onClick={() => { this.handleShowHidePassword() }}>

                    <i className={this.state.isShowPassword ? 'fa-solid fa-eye' : 'fa-regular fa-eye-slash'}></i>
                  </span>

                </div>


              </div>
              <div className="col-12" style={{ color: 'red' }}>
                {this.state.errMessage}
              </div>
              {/* Đây là cách cmt của React, và style inline của React được viết như trên kia  */}
              <div className="col-12 login-input">
                <button className="btn-login" onClick={() => { this.handleLogin() }}>Login</button>
              </div>
              <div className="col-12">
                <span className="sign-up">Or</span>
              </div>
              <div className="col-12 login-input">
              <button className="btn-login" onClick={() => { this.handleAddNewUser() }}><FormattedMessage id="create-user.title" /></button>
              </div>
              {/* <div className="col-12">
                <span className="forgot-pass">Forgot your password?</span>
              </div> */}
              {/* <div className="col-12 text-center mt-3">
                <span >Or Login with:</span>
              </div>
              <div className="col-12 social-login">
                <i className="fa-brands fa-google google"></i>
                <i className="fa-brands fa-facebook-f facebook"></i>
                <i className="fa-brands fa-twitter twitter"></i>
              </div> */}

            </div>
          </div>
        </div>
    
     
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

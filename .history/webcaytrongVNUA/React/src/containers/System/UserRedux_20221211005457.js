import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../utils';
import './UserRedux.scss';
import TableManageUser from './TableManageUser';
import * as actions from '../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
class UserRedux extends Component {

  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleIdArr: [],
      isOpen: false,
      previewImgURL: '',

      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      gender: '',
      position: '',
      role: '',
      avatar: '',
      action: '',
      userEditId: '',
    };
  }

  async componentDidMount() {

    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleIdStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux

    ) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length ? arrGenders[0].keyMap : ''

      })
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
      })
    }
    if (prevProps.roleIdRedux !== this.props.roleIdRedux) {
      let arrRoles = this.props.roleIdRedux;
      this.setState({
        roleIdArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
      })
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleIdRedux;
      let arrPositions = this.props.positionRedux;
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
        position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
        avatar: '',
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: ''
      })
    }
  }
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      })
    }
  }
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true
    })
  }
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar
      })
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar
      })
    }


  }
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber']
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert('This input is required: ' + arrCheck[i]);
        break;
      }
    }
    return isValid;
  }
  onChangeInput = (event, id) => {
    let copyState = { ...this.state }
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    })
  }

  handleEditUserFromParent = (user) => {
    let imageBase64 = '';
    if (user.image) {
      imageBase64 = new Buffer(user.image, 'base64').toString('binary');
      //Buffer cung cấp cách xử lý dữ liệu dạng nhị phân, 
      //câu lệnh trên xử lý dữ liệu BLOB (được mã hóa là base64) sang dữ liệu binary 
    }
    this.setState({
      email: user.email,
      password: '????????????????????????????????????????',
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      avatar: '',
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id
    })
  }
  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roleIds = this.state.roleIdArr;
    let isGetGenders = this.props.isLoadingGenders;
    let language = this.props.language;
    let { email, password, firstName, lastName, phoneNumber, address, gender, position, role
      , avatar } = this.state;
    //đây là cách viết của ES7
    return (

      <div className="user-redux-container" >
        <div className="title">
          <FormattedMessage id="create-user.title" />
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {isGetGenders === true ? 'Loading...' : ''}
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="validationServerUsername"> <FormattedMessage id="create-user.email" /></label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend3">@</span>
                  </div>
                  <input type="email" className="form-control" id="validationServerUsername" placeholder="..." aria-describedby="inputGroupPrepend3" required
                    value={email}
                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} />

                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="validationServerUsername"> <FormattedMessage id="create-user.password" /></label>
                <div className="input-group">

                  <input type="password" className="form-control " id="validationServerUsername" placeholder="..."
                    aria-describedby="inputGroupPrepend3" required
                    value={password}
                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} />

                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="validationServer01"> <FormattedMessage id="create-user.firstname" /></label>
                <input type="text" className="form-control " id="validationServer01" placeholder="..." required
                  value={firstName}
                  onChange={(event) => { this.onChangeInput(event, 'firstName') }} />

              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="validationServer02"> <FormattedMessage id="create-user.lastname" /></label>
                <input type="text" className="form-control " id="validationServer02" placeholder="..." required
                  value={lastName}
                  onChange={(event) => { this.onChangeInput(event, 'lastName') }} />

              </div>

            </div>
            <div className="row">
              <div className="form-group col-md-3 mb-3">
                <label htmlFor="validationServerUsername"> <FormattedMessage id="create-user.roleid" /></label>
                <select id="inputState" className="form-control"
//thêm dữ liệu vào option chọn roleId qua valueEn, valueVi đã lấy được từ redux...
                  onChange={(event) => { this.onChangeInput(event, 'role') }}
                  value={role}>
                  {roleIds && roleIds.length > 0 && roleIds.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                    )
                  })
                  }
                </select>
              </div>
              <div className="form-group col-md-3 mb-3">
                <label htmlFor="validationServerUsername"> <FormattedMessage id="create-user.position" /></label>

                <select id="inputState" className="form-control"
                  onChange={(event) => { this.onChangeInput(event, 'position') }}
                  value={position}>
                  {positions && positions.length > 0 && positions.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                    )
                  })
                  }
                </select>

              </div>
              <div className="form-group col-md-3 mb-3">
                <label htmlFor="validationServer01"> <FormattedMessage id="create-user.gender" /></label>

                <select id="inputState" className="form-control"
                  onChange={(event) => { this.onChangeInput(event, 'gender') }}
                  value={gender}>
                  {genders && genders.length > 0 && genders.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                    )
                  })
                  }

                </select>

              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="validationServer04"> <FormattedMessage id="create-user.phonenumber" /></label>
                <input type="text" className="form-control " id="validationServer04" placeholder="..." required
                  value={phoneNumber}
                  onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} 
                  disabled/>

              </div>


            </div>
            <div className="row">
              <div className="col-md-9 mb-3">
                <label htmlFor="validationServer03"> <FormattedMessage id="create-user.address" /></label>
                <input type="text" className="form-control " id="validationServer03" placeholder="..." required
                  value={address}
                  onChange={(event) => { this.onChangeInput(event, 'address') }} />

              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="validationServer02"> <FormattedMessage id="create-user.image" /></label>
                <div className="preview-img-container">
                  <input id="previewImg" type="file" hidden
                    onChange={(event) => this.handleOnChangeImage(event)} />
                  <label className="label-upload" htmlFor="previewImg">Upload<i className="fa-solid fa-upload"></i></label>
                  <div className="preview-image" style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                    onClick={() => this.openPreviewImage()}
                  >

                  </div>
                </div>


              </div>

            </div>


            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" required />
                <label className="form-check-label" htmlFor="invalidCheck3">
                  <FormattedMessage id="create-user.agree" />
                </label>
                <div className="invalid-feedback">
                  <FormattedMessage id="create-user.confirm" />
                </div>
              </div>
            </div>
            <div className="col-12 my-3">
              <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"} type="submit"
                onClick={() => this.handleSaveUser()}>
                {this.state.action === CRUD_ACTIONS.EDIT ?
                  <FormattedMessage id="manage-user.edit"></FormattedMessage>
                  : <FormattedMessage id="manage-user.save"></FormattedMessage>}
                {/* <FormattedMessage id="create-user.submit"/> */}
              </button>
            </div>
            <div className="col-12 mb-5">
              <TableManageUser
                handleEditUserFromParentKey={this.handleEditUserFromParent}
                action={this.state.action} />
            </div>

          </div>
        </div>
        {this.state.isOpen === true &&
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })} />}
      </div>

    )
  }

}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleIdRedux: state.admin.roleIds,
    isLoadingGenders: state.admin.loadingGenders,
    listUsers: state.admin.users
  };
};
//những cái biến state ở trên hàm mapStateToProps được khai báo trùng với các biến ở trên file này, không cần khai báo ở file
//khác và có thể sử dụng ở file khác, vế trái là ta tự khai báo
const mapDispatchToProps = dispatch => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleIdStart: () => dispatch(actions.fetchRoleIdStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    editUserRedux: (data) => dispatch(actions.editUser(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

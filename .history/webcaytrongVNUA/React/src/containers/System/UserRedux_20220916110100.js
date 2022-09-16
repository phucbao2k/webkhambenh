import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils';
import './UserRedux.scss';
import TableManageUser from './TableManageUser';
import * as actions from '../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state ={
            genderArr: [],
            positionArr: [],
            roleIdArr: [],
            isOpen: false,
            previewImgURL: '',

            email: '',
            password:'',
            firstName: '',
            lastName:'',
            phoneNumber: '',
            address: '',
            position: '',
            role: '',
            avatar: '',
        };
    }

    async componentDidMount() {
// try{
//     let res = await getAllCodeService('gender');
   
//     if(res && res.errCode===0){
//         this.setState({genderArr: res.data});
        
//     }
// }catch(e){
// console.log(e);
// }
// try{
//     let res = await getAllCodeService('position');
//     if(res && res.errCode===0){
//         this.setState({positionArr: res.data});
        
//     }
// }catch(e){
//     console.log(e);
// }
// try{
//     let res = await getAllCodeService('role');
//     if(res && res.errCode===0){
//         this.setState({roleIdArr: res.data});
        
//     }
// }catch(e){
// console.log(e);
// }
this.props.getGenderStart();
this.props.getPositionStart();
this.props.getRoleIdStart();
    }
componentDidUpdate( prevProps,prevState, snapshot){
    if(prevProps.genderRedux !== this.props.genderRedux
      
          ){
            let arrGenders = this.props.genderRedux;
        this.setState({
            genderArr: arrGenders,
            gender: arrGenders && arrGenders.length ? arrGenders[0].key : ''
          
        })
    }
    if(prevProps.positionRedux !== this.props.positionRedux){
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '',
      })
    }
    if(prevProps.roleIdRedux !== this.props.roleIdRedux){
      let arrRoles = this.props.roleIdRedux;
      this.setState({
        roleIdArr: arrRoles,
        role: arrRoles && arrRoles.lenght > 0 ? arrRoles[0].key : ''
      })
    }
    if(prevProps.listUsers)
}
handleOnChangeImage = (event)=>{
  let data = event.target.files;
  let file = data[0];
  if(file){
    let objectUrl = URL.createObjectURL(file);
    this.setState({
      previewImgURL: objectUrl,
      avatar: file
    })
  }
}
openPreviewImage = ()=>{
  if(!this.state.previewImgURL) return;
  this.setState({
    isOpen: true
  })
}
handleSaveUser = ()=>{
  let isValid = this.checkValidateInput();
  if(isValid ===false) return;

  this.props.createNewUser({
    email: this.state.email,
    password: this.state.password,
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    address: this.state.address,
    phoneNumber: this.state.phoneNumber,
    gender: this.state.gender,
    roleId: this.state.role,
    positionId: this.state.position
  })
}
checkValidateInput=()=>{
  let isValid = true;
  let arrCheck = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber']
  for (let i = 0; i < arrCheck.length; i++){
    if(!this.state[arrCheck[i]]){
      isValid = false;
      alert('This input is required: ' + arrCheck[i]);
      break;
    }
  }
  return isValid;
}
onChangeInput = (event, id)=>{
  let copyState = {...this.state}
  copyState[id] = event.target.value;
  this.setState({
    ...copyState,
  })
}
    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roleIds = this.state.roleIdArr;
      let isGetGenders = this.props.isLoadingGenders;
       let language = this.props.language;
       let {email, password, firstName, lastName, phoneNumber,address,gender,position,role
      ,avatar}= this.state;
        return (
            
            <div className="user-redux-container" >
                <div className="title">
                   <FormattedMessage id="create-user.title"/>
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                          <div className="col-12">
                            {isGetGenders===true? 'Loading...':''}
                          </div>
                        <div className="col-md-3 mb-3">
      <label htmlFor="validationServerUsername"> <FormattedMessage id="create-user.email"/></label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroupPrepend3">@</span>
        </div>
        <input type="email" className="form-control" id="validationServerUsername" placeholder="..." aria-describedby="inputGroupPrepend3" required
        value={email}
        onChange={(event) =>{this.onChangeInput(event,'email')}}/>
       
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServerUsername"> <FormattedMessage id="create-user.password"/></label>
      <div className="input-group">
        
        <input type="password" className="form-control " id="validationServerUsername" placeholder="..."
         aria-describedby="inputGroupPrepend3" required
         value={password}
        onChange={(event) =>{this.onChangeInput(event,'password')}}/>
        
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer01"> <FormattedMessage id="create-user.firstname"/></label>
      <input type="text" className="form-control " id="validationServer01" placeholder="..."  required
      value={firstName}
      onChange={(event) =>{this.onChangeInput(event,'firstName')}}/>
    
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer02"> <FormattedMessage id="create-user.lastname"/></label>
      <input type="text" className="form-control " id="validationServer02" placeholder="..."  required
      value={lastName}
      onChange={(event) =>{this.onChangeInput(event,'lastName')}}/>
      
    </div>
   
  </div>
  <div className="row">
                        <div className="form-group col-md-3 mb-3">
      <label htmlFor="validationServerUsername"> <FormattedMessage id="create-user.roleid"/></label>
      <select id="inputState" className="form-control" 
    
      onChange={(event) =>{this.onChangeInput(event,'role')}}>
      {roleIds && roleIds.lenght > 0 ||  roleIds.map((item, index)=>{
                    return(
                        <option key={index} value={item.key}>
                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                    )
                  })
                  } 
                  </select>
    </div>
    <div className="form-group col-md-3 mb-3">
      <label htmlFor="validationServerUsername"> <FormattedMessage id="create-user.position"/></label>
    
      <select id="inputState" className="form-control" 
      onChange={(event) =>{this.onChangeInput(event,'position')}}>
      {positions && positions.lenght > 0 ||  positions.map((item, index)=>{
                    return(
                        <option key={index} value={item.key}>
                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                    )
                  })
                  } 
                  </select>
      
    </div>
    <div className="form-group col-md-3 mb-3">
      <label htmlFor="validationServer01"> <FormattedMessage id="create-user.gender"/></label>
     
      <select id="inputState" className="form-control" 
      onChange={(event) =>{this.onChangeInput(event,'gender')}}>
                  {genders && genders.lenght > 0 ||  genders.map((item, index)=>{
                    return(
                        <option key={index} value={item.key}>
                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                    )
                  })
                  } 
                
                </select>
    
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer04"> <FormattedMessage id="create-user.phonenumber"/></label>
      <input type="text" className="form-control " id="validationServer04" placeholder="..." required
      value={phoneNumber}
      onChange={(event) =>{this.onChangeInput(event,'phoneNumber')}}/>
      
    </div>
   
   
  </div>
  <div className="row">
  <div className="col-md-9 mb-3">
      <label htmlFor="validationServer03"> <FormattedMessage id="create-user.address"/></label>
      <input type="text" className="form-control " id="validationServer03" placeholder="..." required
      value={address}
      onChange={(event) =>{this.onChangeInput(event,'address')}}/>
     
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer02"> <FormattedMessage id="create-user.image"/></label>
      <div className="preview-img-container">
      <input id="previewImg" type="file" hidden
      onChange={(event)=> this.handleOnChangeImage(event)}/>
      <label className="label-upload" htmlFor="previewImg">Upload<i className="fa-solid fa-upload"></i></label>
      <div className="preview-image" style={{backgroundImage: `url(${this.state.previewImgURL})`}}
      onClick={() => this.openPreviewImage()}
      >
        
      </div>
      </div>
      
   
    </div>
    
  </div>
   
  
  <div className="form-group">
    <div className="form-check">
      <input className="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" required/>
      <label className="form-check-label" htmlFor="invalidCheck3">
      <FormattedMessage id="create-user.agree"/>
      </label>
      <div className="invalid-feedback">
      <FormattedMessage id="create-user.confirm"/>
      </div>
    </div>
  </div>
  <button className="btn btn-primary" type="submit"
  onClick={()=>this.handleSaveUser()}>  <FormattedMessage id="create-user.submit"/></button>

                    </div>
                </div>
                {this.state.isOpen ===true &&
                <Lightbox
                mainSrc={this.state.previewImgURL}
                onCloseRequest={()=>this.setState({isOpen:false})}/>}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleIdStart: () => dispatch(actions.fetchRoleIdStart()),
createNewUser: (data)=> dispatch(actions.createNewUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

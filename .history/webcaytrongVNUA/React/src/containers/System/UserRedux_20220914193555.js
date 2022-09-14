import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeService} from '../../services/userService';
import { LANGUAGES } from '../../utils';
import * as actions from '../../store/actions';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state ={
            genderArr: [],
            positionArr: [],
            roleIdArr: [],
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
        //  && prevProps.positionRedux !== this.props.positionRedux
          // && prevProps.roleIdRedux !== this.props.roleIdRedux
          ){
        this.setState({
            genderArr: this.props.genderRedux,
            // positionArr: this.props.positionRedux,
            // roleIdRedux: this.props.roleIdRedux
        })
    }
    if(prevProps.positionRedux !== this.props.positionRedux){
      this.setState({
        
      })
    }
}

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roleIds = this.state.roleIdArr;
      
       let language = this.props.language;
        return (
            
            <div className="user-redux-container" >
                <div className="title">
                   <FormattedMessage id="create-user.title"/>
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-3 mb-3">
      <label htmlFor="validationServerUsername"> <FormattedMessage id="create-user.email"/></label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroupPrepend3">@</span>
        </div>
        <input type="text" className="form-control" id="validationServerUsername" placeholder="..." aria-describedby="inputGroupPrepend3" required/>
       
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServerUsername"> <FormattedMessage id="create-user.password"/></label>
      <div className="input-group">
        
        <input type="password" className="form-control " id="validationServerUsername" placeholder="..." aria-describedby="inputGroupPrepend3" required/>
        
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer01"> <FormattedMessage id="create-user.firstname"/></label>
      <input type="text" className="form-control " id="validationServer01" placeholder="..."  required/>
    
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer02"> <FormattedMessage id="create-user.lastname"/></label>
      <input type="text" className="form-control " id="validationServer02" placeholder="..."  required/>
      
    </div>
   
  </div>
  <div className="row">
                        <div className="col-md-3 mb-3">
      <label htmlFor="validationServerUsername"> <FormattedMessage id="create-user.roleid"/></label>
      <select  className="form-control" name="roleId">
      {roleIds && roleIds.lenght > 0 ||  roleIds.map((item, index)=>{
                    return(
                        <option key={index}>
                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                    )
                  })
                  } 
                  </select>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServerUsername"> <FormattedMessage id="create-user.position"/></label>
    
      <select  className="form-control" name="position">
      {positions && positions.lenght > 0 ||  positions.map((item, index)=>{
                    return(
                        <option key={index}>
                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                    )
                  })
                  } 
                  </select>
      
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer01"> <FormattedMessage id="create-user.gender"/></label>
     
      <select className="form-control" name="gender">
                  {genders && genders.lenght > 0 ||  genders.map((item, index)=>{
                    return(
                        <option key={index}>
                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                    )
                  })
                  } 
                
                </select>
    
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer02"> <FormattedMessage id="create-user.image"/></label>
      <input type="text" className="form-control " id="validationServer02" placeholder="..."  required/>
   
    </div>
   
  </div>
  <div className="row">
  <div className="col-md-9 mb-3">
      <label htmlFor="validationServer03"> <FormattedMessage id="create-user.address"/></label>
      <input type="text" className="form-control " id="validationServer03" placeholder="..." required/>
     
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer04"> <FormattedMessage id="create-user.phonenumber"/></label>
      <input type="text" className="form-control " id="validationServer04" placeholder="..." required/>
      
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
  <button className="btn btn-primary" type="submit">  <FormattedMessage id="create-user.submit"/></button>

                    </div>
                </div>
                </div>
           
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleIdRedux: state.admin.roleIds
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleIdStart: () => dispatch(actions.fetchRoleIdStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeService} from '../../services/userService';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state ={
            genderArr: []
        };
    }

    async componentDidMount() {
try{
    let res = await getAllCodeService('gender');
    if(res && res.errCode===0){
        this.setState({genderArr: res.data});
        console.log("check res: ",res)
    }
}catch(e){
console.log(e);
}
    }


    render() {
        let genders = this.state.genderArr;
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
        <input type="text" className="form-control is-invalid" id="validationServerUsername" placeholder="..." aria-describedby="inputGroupPrepend3" required/>
        <div className="invalid-feedback">
        <FormattedMessage id="create-user.invalid-feedback"/>
        </div>
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServerUsername"> <FormattedMessage id="create-user.password"/></label>
      <div className="input-group">
        
        <input type="password" className="form-control is-invalid" id="validationServerUsername" placeholder="..." aria-describedby="inputGroupPrepend3" required/>
        <div className="invalid-feedback">
        <FormattedMessage id="create-user.invalid-feedback"/>
        </div>
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer01"> <FormattedMessage id="create-user.firstname"/></label>
      <input type="text" className="form-control is-invalid" id="validationServer01" placeholder="..."  required/>
      <div className="invalid-feedback">
      <FormattedMessage id="create-user.invalid-feedback"/>
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer02"> <FormattedMessage id="create-user.lastname"/></label>
      <input type="text" className="form-control is-invalid" id="validationServer02" placeholder="..."  required/>
      <div className="invalid-feedback">
      <FormattedMessage id="create-user.invalid-feedback"/>
      </div>
    </div>
   
  </div>
  <div className="row">
                        <div className="col-md-3 mb-3">
      <label htmlFor="validationServerUsername"> <FormattedMessage id="create-user.roleid"/></label>
      <div className="input-group">
        
        <input type="text" className="form-control is-invalid" id="validationServerUsername" placeholder="..." aria-describedby="inputGroupPrepend3" required/>
        <div className="invalid-feedback">
        <FormattedMessage id="create-user.invalid-feedback"/>
        </div>
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServerUsername"> <FormattedMessage id="create-user.position"/></label>
    
      <select id="inputState" class="form-control" name="roleId">
                    <option value="1">Admin</option>
                    <option value="0">Doctor</option>
                    <option value="2">Patient</option>
                  </select>
      
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer01"> <FormattedMessage id="create-user.gender"/></label>
     
      <select  class="form-control" name="gender">
                  {genders && genders.lenght>0 &&
                  genders.map((item, index)=>{
                    return(
                        <option key={index}>{item.valueVi}</option>
                    )
                  })
                  }
                </select>
    
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer02"> <FormattedMessage id="create-user.image"/></label>
      <input type="text" className="form-control is-invalid" id="validationServer02" placeholder="..."  required/>
      <div className="invalid-feedback">
      <FormattedMessage id="create-user.invalid-feedback"/>
      </div>
    </div>
   
  </div>
  <div className="row">
  <div className="col-md-9 mb-3">
      <label htmlFor="validationServer03"> <FormattedMessage id="create-user.address"/></label>
      <input type="text" className="form-control is-invalid" id="validationServer03" placeholder="..." required/>
      <div className="invalid-feedback">
      <FormattedMessage id="create-user.invalid-feedback"/>
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer04"> <FormattedMessage id="create-user.phonenumber"/></label>
      <input type="text" className="form-control is-invalid" id="validationServer04" placeholder="..." required/>
      <div className="invalid-feedback">
      <FormattedMessage id="create-user.invalid-feedback"/>
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
  <button className="btn btn-primary" type="submit">  <FormattedMessage id="create-user.submit"/></button>

                    </div>
                </div>
                </div>
           
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

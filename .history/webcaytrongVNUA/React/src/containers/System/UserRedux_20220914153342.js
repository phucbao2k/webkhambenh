import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state ={};
    }

    componentDidMount() {
    }


    render() {
        return (
            
            <div className="user-redux-container" >
                <div className="title">
                   <FormattedMessage id="cre"/>
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-3 mb-3">
      <label htmlFor="validationServerUsername">Username</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroupPrepend3">@</span>
        </div>
        <input type="text" className="form-control is-invalid" id="validationServerUsername" placeholder="..." aria-describedby="inputGroupPrepend3" required/>
        <div className="invalid-feedback">
          Please choose a username.
        </div>
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServerUsername">Password</label>
      <div className="input-group">
        
        <input type="password" className="form-control is-invalid" id="validationServerUsername" placeholder="..." aria-describedby="inputGroupPrepend3" required/>
        <div className="invalid-feedback">
          Please choose a username.
        </div>
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer01">First name</label>
      <input type="text" className="form-control is-invalid" id="validationServer01" placeholder="..."  required/>
      <div className="invalid-feedback">
       Please enter a valid value
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer02">Last name</label>
      <input type="text" className="form-control is-invalid" id="validationServer02" placeholder="..."  required/>
      <div className="invalid-feedback">
       Please enter a valid value
      </div>
    </div>
   
  </div>
  <div className="row">
                        <div className="col-md-3 mb-3">
      <label htmlFor="validationServerUsername">RoleID</label>
      <div className="input-group">
        
        <input type="text" className="form-control is-invalid" id="validationServerUsername" placeholder="..." aria-describedby="inputGroupPrepend3" required/>
        <div className="invalid-feedback">
          Please choose a username.
        </div>
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServerUsername">Position</label>
      {/* <div className="input-group">
        
        <input type="text" className="form-control is-invalid" id="validationServerUsername" placeholder="..." aria-describedby="inputGroupPrepend3" required/>
        <div className="invalid-feedback">
          Please choose a username.
        </div>
      </div> */}
      <select id="inputState" class="form-control" name="roleId">
                    <option value="1">Admin</option>
                    <option value="0">Doctor</option>
                    <option value="2">Patient</option>
                  </select>
      
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer01">Gender</label>
      {/* <input type="text" className="form-control is-invalid" id="validationServer01" placeholder="..."  required/>
      <div className="invalid-feedback">
       Please enter a valid value
      </div> */}
      <select id="inputState" class="form-control" name="gender">
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                  <option value="2">Other...</option>
                </select>
    
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer02">Image</label>
      <input type="text" className="form-control is-invalid" id="validationServer02" placeholder="..."  required/>
      <div className="invalid-feedback">
       Please enter a valid value
      </div>
    </div>
   
  </div>
  <div className="row">
  <div className="col-md-9 mb-3">
      <label htmlFor="validationServer03">Address</label>
      <input type="text" className="form-control is-invalid" id="validationServer03" placeholder="..." required/>
      <div className="invalid-feedback">
        Please provide a valid city.
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer04">Phone Number</label>
      <input type="text" className="form-control is-invalid" id="validationServer04" placeholder="..." required/>
      <div className="invalid-feedback">
        Please provide a valid state.
      </div>
    </div>
    
  </div>
   
  
  <div className="form-group">
    <div className="form-check">
      <input className="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" required/>
      <label className="form-check-label" htmlFor="invalidCheck3">
        Agree to terms and conditions
      </label>
      <div className="invalid-feedback">
        You must agree before submitting.
      </div>
    </div>
  </div>
  <button className="btn btn-primary" type="submit">Submit form</button>

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

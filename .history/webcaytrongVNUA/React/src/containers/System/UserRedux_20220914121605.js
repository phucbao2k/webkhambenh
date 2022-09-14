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
                    UserRedux
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
 
    <div className="col-md-4 mb-3">
      <label htmlFor="validationServer01">First name</label>
      <input type="text" className="form-control is-invalid" id="validationServer01" placeholder="First name"  required/>
      <div className="invalid-feedback">
       Please enter a valid value
      </div>
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor="validationServer02">Last name</label>
      <input type="text" className="form-control is-invalid" id="validationServer02" placeholder="Last name"  required/>
      <div className="invalid-feedback">
       Please enter a valid value
      </div>
    </div>
   
  </div>
  <div className="row">
  <div className="col-md-6 mb-3">
      <label htmlFor="validationServer03">City</label>
      <input type="text" className="form-control is-invalid" id="validationServer03" placeholder="City" required/>
      <div className="invalid-feedback">
        Please provide a valid city.
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer04">State</label>
      <input type="text" className="form-control is-invalid" id="validationServer04" placeholder="State" required/>
      <div className="invalid-feedback">
        Please provide a valid state.
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label htmlFor="validationServer05">Zip</label>
      <input type="text" className="form-control is-invalid" id="validationServer05" placeholder="Zip" required/>
      <div className="invalid-feedback">
        Please provide a valid zip.
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

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';


//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn

class DefaultClass extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }

    }
  

   async componentDidMount() {
       
    }

   
   
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg">
                <ModalHeader toggle={() => { this.toggle() }}>EDIT USER:</ModalHeader>
                <ModalBody>

                    <div className="modal-user-body">
                        <div className="input-container ">
                            <label>Email</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                                disabled>
                            </input>
                        </div>
                        <div className="input-container ">
                            <label>Password</label>
                            <input type="password"
                                onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                value={this.state.password}
                                disabled
                            ></input>
                        </div>
                        <div className="input-container ">
                            <label>First Name</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                value={this.state.firstName}></input>
                        </div>
                        <div className="input-container ">
                            <label>Last Name</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                value={this.state.lastName}></input>
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                value={this.state.address}></input>
                        </div>
                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => { this.handleSaveUser() }}>Save Changes</Button>
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: 
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);





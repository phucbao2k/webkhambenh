import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Register.scss';
import { toast } from "react-toastify";
import { emitter } from '../../utils/emitter';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ' ',
            address: '',
            phoneNumber: '',
           
        };
        this.listenToEmitter();
    
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: ' ',
                address: '',
                phoneNumber: '',
              
            })
        })
    }

    componentDidMount() {
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnChangeInput = (event, id) => {
        let input = { ...this.state };
        input[id] = event.target.value;
        this.setState({
            ...input
        });
    }
    handleSubmit() {


        //VALIDATE
        var errors = [];
        if (this.state.firstName === "") {
            toast.error("Invalid first name input");
            errors.push("firstName");
        }
        if (this.state.lastName === "") {
            toast.error("Invalid lastName input");
            errors.push("lastName");
        }

        if (this.state.phoneNumber === "" || this.state.phoneNumber.length > 11) {
            toast.error("Invalid phone number input");
            errors.push("phoneNumber");
        }
        if (this.state.address === "") {
            toast.error("Invalid address input");
            errors.push("address");
        }
        if (this.state.password === "") {
            toast.error("Invalid password input");
            errors.push("password");
        }
       

        //email
        const expression = /\S+@\S+\.\S+/;
        var validEmail = expression.test(String(this.state.email).toLowerCase());

        if (!validEmail) {
            toast.error("Invalid email");
            errors.push("email");
        }

        this.setState({
            errors: errors
        });

        for (let i = 0; i < errors.length; i++) {
            if (i > 0) {
                toast.error("Error! Please enter valid ")
                break;
            }
        }
        return errors.length;
    }
  
    handleAddNewUser = () => {
        let errors = [];

        errors.length = this.handleSubmit();
        if (errors.length > 0) return;
        else {
            //gọi api để tạo modal
            this.props.createNewUser(this.state, 'DONE!');
            toast.success("Create new user success!")
        }
        
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"
                style={{ maxWidth: '100vw', width: '100%' }}>
                <ModalHeader toggle={() => { this.toggle() }}>REGISTER:</ModalHeader>
                <ModalBody>

                    <div className="modal-user-body">
                        <div className="input-container ">
                            <label>Email</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}></input>
                        </div>
                        <div className="input-container ">
                            <label><FormattedMessage id="create-user.password"/></label>
                            <input type="password"
                                onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                value={this.state.password}
                            ></input>
                        </div>
                        <div className="input-container ">
                            <label><FormattedMessage id="create-user.phonenumber" /></label>
                            <input type="number" maxLength="11"
                                onChange={(event) => { this.handleOnChangeInput(event, "phoneNumber") }}
                                value={this.state.phoneNumber}></input>
                        </div>
                        <div className="input-container ">
                            <label><FormattedMessage id="create-user.firstname" /></label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                value={this.state.firstName}></input>
                        </div>
                        <div className="input-container ">
                            <label><FormattedMessage id="create-user.lastname" /></label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                value={this.state.lastName}></input>
                        </div>
                        <div className="input-container ">
                            <label><FormattedMessage id="create-user.address" /></label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                value={this.state.address}></input>
                        </div>
                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => { this.handleAddNewUser() }}><FormattedMessage id="create-user.title" /></Button>
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Cancel</Button>
                </ModalFooter>
            </Modal>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);





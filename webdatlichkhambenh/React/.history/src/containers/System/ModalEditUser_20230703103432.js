import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: ' ',
            address: '',
            errors: [],
        }

    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                id: '',
                email: '',
                password: '',
                firstName: '',
                lastName: ' ',
                address: ''
            })
        })
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            {
                this.setState({
                    id: user.id,
                    email: user.email,
                    password: 'hardcode',
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address
                })
            }
        }
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
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
            toast.error("Invalid last name input");
            errors.push("lastName");
        }
    
     
        if (this.state.address === "") {
            toast.error("Invalid address input");
            errors.push("address");
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
    handleSaveUser = () => {
        let errors = [];

        errors.length = this.handleSubmit();
        if (errors.length > 0) return;
        this.props.editUser(this.state);


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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);





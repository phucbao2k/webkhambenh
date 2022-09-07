import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import{Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
email: '',
password: '',
firstName: '',
lastName: ' ',
address:''
        }
    }

    componentDidMount() {
    }
toggle =()=>{
    this.props.toggleFromParent();
}
handleOnChangeInput =(event, id)=>{
    let copyState ={...this.state};
    copyState[id]= event.target.value;
    this.setState({
        ...copyState
    });
}
checkValidateInput = () =>{
    let isValid = true;
    let arrInput = ['email','password','firstName','lastName','address'];
    for(let i=0; i< arrInput.length; i++){
       if(!this.state[arrInput[i]]){
        isValid = false;
        alert('Missing parameter: ' + arrInput[i]);
        break;
       } 
    }
    return isValid;
}
handleAddNewUser =() =>{
let isValid = this.checkValidateInput();
if(isValid){
}
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() =>{this.toggle()}} className={'modal-user-container'}
            size ="lg">
            <ModalHeader toggle={() =>{this.toggle()}}>ADD NEW USER:</ModalHeader>
            <ModalBody>
              
                <div className="modal-user-body">
                <div className="input-container ">
                        <label>Email</label>
                        <input type="text"></input>
                    </div>
                    <div className="input-container ">
                        <label>Password</label>
                        <input type="password"></input>
                    </div>
                    <div className="input-container ">
                        <label>First Name</label>
                        <input type="text"></input>
                    </div>
                    <div className="input-container ">
                        <label>Last Name</label>
                        <input type="text"></input>
                    </div>
                    <div className="input-container max-width-input">
                        <label>Address</label>
                        <input type="text"></input>
                    </div>
                </div>
                   
               
            </ModalBody>
        <ModalFooter>
            <Button color="primary" className="px-3" onClick={() =>{this.toggle()}}>Add new user</Button>
            <Button color="secondary" className="px-3" onClick={() =>{this.toggle()}}>Cancel</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);





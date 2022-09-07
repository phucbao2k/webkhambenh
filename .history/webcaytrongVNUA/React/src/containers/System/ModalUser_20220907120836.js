import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import{Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }
toggle =()=>{
    this.props.to
}
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() =>{this.toggle()}} className={'Toggle'}>
            <ModalHeader toggle={() =>{this.toggle()}}>ADD NEW USER:</ModalHeader>
            <ModalBody>
                Enter new user's information:
            </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={() =>{this.toggle()}}>Add new user</Button>
            <Button color="secondary" onClick={() =>{this.toggle()}}>Cancel</Button>
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





import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this
    }

    componentDidMount() {
    }


    render() {
        return (
            <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>ADD NEW USER:</ModalHeader>
            <ModalBody>
                Enter new user's information:
            </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={toggle}>Add new user</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
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





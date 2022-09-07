import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class ProductManage extends Component {

    state = {

    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="text-center" >Manage products</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);




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
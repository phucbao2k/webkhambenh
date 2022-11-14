import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Modal } from 'reactstrap';

//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn

class WarningModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            setShow: false
        }

    }
    handleClose = () => {
        this.setState({
            setShow: false
        })
    }
    handleShow = () => {
        this.setState({
            setShow: true
        })
    }

    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {
        return (
            <>
                <Modal show={false} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chú ý</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.handleClose()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WarningModal);





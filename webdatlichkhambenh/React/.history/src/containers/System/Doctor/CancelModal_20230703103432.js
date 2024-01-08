import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './CancelModal.scss';
import { Modal, Button, ModalBody, ModalFooter } from 'reactstrap';


//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn

class CancelModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
          
        }

    }


    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
 
    handleCancelRemedy = () => {
        this.props.cancelRemedy(this.state)
    }


    render() {
        let { isOpenCancel, closeCancelModal, dataModal, cancelRemedy } = this.props
        return (
            <Modal
                isOpen={isOpenCancel}
                className={'booking-modal-container'}
                size="lg"
                style={{ maxWidth: '100vw', width: '100%' }}>
                <div className="modal-header">
                    <h5 className="modal-title"><FormattedMessage id="patient.booking-modal.cancel-booking" /></h5>
                    <button type="button" className="close" aria-label="Close" onClick={closeCancelModal}>
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-8 form-group">
                            <label><FormattedMessage id="patient.booking-modal.email" /></label>
                            <input className="form-control" type="email" value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                                disabled
                            />
                        </div>
                        

                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleCancelRemedy()}><FormattedMessage id="patient.booking-modal.send" /></Button>
                    <Button color="secondary" onClick={closeCancelModal}>Cancel</Button>
                </ModalFooter>


            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(CancelModal);





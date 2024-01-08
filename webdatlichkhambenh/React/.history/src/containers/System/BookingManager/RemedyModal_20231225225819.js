import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, Button, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router';
import { CommonUtils, LANGUAGES } from "../../../utils";
import './stylepdf.scss';

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            phoneNumber: '',
            patientName: '',
            address: '',
            timeType: '',
            reasons: '',
            imgBase64: '',
            doctorName: '',
            price: '',
        }
    }

    componentDidMount() {
        this.updateStateFromProps(this.props);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dataModal !== this.props.dataModal || prevProps.dataPatient !== this.props.dataPatient) {
            this.updateStateFromProps(this.props);
        }
    }

    updateStateFromProps(props) {
        const { dataModal, dataPatient } = props;
        if (dataModal) {
            this.setState({
                email: dataModal.email,
                phoneNumber: dataModal.phoneNumber,
                patientName: dataModal.patientName,
                address: dataModal.address,
                reasons: dataModal.reasons,
                price: dataModal.price,
                doctorName: dataModal.doctorName
            });
        }

        if (dataPatient && dataPatient.length > 0) {
            const time = props.language === LANGUAGES.VI
                ? dataPatient[0].timeTypeDataPatient.valueVi
                : dataPatient[0].timeTypeDataPatient.valueEn;

            this.setState({
                timeType: time
            });
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handleOnChangePhoneNumber = (event) => {
        this.setState({
            phoneNumber: event.target.value
        });
    }

    handleOnChangeFirstName = (event) => {
        this.setState({
            patientName: event.target.value
        });
    }

    handleOnChangeAddress = (event) => {
        this.setState({
            address: event.target.value
        });
    }

    handleOnChangeTime = (event) => {
        this.setState({
            timeType: event.target.value
        });
    }

    handleOnChangeReason = (event) => {
        this.setState({
            reasons: event.target.value
        });
    }

    handleOnChangePrice = (event) => {
        this.setState({
            price: event.target.value
        });
    }

    handleOnChangeDoctorName = (event) => {
        this.setState({
            doctorName: event.target.value
        });
    }

    handleSendSchedule = () => {
        this.props.sendSchedule(this.state);
    }

    render() {
        const { isOpenModal, closeRemedyModal, language } = this.props;
        const { email, phoneNumber, patientName, address, timeType, reasons, price, doctorName } = this.state;

        return (
            <Modal isOpen={isOpenModal} size="lg" style={{ maxWidth: '100vw', width: '100%' }}>
                <div className="modal-header">
                    <h5 className="modal-title"><FormattedMessage id="patient.booking-modal.info-booking" /></h5>
                </div>
                <ModalBody>
                    {/* Các input fields */}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSendSchedule}>OK</Button>
                    <Button color="secondary" onClick={closeRemedyModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RemedyModal));

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import './RemedyModal.scss';
import { Modal, Button, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router';
import { CommonUtils } from "../../../utils";
import './stylepdf.scss';
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            view: 'pdf',
            phoneNumber: '',
            patientName: '',
            address: '',
            plantName: '',
            timeType: '',
            reasons: '',
            imgBase64: ''
        }

    }


    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                phoneNumber: this.props.dataModal.phoneNumber,
                patientName: this.props.dataModal.patientName,
                address: this.props.dataModal.address,
                plantName: this.props.dataModal.plantName,
                timeType: this.props.dataModal.timeType,
                reasons: this.props.dataModal.reasons
            })
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                phoneNumber: this.props.dataModal.phoneNumber,
                patientName: this.props.dataModal.patientName,
                address: this.props.dataModal.address,
                plantName: this.props.dataModal.plantName,
                timeType: this.props.dataModal.timeType,
                reasons: this.props.dataModal.reasons
            })
        }

    }
    switchView = () => {
        this.setState({ view: this.state.view === 'pdf' ? 'print' : 'pdf' });
    }


    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnChangePhoneNumber = (event) => {
        this.setState({
            phoneNumber: event.target.value
        })
    }
    handleOnChangeFirstName = (event) => {
        this.setState({
            patientName: event.target.value
        })
    }
    handleOnChangeAddress = (event) => {
        this.setState({
            address: event.target.value
        })
    }
    handleOnChangeTime = (event) => {
        this.setState({
            timeType: event.target.value
        })
    }
    handleOnChangePlantName = (event) => {
        this.setState({
            plantName: event.target.value
        })
    }
    handleOnChangeReason = (event) => {
        this.setState({
            reasons: event.target.value
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
      
    }
    handleSendSchedule = () => {
        this.props.sendSchedule(this.state)
    }

 
    render() {
        let { isOpenModal, closeRemedyModal, dataModal, sendRemedy} = this.props
        console.log(this.state.email)
        return (
           <Modal
           isOpen={isOpenModal}
                size="lg" style={{ maxWidth: '100vw', width: '100%' }}
              
           >
                <div className="modal-header">
                    <h5 className="modal-title"><FormattedMessage id="patient.booking-modal.info-booking" /></h5>
                    {/* <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
                        <span aria-hidden="true">x</span>
                    </button> */}
                </div>
            <ModalBody
            >
                    <div className={'modal-custom' + this.state.view }>
                       
                        <div id="buttons">

                            <button
                                onClick={this.switchView}
                                className={
                                    'switch-view ' + (this.state.view === 'pdf' ? 'pdf' : 'print')
                                }
                            >
                                Switch View
                            </button>
                            <button onClick={window.print} className="print-page">
                                Print
                            </button>
                        </div>
                       
                    </div>
                   
                            <label><FormattedMessage id="patient.booking-modal.email" /></label>
                            <input className="form-control" type="email" value={this.state.email}
                            onChange={(event) => this.handleOnChangeEmail(event)}
                                disabled
                            />
                            <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                            <input className="form-control" type="text" value={this.state.phoneNumber}
                                onChange={(event) => this.handleOnChangePhoneNumber(event)}
                                disabled
                            />
                            <label><FormattedMessage id="patient.booking-modal.address" /></label>
                            <input className="form-control" type="text" value={this.state.address}
                                onChange={(event) => this.handleOnChangeAddress(event)}
                                disabled
                            />
                            <label><FormattedMessage id="patient.booking-modal.fullName" /></label>
                            <input className="form-control" type="text" value={this.state.patientName}
                                onChange={(event) => this.handleOnChangeFirstName(event)}
                                disabled
                            />
                            <label><FormattedMessage id="patient.booking-modal.plantName" /></label>
                            <input className="form-control" type="text" value={this.state.plantName}
                                onChange={(event) => this.handleOnChangePlantName(event)}
                                disabled
                            />
                            <label><FormattedMessage id="patient.booking-modal.time" /></label>
                            <input className="form-control" type="text" value={this.state.timeType}
                                onChange={(event) => this.handleOnChangeTime(event)}
                                disabled
                            />
                            <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                            <input className="form-control" type="text" value={this.state.reasons}
                                onChange={(event) => this.handleOnChangeReason(event)}
                                disabled
                            />
                            <div class="left">BỆNH NHÂN KÍ</div>
                    <div class="right">XÁC NHẬN CỦA BỆNH VIỆN</div>
                      
                    
            </ModalBody>
            <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendSchedule()}>OK</Button>
                   
                <Button color="secondary" onClick={closeRemedyModal}>Cancel</Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RemedyModal));





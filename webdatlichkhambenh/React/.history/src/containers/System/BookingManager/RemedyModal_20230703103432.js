import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import './RemedyModal.scss';
import { Modal, Button, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router';
import { CommonUtils, LANGUAGES } from "../../../utils";
import './stylepdf.scss';
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn
import { getAllBookingForAdminBooking} from '../../../services/userService';
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
            imgBase64: '',
            doctorName: '',
            price: '', 
            dataPatient: []
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
              
                reasons: this.props.dataModal.reasons,
                price: this.props.dataModal.price,
                doctorName: this.props.dataModal.doctorName
            })
        }
        if (this.props.dataPatient) {
            this.setState({
               timeType: this.props.dataPatient.timeType
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
                // timeType: this.props.dataModal.timeType,
                reasons: this.props.dataModal.reasons,
                price: this.props.dataModal.price,
                doctorName: this.props.dataModal.doctorName
            })
        }
        if (prevProps.dataPatient !== this.props.dataPatient) {
            this.setState({
              
                timeType: this.props.dataPatient.timeType,
              
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
    handleOnChangePrice = (event) => {
        this.setState({
            price: event.target.value
        })
    }
    handleOnChangeDoctorName = (event) => {
        this.setState({
           doctorName: event.target.value
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
        let { isOpenModal, closeRemedyModal, dataModal, sendRemedy, language, dataPatient} = this.props;
        // let time = language === LANGUAGES.VI ?
        //    this.props.dataModal.timeType.valueVi :this.props.dataModal.timeType.valueEn;
        
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
                    {dataPatient && dataPatient.length > 0 ?
                        dataPatient.map((item, index) => {
                            let time = language === LANGUAGES.VI ?
                                item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                            return (
                                
                                    
                                <input className="form-control" type="text" value={time}
                                    onChange={(event) => this.handleOnChangePlantName(event)}
                                    disabled
                                />
                                 
                              
                            )
                        })
                        : <div>no data</div>}
                            {/* <input className="form-control" type="text" value={this.state.timeType} 
                                onChange={(event) => this.handleOnChangeTime(event)}
                                disabled
                            /> */}
                            <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                            <input className="form-control" type="text" value={this.state.reasons}
                                onChange={(event) => this.handleOnChangeReason(event)}
                                disabled
                            />
                    <label>PRICE:</label>
                    <input className="form-control" type="text" value={this.state.price}
                        onChange={(event) => this.handleOnChangePrice(event)}
                        disabled
                    />
                    <label>Doctor's Name:</label>
                    <input className="form-control" type="text" value={this.state.doctorName}
                        onChange={(event) => this.handleOnChangeDoctorName(event)}
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





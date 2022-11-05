import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './RemedyModal.scss';
import { Modal, Button, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from "react-toastify";
import moment from 'moment';
import { CommonUtils } from "../../../utils";
import ProfileDoctor from '../../Patient/Doctor/ProfileDoctor';
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            plantName: '',
            specialtyName: '',
            // selectedGender: '',
            doctorId: '',
            // genders: '',
            timeType: '',
            previewImgURL: '',
            isOpen: false,

            birthday: '',
            imgBase64: ''
        }

    }


    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                fullName: this.props.dataModal.fullName
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
            email: event.target.value,
            fullName
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
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }


    render() {
        let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props
        console.log('check dataModal', dataModal)
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size="md"
                centered>
                <div className="modal-header">
                    <h5 className="modal-title">Thông tin đặt lịch khám bệnh</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-8 form-group">
                            <label>Email bệnh nhân</label>
                            <input className="form-control" type="email" value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                            />
                        </div>
                        

                    </div>
                </ModalBody>
                <ModalFooter>
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);





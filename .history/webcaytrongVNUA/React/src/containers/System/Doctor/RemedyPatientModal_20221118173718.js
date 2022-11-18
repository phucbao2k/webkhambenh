import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './RemedyModal.scss';
import { Modal, Button, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from "react-toastify";
import moment from 'moment';
import { CommonUtils } from "../../../utils";
class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
            statusId: ''
        }

    }


    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                statusId: this.props.dataModal.statusId
            })
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                statusId: this.props.dataModal.statusId
            })
        }

    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
            fullName: event.target.value
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

    handleOnChangeStatus = (event) => {
        this.setState({
            statusId: event.target.value
        })
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
                                disabled
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Trạng thái</label>
                            <input className="form-control" type="text" value={this.state.statusId}
                                onChange={(event) => this.handleOnChangeStatus(event)}
                                disabled
                            />
                        </div>


                    </div>
                </ModalBody>
                <ModalFooter>
<div>S1: Đang chờ, S2: Đã xác nhận, S3: Đã hoàn thành, S4: Đã hủy bởi hệ thống</div>
                    <Button color="secondary" onClick={closeRemedyModal}>Đóng</Button>
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





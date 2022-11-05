import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './RemedyModal.scss';
import { Modal, Button, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from "react-toastify";
import moment from 'moment';
import { CommonUtils } from "../../../utils";

//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
            avatar: '',
            isOpen: false,
            previewImgURL: ''
            
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
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            })
        }


    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }


    render() {
        let { isOpenModal, closeRemedyModal, dataModal, sendRemedy} = this.props
        return (
           <Modal
           isOpen={isOpenModal}
           className={'booking-modal-container'}
           size="md"
           centered>
            <div className="modal-header">
                <h5 className="modal-title">Gửi hóa đơn khám bệnh thành công</h5>
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
                        <div className="col-8 form-group">
                            <label>Chọn file đơn thuốc</label>
                            <input className="form-control-file" type="file" 
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />
                        </div>

                    </div>
                    <div className="row">
                        <div></div>
                        <div className="preview-image" style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                            onClick={() => this.openPreviewImage()}
                        >

                        </div>
                    </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => this.handleSendRemedy()}>Send</Button>
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





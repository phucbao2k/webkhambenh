import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import { LANGUAGES, CommonUtils } from '../../../../utils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import moment from 'moment';
import { toast } from "react-toastify";
import { postPatientBookAppointment } from "../../../../services/userService";
import Select from 'react-select';
import * as actions from '../../../../store/actions';
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            specialtyName: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
            previewImgURL: '',
            image: '',
            isOpen: false,
            birthday: '',
            reasons: '',
            priceId: '',
            errors: []
        }


    }
    //doctorId, timeType được lấy từ dataTime trong profile doctor


    async componentDidMount() {
        this.props.getGenders();
    }

  

    async componentDidUpdate(prevProps, prevState, snapshot) {
       

        //dataTime được lấy từ api getprofiledoctorbyid trong class Profiledoctor
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                let priceId = this.props.dataTime.priceId;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                    priceId: priceId
                })
            }

        }


    }
    // VỚI event.target.value, nó truy xuất giá trị của tất cả những đầu vào được gọi,
    // bất kỳ thứ gì chèn vào đầu vào đều có thể được truy cập thông qua event.target.value
  


    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name;
        }
        return '';
    }
    buildDataInputSelect = (inputData, type) => {
        console.log("check input data", inputData)
        //inputData đã được lấy từ componentDidMount(), cụ thể là this.props; 
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {

            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelEn = `${item.valueEn} USD`;
                    let labelVi = `${item.valueVi}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }


        }
        return result;
    }


   
    
   
    render() {
        let { language } = this.props;
        let { isOpenModal, closeBookingClose, dataTime } = this.props;

        let priceId = '';
        console.log('data Price', dataTime);
        let doctorId = '';

        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
            priceId = dataTime.priceId;
        }


        return (
            <>

                <Modal
                    isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size="lg"
                    style={{ maxWidth: '100vw', width: '100%' }}>
                    <div className="booking-modal-content" >
                        <div className="booking-modal-header">
                            <span className="left"><FormattedMessage id="patient.booking-modal.title" /></span>
                            <span className="right"
                                onClick={closeBookingClose}>
                                <i className="fa-solid fa-xmark"></i>
                            </span>
                        </div>
                        <div className="booking-modal-body">
                            <div className="doctor-infor">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>

                            <div className="row">
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.fullName" /></label>
                                    <input className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')} />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                    <input type="number" maxLength="11" className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                    <input className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')} />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                    <input className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                                </div>
                                <div className="col-12 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                    <input className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, 'reasons')} />
                                </div>
                                <div className="col-12 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.avatar" /></label>
                                    <div className="preview-img-container">
                                        <input className="form-control" id="previewImg" type="file" hidden
                                            onChange={(event) => this.handleOnChangeImage(event)}
                                        />
                                        <label className="label-upload" htmlFor="previewImg"><FormattedMessage id="patient.booking-modal.upload" /><i className="fa-solid fa-upload"></i></label>

                                        <div className="preview-image" style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            onClick={() => this.openPreviewImage()}
                                        >

                                        </div>
                                    </div>
                                </div>

                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders} />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.plantName" /></label>
                                    <input className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, 'plantName')} />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.specialtyName" /></label>
                                    <input className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, 'specialtyName')} />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control"
                                        value={this.state.birthday}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">

                            <div className="note"> <FormattedMessage id="patient.booking-modal.note" /></div>
                            <button className="btn-booking-confirm"
                                onClick={() => this.handleConfirmBooking()}>
                                <FormattedMessage id="patient.booking-modal.booking" />
                            </button>
                            <button className="btn-booking-cancel"
                                onClick={closeBookingClose}>
                                <FormattedMessage id="patient.booking-modal.btnCancel" />
                            </button>
                        </div>
                    </div>








                </Modal>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })} />}
            </>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);





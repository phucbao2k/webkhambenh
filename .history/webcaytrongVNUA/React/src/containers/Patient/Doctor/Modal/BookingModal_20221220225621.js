import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';

import { LANGUAGES, CommonUtils } from '../../../../utils';
import * as actions from "../../../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import moment from 'moment';
import { toast } from "react-toastify";

import { postPatientBookAppointment, getProfileDoctorById } from "../../../../services/userService";
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn
class BookingModal extends Component {
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
            image: '',
            isOpen: false,
            dataProfile: {},
            birthday: '',
            reasons: '',
            birthdays: '',
            doctorName: '',
            priceId: ''
        }


    }
    //doctorId, timeType được lấy từ dataTime trong profile doctor


    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({ dataProfile: data });
    }
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }
    // buildDataGender = (data) => {
    //     let result = [];
    //     let language = this.props.language;
    //     if (data && data.length > 0) {
    //         data.map(item => {
    //             let object = {};
    //             object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
    //             object.value = item.keyMap;
    //             result.push(object);
    //         })
    //     }
    //     return result;
    // }
 
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            // this.setState({
            //     genders: this.buildDataGender(this.props.genders)
            // })
        }
       

        //dataTime được lấy từ api getprofiledoctorbyid trong class Profiledoctor
        if (this.props.dataTime !== prevProps.dataTime) { 
           if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
             
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,

                })
            }
           
        }

        if (this.props.dataProfile !== prevProps.dataProfile) {
            if (this.props.dataProfile && !_.isEmpty(this.props.dataProfile)) {
            let priceId = this.props.dataProfile.priceId;
            this.setState({

                priceId: priceId
            })
        }
    }
    }
    // VỚI event.target.value, nó truy xuất giá trị của tất cả những đầu vào được gọi,
 // bất kỳ thứ gì chèn vào đầu vào đều có thể được truy cập thông qua event.target.value
    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleOnChangeDatePickers =(birthdays) =>{
        this.setState({
            birthdays: birthdays[0]
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
                image: base64,
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,


        })

    }
    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd -DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd- MM/DD/YYYY');
            let birthdays = language === LANGUAGES.VI ?
                moment.unix(+dataTime.birthdays / 1000).format('dddd -DD/MM/YYYY') :
                moment.unix(+dataTime.birthdays / 1000).locale('en').format('ddd- MM/DD/YYYY');
         
       
            return `${time} - ${date}`;

        }
        return ''
    }
    buildPriceBooking = (dataProfile) => {
        let { language } = this.props;
        if (dataProfile && !_.isEmpty(dataProfile)) {

            let price = language === LANGUAGES.VI ? dataProfile.Doctor_Infor.priceTypeData.valueVi : dataProfile.Doctor_Infor.priceTypeData.valueEn;

            return (
                <>
                    <div>{price}</div>

                </>
            )

        }
        return ''
    }

   
    // handleChangeSelect = (selectedOption) => {
    //     this.setState({
    //         selectedGender: selectedOption
    //     });
    //  if (this.props.history) {
    // console.log('baophuc2k check doctor', doctor);
    // this.props.history.push(`/detail-doctor/${doctor.id}`);
    // }
    // }
    handleConfirmBooking = async () => {
        //date là truyền timestamp lên db 
        //timeString truyền human date lên nodemailer
        let date = new Date(this.state.birthday).getTime();
        let birthdays = new Date(this.state.birthdays).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
     let price = this.buildPriceBooking(this.props.dataProfile);

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reasons: this.state.reasons,
            date: this.props.dataTime.date,
            birthday: date,
            birthdays: birthdays,
            plantName: this.state.plantName,
            specialtyName: this.state.specialtyName,
            // selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            priceId: this.state.priceId,
            image: this.state.image,
            language: this.props.language,
            timeString: timeString,
            price: this.props.dataProfile.priceTypeData
        })
        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment succeed!")
            this.props.closeBookingClose();
            console.log('check res', res);
        } else {
            toast.error("Booking a new appointment failed!")
            console.log('check res', res);
        }
    }
    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
      let {dataProfile} = this.state;
        let doctorId = '';
        let priceId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
           
        }
        if (dataProfile && !_.isEmpty(dataProfile)) {
            priceId = dataProfile.priceId;

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
                                    priceId = {priceId} />
                            </div>
                           
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.fullName" /></label>
                                    <input className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')} />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                    <input className="form-control"
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
                               
                                {/* <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                        <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}/>
                                    </div> */}
                                <div className="col-4 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.plantName" /></label>
                                    <input className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, 'plantName')} />
                                </div>
                                <div className="col-4 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.specialtyName" /></label>
                                    <input className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, 'specialtyName')} />
                                </div>
                                <div className="col-4 form-group">
                                    <label>PRICE:</label>
                                    <input className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, 'priceId')}
                                        // value={dataProfile.Doctor_Infor.priceTypeData.valueVi} 
                                        disabled/>
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
        language: state.app.language
        // genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);





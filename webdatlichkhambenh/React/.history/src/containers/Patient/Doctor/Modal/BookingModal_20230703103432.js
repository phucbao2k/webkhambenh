import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import { LANGUAGES, CommonUtils } from '../../../../utils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import moment from 'moment';
import { toast } from "react-toastify";
import { postPatientBookAppointment} from "../../../../services/userService";
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            plantName: '',
            specialtyName: '',
            // selectedGender: '',
            doctorId: '',
            // genders: '',
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
            // let price = language === LANGUAGES.VI ? dataTime.priceTypeDataPatient.valueVi : dataTime.priceTypeDataPatient.valueEn;
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd -DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd- MM/DD/YYYY');
            let birthdays = language === LANGUAGES.VI ?
                moment.unix(+dataTime.birthdays / 1000).format('dddd -DD/MM/YYYY') :
                moment.unix(+dataTime.birthdays / 1000).locale('en').format('ddd- MM/DD/YYYY');
         
       
            return `${time} - ${date} `;

        }
        return ''
    }
    buildDoctorName = (dataTime) => {
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)){
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

   
    // handleChangeSelect = (selectedOption) => {
    //     this.setState({
    //         selectedGender: selectedOption
    //     });
    //  if (this.props.history) {
    // console.log('baophuc2k check doctor', doctor);
    // this.props.history.push(`/detail-doctor/${doctor.id}`);
    // }
    // }
    handleSubmit() {


        //VALIDATE
        var errors = [];
        if (this.state.fullName === "") {
            toast.error("Invalid full name input");
            errors.push("fullName");
        }
        if (this.state.reasons === "") {
            toast.error("Invalid reasons input");
            errors.push("reasons");
        }
    
        if (this.state.phoneNumber === "" || this.state.phoneNumber.length > 11) {
            toast.error("Invalid phone number input");
            errors.push("phoneNumber");
        }
        if (this.state.address === "") {
            toast.error("Invalid address input");
            errors.push("address");
        }
        if (this.state.plantName === "") {
            toast.error("Invalid plantName input");
            errors.push("plantName");
        }
        if (this.state.specialtyName === "") {
            toast.error("Invalid specialtyName input");
            errors.push("specialtyName");
        }
        if (this.state.image === "") {
            toast.error("Invalid image input");
            errors.push("image");
        }

        //email
        const expression = /\S+@\S+\.\S+/;
        var validEmail = expression.test(String(this.state.email).toLowerCase());

        if (!validEmail) {
            toast.error("Invalid email");
            errors.push("email");
        }

        this.setState({
            errors: errors
        });

        for (let i = 0; i < errors.length; i++) {
            if (i > 0) {
                toast.error("Error! Please enter valid ")
                break;
            }
        }
        return errors.length;
    }
    handleConfirmBooking = async () => {
        let errors = [];

        errors.length = this.handleSubmit();
        if (errors.length > 0) return;
        //date là truyền timestamp lên db 
        //timeString truyền human date lên nodemailer
        let date = new Date(this.state.birthday).getTime();
        // let birthdays = new Date(this.state.birthdays).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
   let doctorName = this.buildDoctorName(this.props.dataTime);

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reasons: this.state.reasons,
            date: this.props.dataTime.date,
            birthday: date,
            // birthdays: birthdays,
            plantName: this.state.plantName,
            specialtyName: this.state.specialtyName,
            // selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            priceId: this.state.priceId,
            image: this.state.image,
            language: this.props.language,
            timeString: timeString,
          doctorName: doctorName
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
        let {language}= this.props;
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
                               
                                {/* <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                        <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}/>
                                    </div> */}
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
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
      
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);





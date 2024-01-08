import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import VNPayPaymentButton from '../VNPayPaymentButton';
import { LANGUAGES, CommonUtils } from '../../../../utils';
import moment from 'moment';
import { getDetailInforDoctor } from '../../../services/userService';
import Select from 'react-select';
import * as actions from '../../../../store/actions';
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            doctorId: '',       
            timeType: '',
            isOpen: false,
            priceId: '',
            errors: [],
            detailDoctor: {},
            currentDoctorId: -1,
            detailPrice: {}
        }


    }
    //doctorId, timeType được lấy từ dataTime trong profile doctor


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            //nếu props này match với database ở trong api, và match vs db có tham số, và match vs tham số tồn tại ở db đó(id)
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforDoctor(id);

            if (res && res.errCode === 0) {
                let priceId = ''
                let detailPrice = res.data;
                if (detailPrice && detailPrice.Doctor_Infor && detailPrice.Doctor_Infor.priceId) {
                    priceId = detailPrice.Doctor_Infor.priceId;
                }
                this.setState({
                    detailDoctor: res.data,
                    priceId: detailPrice.Doctor_Infor.priceId,
                })
                console.log(res.data);

            }

        }
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

                        </div>
                        <div className="booking-modal-footer">

                            <div className="note"> <FormattedMessage id="patient.booking-modal.note" /></div>
                            import VNPayPaymentButton from './VNPayPaymentButton';
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





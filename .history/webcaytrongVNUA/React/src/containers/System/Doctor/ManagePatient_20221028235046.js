import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import RemedyModal from './RemedyModal';
import {toast} from 'react-toastify';
import LoadingOverLay from "react-loading-overlay";
import { findLastKey } from 'lodash';
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn


class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false

        }

    }


    async componentDidMount() {
       
        this.getDataPatient()

    }
    getDataPatient = async (user, formatedDate) => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        },
          async  () => {
                
              await  this.getDataPatient(user, formatedDate)
            })
    }
    handleBtnConfirm = (item) => {
        let data ={          
                doctorId: item.doctorId,
                patientId: item.patientId,
                email: item.patientData.email,
                timetype: item.timeType,
                patientName: item.patientData.firstName
           
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })

    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal:false,
            dataModal: {}
        })

    }
    sendRemedy = async (dataChild) => {
        let {dataModal} = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await postSendRemedy({
            email: dataChild.email,
            imageBase64: dataChild.imageBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        })
        if(res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send Remedy succeeds');
            this.closeRemedyModal();
            await this.getDataPatient();
        }else{
            this.setState({
                isShowLoading: false
            })
            toast.error('Something went wrong...');
            console.log('error remdey is:', res)
        }
    }

    render() {
       let {language} = this.props;
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        return (
            <>

            </>
            
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);





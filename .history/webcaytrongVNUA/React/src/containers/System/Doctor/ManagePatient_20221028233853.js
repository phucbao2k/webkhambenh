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
                timetype: item.timetype,
                patientName: item.patientData.firstName
           
        }
        this.setState({
            isOpenRemedyModal: true,
            data
        })

    }
    handleBtnRemedy = () => {

    }

    render() {
        console.log('check data',this.state)
        let { dataPatient } = this.state;
        return (
            <div className="manage-patient-container">
                <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
                <div className="manage-patient-body row">
                    <div className="col-4 form-group">
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate} />
                    </div>

                    <div className="col-12 table-manage-patient">
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Họ và tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Actions</th>
                                </tr>
                                {dataPatient && dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.timeTypeDataPatient.valueVi}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>
                                                    <button className="mp-btn-confirm"
                                                        onClick={() => this.handleBtnConfirm()}>Xác nhận</button>
                                                    <button className="mp-btn-remedy"
                                                        onClick={() => this.handleBtnRemedy()}>Gửi hóa đơn</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    : <tr>
                                        no data</tr>}
                            </tbody>



                        </table>
                    </div>

                </div>
            </div>
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





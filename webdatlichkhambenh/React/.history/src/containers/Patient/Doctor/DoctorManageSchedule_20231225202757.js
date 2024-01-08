import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import { saveBulkScheduleDoctor, getDetailInforDoctor } from '../../../services/userService';

class DoctorManageSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: '',
            rangeTime: [],
            minDate: moment().calendar(),
            selectedPrice: {},
        }
    }

    componentDidMount() {
        let { userInfo } = this.props;
        this.props.fetchAllScheduleTimes();
        if (userInfo && !_.isEmpty(userInfo)) {
            this.fetchDoctorPrice(userInfo.id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    fetchDoctorPrice = async (doctorId) => {
        let res = await getDetailInforDoctor(doctorId);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let priceId = res.data.Doctor_Infor.priceId;
            let selectedPrice = this.state.listPrice.find(item => item.value === priceId);
            this.setState({
                selectedPrice: selectedPrice || {},
            });
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language, userInfo } = this.props;

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelEn = `${item.lastName} ${item.firstName}`;
                let labelVi = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = userInfo.id;
                result.push(object);
            })

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

    handleOnChangeDatePicker = async (date) => {
        this.setState({
            currentDate: date[0]
        });

        let { userInfo } = this.props;
        if (userInfo && !_.isEmpty(userInfo)) {
            this.fetchDoctorPrice(userInfo.id);
        }
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, currentDate, selectedPrice } = this.state;
        let { userInfo } = this.props;
        let result = [];

        if (!currentDate) {
            toast.error("Invalid date!");
        }

        if (userInfo && _.isEmpty(userInfo)) {
            toast.error("Invalid selected doctor! ");
            return;
        }

        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {};
                    object.doctorId = userInfo.id;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    object.priceId = selectedPrice.value || ''; // Ensure priceId is set
                    result.push(object);
                })
            } else {
                toast.error("Invalid selected time! ");
                return;
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: userInfo.id,
            formatedDate: formatedDate
        });

        if (res && res.errCode === 0) {
            toast.success("Save Infor succeed!");
        } else {
            toast.error("Error saving schedule");
            console.log('Error saveBulkScheduleDoctor >>> res: ', res);
        }
    }

    render() {
        let { rangeTime } = this.state;
        let { language, userInfo } = this.props;
        let today = new Date(new Date().setDate(new Date().getDate()));

        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title"></FormattedMessage> : {userInfo && userInfo.firstName && userInfo.lastName ? ' ' + userInfo.firstName + ' ' + userInfo.lastName : ' '}
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-date" /> </label>
                            <DatePicker
                                value={this.state.currentDate}
                                className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                minDate={today}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ?
                                            "btn btn-schedule active" : "btn btn-schedule"}
                                            key={index} onClick={() => this.handleClickBtnTime(item)}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })}
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary btn-save-schedule"
                                onClick={() => this.handleSaveSchedule()}>
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllScheduleTimes: () => dispatch(actions.fetchAllScheduleTimes())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManageSchedule);

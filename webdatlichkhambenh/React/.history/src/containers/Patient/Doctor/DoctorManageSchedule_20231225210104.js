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
            listPrice: [],
        }
    }

    async componentDidMount() {
        let { userInfo } = this.props;
        this.props.fetchAllScheduleTimes();

        // Gọi hàm fetchDoctorPrice khi component được tạo
        if (userInfo && userInfo.id) {
            await this.fetchDoctorPrice(userInfo.id);
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const { userInfo } = this.props;

        if (prevProps.userInfo.id !== userInfo.id) {
            // Gọi hàm fetchDoctorPrice khi doctorId thay đổi
            if (userInfo && userInfo.id) {
                await this.fetchDoctorPrice(userInfo.id);
            }
        
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
        try {
            // Gọi API để lấy thông tin bác sĩ
            let res = await getDetailInforDoctor(doctorId);

            // Log toàn bộ response từ API để kiểm tra
            console.log('API Response:', res);

            if (res && res.errCode === 0 && res.data && res.data.Markdown) {
                // Lấy priceId từ dữ liệu trả về
                let priceId = res.data.Doctor_Infor?.priceId;

                // Lấy ra giá từ state.listPrice dựa trên priceId
                let selectedPrice = this.state.listPrice.find(item => item.value === priceId);

                // Cập nhật state cho selectedPrice
                this.setState({
                    selectedPrice: selectedPrice || {},
                });

                // Log priceId để kiểm tra
                console.log('Fetched priceId:', priceId);
            }
        } catch (error) {
            console.error("Error fetching doctor price:", error);
            // Xử lý lỗi nếu cần thiết
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
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
            return;
        }

        if (userInfo && _.isEmpty(userInfo)) {
            toast.error("Invalid selected doctor!");
            return;
        }

        // Kiểm tra giá trị của selectedPrice
        if (_.isEmpty(selectedPrice)) {
            toast.error("Invalid selected price!");
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
                    object.priceId = selectedPrice.value; // Sử dụng selectedPrice.value
                    result.push(object);
                })
            } else {
                toast.error("Invalid selected time!");
                return;
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: userInfo.id,
            formatedDate: formatedDate,
            selectedPrice: selectedPrice.value
        });

        if (res && res.errCode === 0) {
            toast.success("Save Infor succeed!");
        } else {
            toast.error("Error saving schedule");
            console.log('Error saving schedule >>> res:', res);
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
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" /> </label>
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

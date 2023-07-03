import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import {  LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import { saveBulkScheduleDoctor,getDetailInforDoctor } from '../../../services/userService';
class ManageSchedule extends Component {
    // PROPS stands for properties and is being used for passing data from one component to another.
    // But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)

    //để lưu giá trị của 1 biến components, ta dùng state
    //Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
            minDate: moment().calendar(),
            listPrice: [],
            selectedPrice:{},
            hasOldData: false,
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTimes();
        // this.props.fetchAllPrice();
        this.props.getAllRequiredDoctorInfor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        //Là để check xem khi API đã trả về dữ liệu rồi thì làm gì...
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice} = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
           
            console.log('bao phuc check data new: ', dataSelectPrice);
            this.setState({
                listPrice: dataSelectPrice
              
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPrice} = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
           
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,

            })

        }
    }
    buildDataInputSelect = (inputData, type) => {
        console.log("check input data", inputData)
        //inputData đã được lấy từ componentDidMount(), cụ thể là this.props; 
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelEn = `${item.lastName} ${item.firstName} `;
                    let labelVi = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
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
    handleChangeSelectDoctorInfor = async (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedDoctor;
        this.setState({
            ...stateCopy
        })
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Doctor selected:`, this.state.selectedDoctor)
        );
        let {  listPrice } = this.state;
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
           
            let 
                priceId = '', selectedPrice = '';
            if (res.data.Doctor_Infor) {
              
                priceId = res.data.Doctor_Infor.priceId;
               
               
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
              
            }
            this.setState({
              
                hasOldData: true,
               
                selectedPrice: selectedPrice,
              
            })
            //để lấy thông tin từ bảng markdown rồi in ra màn hình, ta có thể gọi api như trên, rồi dùng hàm setState
        } else {
            this.setState({
               
                hasOldData: false,
              
                selectedPrice: '',
               
            })
        }

    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
            //thư viện date này sẽ trả về 1 array nhiều phần tử
            // nếu ta bấm liên tục nhiều lần, vì vậy date[0] là để lấy giá trị ngày đầu tiên trong array
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
    handleSaveSchedule =  () => {
        let { rangeTime, selectedDoctor, currentDate, selectedPrice} = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Invalid date!");

        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor! ");
            console.log('check doctor: ', this.state)
            return;
        }
        if (selectedPrice && _.isEmpty(selectedPrice)) {
            toast.error("Invalid selected price! ");
            console.log('check price: ', this.state)
            return;
        }
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    // chúng ta thay schedule bằng cái gì cũng được, react tự hiểu đấy là 1 phần tử của arr đó
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    object.priceId = selectedPrice.value;
                    result.push(object);
                })
            } else {
                toast.error("Invalid selected time! ");
                return;
            }
        }
        let res = this.props.saveScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate,
           selectedPrice: selectedPrice.value
        })
        if (res && res.errCode === 0) {
            toast.success("Save Schedule succeed!");
        } else {
          
            console.log('error saveScheduleDoctor >>> res: ', res)
        }
        console.log('bao phuc check result: ', result);
        console.log('check res: saveScheduleDoctor : ', res);
    }
   
    render() {
        let { rangeTime, hasOldData } = this.state;
        let { language } = this.props;
        let today = new Date(new Date().setDate(new Date().getDate()));
        //khi muốn render ra 1 thứ gì đó trong react, chúng ta phải có hàm return, và trong đó bắt buộc là 1 khối


        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title"></FormattedMessage>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" /> </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />

                        </div>
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" /> </label>
                            <DatePicker
                                value={this.state.currentDate}
                                className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                minDate={today}
                            //minDate là để lấy ngày hiện tại
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
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                                name="selectedPrice"
                                isDisabled={true}
                            />
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
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
        allPrice: state.admin.price,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTimes: () => dispatch(actions.fetchAllScheduleTimes()),
        saveScheduleDoctor: (data) => dispatch(actions.saveScheduleDoctor(data)),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

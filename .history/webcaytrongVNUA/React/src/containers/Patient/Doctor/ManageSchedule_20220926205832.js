import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import {CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
class ManageSchedule extends Component {
// PROPS stands for properties and is being used for passing data from one component to another.
// But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)
  
//để lưu giá trị của 1 biến components, ta dùng state
//Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.
    constructor(props){
        super(props);
        this.state ={
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount(){
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps,prevState, snapshot){
if(prevProps.allDoctors !== this.props.allDoctors){
    let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
    this.setState({
        listDoctors: dataSelect
    })
}
if(prevProps.allScheduleTime !== this.props.allScheduleTime){
    this.setState({
        rangeTime: this.props.allScheduleTime
    })
}
    }
buildDataInputSelect =(inputData)=>{
    let result =[];
    let {language} = this.props;
    if(inputData && inputData.length > 0){
        inputData.map((item, index)=>{
            let object = {};
            let labelEn = `${item.lastName} ${item.firstName}`;
            let labelVi = `${item.firstName} ${item.lastName}`;
            object.label = language === LANGUAGES.VI ? labelVi: labelEn;
            object.value = item.id;
            result.push(object)
        })
    }
    return result;
}
handleChangeSelect = async ( selectedOption)=>{
    this.setState({ selectedOption: selectedOption});
}
handleOnChangeDatePicker = (date) =>{
    this.setState({
        currentDate: date[0]
    })
}
    render() {
        let {rangeTime} = this.state;
        let {language}= this.props;
    
        //khi muốn render ra 1 thứ gì đó trong react, chúng ta phải có hàm return, và trong đó bắt buộc là 1 khối
      
        
        return (
<div className ="manage-schedule-container">
    <div className="m-s-title">
        <FormattedMessage id="manage-schedule.title"></FormattedMessage>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-6 form-group">
                <label>
                    <FormattedMessage id="manage-schedule.choose-doctor"/> </label>
                    <Select
                    value={this.state.selectedDoctor}
                    onChange={this.handleChangeSelect}
                    options={this.state.listDoctors}
                    />
               
            </div>
            <div className="col-6 form-group">
                <label>
                    <FormattedMessage id="manage-schedule.choose-date"/> </label>
                    <DatePicker
                    value={this.state.currentDate}
                    className="form-control"
                    onChange={this.handleOnChangeDatePicker}
                    minDate ={new Date()}
                    />
               
            </div>
            <div className=""></div>
        </div>
    </div>
</div>


          
        );
    }

}

const mapStateToProps = state => {
    return {
        // language: state.app.language,
     isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

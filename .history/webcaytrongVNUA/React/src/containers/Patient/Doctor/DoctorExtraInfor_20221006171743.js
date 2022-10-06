import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isShowDetailInfor: false
        }
    }
    async componentDidMount() {
       
    }
   
   
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
           
        }
      
    }
 showHideDetailInfor = (status)=>{
    this.setState({
        isShowDetailInfor: status
    })
 }
    render() {
        let { isShowDetailInfor } = this.state;
       
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ KHÁM</div>
                </div>
                <div className="all-available-time">
                    <div className="text-calendar">
                        <i className="fa-regular fa-calendar-days">
                            <span><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                        </i>
                    </div>
                    <div className="time-content">
                        {allAvailableTime && allAvailableTime.length > 0 ?
                            <>
                                <div className=" time-content-btns">
                                    {allAvailableTime.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ?
                                            item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                        return (
                                            <button key={index}> {timeDisplay}
                                            </button>
                                        )
                                    })

                                    }
                                </div>
                                <div className="book-free">
                                    <span>
                                        <FormattedMessage id="patient.detail-doctor.choose" />
                                        <i className="fa-solid fa-hand-point-up"></i>
                                        <FormattedMessage id="patient.detail-doctor.book-free" />
                                    </span>
                                </div>
                            </>
                            : <div className=" no-schedule">
                                <FormattedMessage id="patient.detail-doctor.no-schedule" />
                            </div>
                        }
                    </div>
                </div>
            </div>



        );

    }

}
const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};
const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);

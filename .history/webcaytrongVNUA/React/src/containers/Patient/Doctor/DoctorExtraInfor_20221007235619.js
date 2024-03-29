import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils';
import { getExtraInforDoctorById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isShowDetailInfor: false,
          extraInfor: {}
        }
    }
    async componentDidMount() {
       
    }
   
   
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
           
        }
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if(res && res.errCode === 0){
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }
 showHideDetailInfor = (status)=>{
    this.setState({
        isShowDetailInfor: status
    })
 }
    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let {language} = this.props;
       
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address"> <FormattedMessage id="patient.extra-infor-doctor.text-address" /></div>
                    <div className="name-clinic">
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic: ''}
                    </div>
                    <div className="detail-address">
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor ===false &&
                    <div className="short-infor">
                        <FormattedMessage id="patient.extra-infor-doctor.price"/>
                        {extraInfor && extraInfor.priceTypeData &&}
                        <span onClick={() => this.showHideDetailInfor(true)}>
                            Xem chi tiết
                        </span>
                        </div>
                        }
                        {isShowDetailInfor === true &&
                        <>
                        <div className="title-price">GIÁ KHÁM: </div>
                        <div className="detail-infor">
                            <div className="price">
                                <span className="left">
                                    Gía khám
                                </span>
                                <span className="right">350.000 VND</span>
                            </div>
                            <div className="note">
                                Được ưu tiến khám trước khi đặt khám qua trang web này.
                            </div>
                            <div className="payment">
                                Người dùng có thể thanh toán bằng hình thức tiền mặt hoặc thẻ tín dụng
                            </div>

                        </div>
                        <div className="hide-price">
                            <span onClick={() => this.showHideDetailInfor(false)}>
                                Ẩn bảng giá
                            </span>
                        </div>

                        </>
                        }
                    
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

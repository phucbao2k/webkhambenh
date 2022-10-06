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
                    <div className="name-clinic">Phòng khám chuyên khoa cây nông nghiệp</div>
                    <div className="detail-address">Viện sinh học Nông nghiệp - Học viện nông nghiệp Việt Nam - Thị trấn Trâu Qùy - Gia Lâm - Hà Nội</div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor ===false &&
                    <div className="short-infor">
                        GIÁ KHÁM: 350.000 VND.
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
                                
                            </div>
                        </div>

                        </>}
                    
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

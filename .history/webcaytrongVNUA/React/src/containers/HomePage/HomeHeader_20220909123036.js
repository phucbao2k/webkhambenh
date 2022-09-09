import React, { Component} from 'react';
import {connect} from 'react-redux';
import './HomeHeader.scss';
class HomeHeader extends Component {
    render(){
        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                    <i className="fa-solid fa-bars-staggered"></i>
                    <div className="header-logo"></div>
                    </div>
                    <div className="center-content">
                        <div className="child-content">
                            <div><b>Chuyên khoa(loại cây trồng)</b></div>
                            <div className="sub-title"> Tìm người khám theo loại cây trồng</div>
                        </div>
                        <div className="child-content">
                            <div><b>Cơ sở khám bệnh</b></div>
                            <div className="sub-title"> Chọn nơi khám bệnh </div>
                        </div>
                        <div className="child-content">
                            <div><b>Chuyên gia</b></div>
                            <div className="sub-title"> Chọn chuyên gia giỏi </div>
                        </div>
                        <div className="child-content">
                            <div><b>Gói khám</b></div>
                            <div className="sub-title">Khám toàn diện cho cây trồng</div>
                        </div>

                    </div>
                    <div className="right-content">
                        <div className="support"><i className="fa-solid fa-circle-question"></i>Hỗ trợ</div>
                        <div className="flag">VN</div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        isLo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
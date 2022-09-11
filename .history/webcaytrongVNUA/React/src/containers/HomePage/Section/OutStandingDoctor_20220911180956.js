import React, { Component } from 'react';
import {connect} from 'react-redux';

import {FormattedMessage} from 'react-intl';
import Slider from "react-slick";


class OutStandingDoctor extends Component{
   
    render(){
        // let settings ={
        //     dots: false,
        //     isFinite: true,
        //     speed: 500,
        //     slidesToShow:4,
        //     slidesToScroll:1
        // };
        // trên đây là setting cho Slider
        // 
        return(
            <div className="section-share section-outstanding-doctor">
                <div  className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="carousel.gooddoctor"/></span>
                        <button className="btn-section"><FormattedMessage id="carousel.carousel-2"/></button>
                    </div>
                    <div className="section-body">
                        {/* Dưới đây là cách bọc các ảnh, chữ thành 1 slide lớn, nằm ngang */}
                    <Slider {...this.props.settings}>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                <div className="bg-image section-outstanding-doctor"></div>
                                </div>
                                <div></div>
                            </div>
                            
                            <div>Cẩm nang chăm sóc cây 1</div>
                        </div>
                        <div className="section-customize">
                        <div className="bg-image section-outstanding-doctor"></div>
                            <div>Cẩm nang chăm sóc cây 2</div>
                        </div>
                        <div className="section-customize">
                        <div className="bg-image section-outstanding-doctor"></div>
                            <div>Cẩm nang chăm sóc cây 3</div>
                        </div>
                        <div className="section-customize">
                        <div className="bg-image section-outstanding-doctor"></div>
                            <div>Cẩm nang chăm sóc cây 4</div>
                        </div>
                        <div className="section-customize">
                        <div className="bg-image section-outstanding-doctor"></div>
                            <div>Cẩm nang chăm sóc cây 5</div>
                        </div>
                        <div className="section-customize">
                        <div className="bg-image section-outstanding-doctor"></div>
                            <div>Cẩm nang chăm sóc cây 6</div>
                        </div>
                    </Slider>
                    </div>
                    
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
import React, { Component } from 'react';
import {connect} from 'react-redux';

import {FormattedMessage} from 'react-intl';
import Slider from "react-slick";


class HandBook extends Component{
   
    render(){
        let settings ={
            dots: false,
            isFinite: true,
            speed: 500,
            slidesToShow:4,
            slidesToScroll:1
        };
        // trên đây là setting cho Slider
        // 
        return(
            <div className="section-HandBook">
                <div  className="specialty-container">
                    <div className="specialty-header">
                        <span className="title-section"><FormattedMessage id="carousel.carousel-1"/></span>
                        <button className="btn-section"><FormattedMessage id="carousel.carousel-2"/></button>
                    </div>
                    <div className="specialty-body">
                        {/* Dưới đây là cách bọc các ảnh, chữ thành 1 slide lớn, nằm ngang */}
                    <Slider {...settings}>
                        <div className="specialty-customize">
                            <div className="bg-image"></div>
                            <div>Khám cây trồng công/nông nghiệp 1</div>
                        </div>
                        <div className="specialty-customize">
                        <div className="bg-image"></div>
                            <div>Khám cây trồng công/nông nghiệp 2</div>
                        </div>
                        <div className="specialty-customize">
                        <div className="bg-image"></div>
                            <div>Khám cây trồng công/nông nghiệp 3</div>
                        </div>
                        <div className="specialty-customize">
                        <div className="bg-image"></div>
                            <div>Khám cây trồng công/nông nghiệp 4</div>
                        </div>
                        <div className="specialty-customize">
                        <div className="bg-image"></div>
                            <div>Khám cây trồng công/nông nghiệp 5</div>
                        </div>
                        <div className="specialty-customize">
                        <div className="bg-image"></div>
                            <div>Khám cây trồng công/nông nghiệp 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HAN);
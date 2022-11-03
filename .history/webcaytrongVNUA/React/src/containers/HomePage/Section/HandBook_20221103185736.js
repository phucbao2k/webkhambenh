import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";


class HandBook extends Component {

    render() {
        // let settings ={
        //     dots: false,
        //     isFinite: true,
        //     speed: 500,
        //     slidesToShow:4,
        //     slidesToScroll:1
        // };
        // trên đây là setting cho Slider
        // 
        return (
            <div className="section-share section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="carousel.handbook" /></span>
                        <button className="btn-section"><FormattedMessage id="carousel.carousel-2" /></button>
                    </div>
                    <div className="section-body">
                        {/* Dưới đây là cách bọc các ảnh, chữ thành 1 slide lớn, nằm ngang */}
                        <Slider {...this.props.settings}>
                            {dataHandbooks && dataHandbooks.length > 0
                                && dataHandbooks.map((item, index) => {
                                    return (
                                        <div className="section-customize clinic-child" key={index}
                                            onClick={() => this.handleViewDetailHandbook(item)}>
                                            <div className="bg-image section-medical-facility"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className="clinic-name">{item.name}</div>
                                        </div>
                                    )
                                })}
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
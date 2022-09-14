import React, { Component } from 'react';
import {connect} from 'react-redux';
import './Specialty.scss';
import {FormattedMessage} from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Specialty extends Component{
    render(){
        let settings ={
            dots: false,
            isFinite: true,
            speed: 500,
            slidesToShow:1,
            slidesToScroll:1
        };
        return(
            <div className="section-specialty">
                <div  className="specialty-content">
                    <Slider {...settings}>
                        <div className="img-cus"></div>
                    </Slider>
                </div>
            </div>
        )
    }
}
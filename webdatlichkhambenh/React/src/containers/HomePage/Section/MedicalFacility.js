import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import {getAllClinic} from '../../../services/userService';
import {withRouter} from 'react-router';
class MedicalFacility extends Component {
    constructor(props){
        super(props);
        this.state={
            dataClinics: []
        }
    }
    async componentDidMount(){
        let res = await getAllClinic();
        if(res && res.errCode === 0){
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }
    handleViewDetailClinic = (clinic) => {
        if(this.props.history){
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    render() {
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        // trên đây là setting cho Slider
        // 
        let {dataClinics} = this.state;
        return (
            <div className="section-share section-medical-facility  mb-5" id="clinic">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="homeheader.health-facility" /></span>
                        {/* <button className="btn-section"><FormattedMessage id="carousel.carousel-2" /></button> */}
                    </div>
                    <div className="section-body">
                        {/* Dưới đây là cách bọc các ảnh, chữ thành 1 slide lớn, nằm ngang */}
                        <Slider {...settings}>
                          {dataClinics && dataClinics.length>0
                          && dataClinics.map((item, index)=> {
                            return(
                                <div className="section-customize" key={index}
                                onClick={()=> this.handleViewDetailClinic(item)}>

                                    <div className="customize-border clinic-child">
                                        <div className="outer-bg">
                                            <div className=" section-medical-facility"
                                                style={{ backgroundImage: `url(${item.image})` }} />


                                        </div>
                                        <div className="position text-center">
                                            <div className="clinic-name">{item.name}</div>

                                        </div>
                                    </div>
                                    {/* <div className="bg-image section-medical-facility"
                                    style={{backgroundImage: `url(${item.image})`}}
                                    />
                                    <div className="clinic-name">{item.name}</div> */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
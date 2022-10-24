import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import {getAllSpecialty} from '../../../services/userService';
import 
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
           dataSpecialty: []
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        if(res && res.errCode === 0){
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    render() {
        let {dataSpecialty} = this.state;
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
            <div className="section-share section-specialty">
                <div className="specialty-container">
                    <div className="specialty-header">
                        <span className="title-section"><FormattedMessage id="carousel.carousel-1" /></span>
                        <button className="btn-section"><FormattedMessage id="carousel.carousel-2" /></button>
                    </div>
                    <div className="specialty-body">
                        {/* Dưới đây là cách bọc các ảnh, chữ thành 1 slide lớn, nằm ngang */}
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 && 
                            dataSpecialty.map((item, index)=> {
                                return (
                                    <div className="section-customize specialty-child" key={index}>
                                        <div className="bg-image section-specialty"
                                        style={{backgroundImage: `url(${item.image})`}}
                                        />
                                        <div className="specialty-name">{item.name}</div>
                                    </div>
                                )
                            }
                            )
                            }

                           
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
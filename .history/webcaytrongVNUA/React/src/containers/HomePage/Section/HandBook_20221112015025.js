import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllHandbook } from '../../../services/userService';
import { withRouter } from 'react-router';


class HandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHandbooks: []
        }
    }
    async componentDidMount() {
        let res = await getAllHandbook();
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbooks: res.data ? res.data : []
            })
        }
    }
    handleViewDetailHandbook = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${item.id}`)
        }
    }
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
        let { dataHandbooks } = this.state;
        return (
            <div className="section-share section-handbook max-1300 mb-5">
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
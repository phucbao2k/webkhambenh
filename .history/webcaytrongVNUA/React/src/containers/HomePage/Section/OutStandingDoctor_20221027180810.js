import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
            // dataSpecialty: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
        // if (prevProps.topDoctorSpecialtyRedux !== this.props.topDoctorSpecialtyRedux) {
        //     this.setState({
        //         dataSpecialty: this.props.topDoctorSpecialtyRedux
        //     })
        // }
    }
   async componentDidMount() {
        this.props.loadTopDoctors();
        // this.props.loadTopDoctorsSpecialty();
    }
    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            console.log('baophuc2k check doctor', doctor);
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }

    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;


        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="carousel.gooddoctor" /></span>
                        <button className="btn-section"><FormattedMessage id="carousel.carousel-2" /></button>
                    </div>
                    <div className="section-body">

                        {/* Dưới đây là cách bọc các ảnh, chữ thành 1 slide lớn, nằm ngang */}
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    
                                        
                                    let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                                    //Những câu lệnh nằm trên hàm return sẽ có khả năng áp dụng toàn bộ vào hàm return phía sau, tùy ý đồ của chúng ta
                                    return (
                                        <div className="section-customize" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className="customize-border">
                                                <div className="outer-bg">
                                                    <div className="bg-image section-outstanding-doctor"
                                                        style={{ backgroundImage: `url(${imageBase64})` }} />


                                                </div>
                                                <div className="position text-center">
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                   

                                                </div>
                                            </div>


                                        </div>
                                    )
                                })}
                            {/* {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    let nameSpecialty = '';
                                    if (item.clinicId) {
                                        nameSpecialty = item.clinicId;
                                    }


                                    
                                    //Những câu lệnh nằm trên hàm return sẽ có khả năng áp dụng toàn bộ vào hàm return phía sau, tùy ý đồ của chúng ta
                                    return (
                                        <div >
                                            


                                        </div>
                                    )
                                })} */}



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
        topDoctorRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
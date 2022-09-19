import React, { Component } from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Slider from "react-slick";
import * as actions from "../actions";
import {LANGUAGES} from "../../../utils";
import { isBuffer } from 'lodash';

class OutStandingDoctor extends Component{
   constructor(props){
    super(props)
    this.state ={
        arrDoctors: []
    }
   }
   componentDidUpdate(prevProps,prevState,snapshot){
    if(prevProps.topDoctorRedux !== this.props.topDoctorRedux){
        this.setState({
            arrDoctors: this.props.topDoctorRedux
        })
    }
   }
   componentDidMount(){
    this.props.loadTopDoctors();
   }
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
        let arrDoctors = this.state.arrDoctors;
        let {language} = this.props;
        arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
        console.log('bao phuc: ',arrDoctors)
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
                        {arrDoctors && arrDoctors.lenght>0 &&
                        arrDoctors.map((item, index)=>{
if(item.image){
    imageBase64 = new isBuffer(item.image, 'base64').toS
}
                        })}
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                <div className="bg-image section-outstanding-doctor"></div>
                                </div>
                                <div className="position text-center">
                                <div>Giáo sư, Tiến Sĩ TBP</div>
                                <div>Cây nào cũng khám được</div>
                                </div>
                            </div>
                            
                           
                        </div>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                <div className="bg-image section-outstanding-doctor"></div>
                                </div>
                                <div className="position text-center">
                                <div>Giáo sư, Tiến Sĩ TBP</div>
                                <div>Cây nào cũng khám được</div>
                                </div>
                            </div>
                            
                           
                        </div>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                <div className="bg-image section-outstanding-doctor"></div>
                                </div>
                                <div className="position text-center">
                                <div>Giáo sư, Tiến Sĩ TBP</div>
                                <div>Cây nào cũng khám được</div>
                                </div>
                            </div>
                            
                           
                        </div>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                <div className="bg-image section-outstanding-doctor"></div>
                                </div>
                                <div className="position text-center">
                                <div>Giáo sư, Tiến Sĩ TBP</div>
                                <div>Cây nào cũng khám được</div>
                                </div>
                            </div>
                            
                           
                        </div>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                <div className="bg-image section-outstanding-doctor"></div>
                                </div>
                                <div className="position text-center">
                                <div>Giáo sư, Tiến Sĩ TBP</div>
                                <div>Cây nào cũng khám được</div>
                                </div>
                            </div>
                            
                           
                        </div>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                <div className="bg-image section-outstanding-doctor"></div>
                                </div>
                                <div className="position text-center">
                                <div>Giáo sư, Tiến Sĩ TBP</div>
                                <div>Cây nào cũng khám được</div>
                                </div>
                            </div>
                            
                           
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
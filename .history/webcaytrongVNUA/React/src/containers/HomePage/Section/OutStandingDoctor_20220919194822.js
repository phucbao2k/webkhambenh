import React, { Component } from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import {LANGUAGES} from "../../../utils";


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
                            let imageBase64 ='';
if(item.image){
    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
}
let nameVi = `${item.positionData.valueVi}, ${item.lastName}, ${item.firstName}`;
let nameEn = `${item.positionData.valueEn}, ${item.lastName}, ${item.firstName}`;
                        })}
                     zziv className="section-customize" key={index}>
                            <div className="customize-border">
                                <div className="outer-bg">
                                <div className="bg-image section-outstanding-doctor"
                                style={{backgroundImage: `url(${imageBase64})`}}/>

                               
                                </div>
                                <div className="position text-center">
                                <div>{language===LANGUAGES.VI ? nameVi: nameEn}</div>
                                <div>Cây nào cũng khám được</div>
                                </div>
                            </div>
                            
                           
                        </div>
                        {/* <div className="section-customize" key={index}>
                            <div className="customize-border">
                                <div className="outer-bg">
                                <div className="bg-image section-outstanding-doctor"
                                style={{backgroundImage: `url(${imageBase64})`}}/>

                               
                                </div>
                                <div className="position text-center">
                                <div>{language===LANGUAGES.VI ? nameVi: nameEn}</div>
                                <div>Cây nào cũng khám được</div>
                                </div>
                            </div>
                            
                           
                        </div>
                        <div className="section-customize" key={index}>
                            <div className="customize-border">
                                <div className="outer-bg">
                                <div className="bg-image section-outstanding-doctor"
                                style={{backgroundImage: `url(${imageBase64})`}}/>

                               
                                </div>
                                <div className="position text-center">
                                <div>{language===LANGUAGES.VI ? nameVi: nameEn}</div>
                                <div>Cây nào cũng khám được</div>
                                </div>
                            </div>
                            
                           
                        </div>
                        <div className="section-customize" key={index}>
                            <div className="customize-border">
                                <div className="outer-bg">
                                <div className="bg-image section-outstanding-doctor"
                                style={{backgroundImage: `url(${imageBase64})`}}/>

                               
                                </div>
                                <div className="position text-center">
                                <div>{language===LANGUAGES.VI ? nameVi: nameEn}</div>
                                <div>Cây nào cũng khám được</div>
                                </div>
                            </div>
                            
                           
                        </div>
                        <div className="section-customize" key={index}>
                            <div className="customize-border">
                                <div className="outer-bg">
                                <div className="bg-image section-outstanding-doctor"
                                style={{backgroundImage: `url(${imageBase64})`}}/>

                               
                                </div>
                                <div className="position text-center">
                                <div>{language===LANGUAGES.VI ? nameVi: nameEn}</div>
                                <div>Cây nào cũng khám được</div>
                                </div>
                            </div>
                            
                           
                        </div>
                        <div className="section-customize" key={index}>
                            <div className="customize-border">
                                <div className="outer-bg">
                                <div className="bg-image section-outstanding-doctor"
                                style={{backgroundImage: `url(${imageBase64})`}}/>

                               
                                </div>
                                <div className="position text-center">
                                <div>{language===LANGUAGES.VI ? nameVi: nameEn}</div>
                                <div>Cây nào cũng khám được</div>
                                </div>
                            </div>
                            
                           
                        </div> */}
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
       loadTopDoctors:()=>dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
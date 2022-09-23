import React, { Component} from 'react';
import {connect} from 'react-redux';
import './HomeHeader.scss';
import {LANGUAGES} from '../../utils';
import {changeLanguageApp} from "../../store/actions"
import {FormattedMessage} from 'react-intl';
class HomeHeader extends Component {
    changeLanguage = (language)=>{
        this.props.changeLanguageAppRedux(language);
    }
    render(){
        let language = this.props.language;
        console.log("check language: " , language);
        return (
            <React.Fragment>
               
  <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                    <i className="fa-solid fa-bars-staggered"></i>
                   
                    <div className="header-logo"></div>
                    </div>
                    <div className="center-content">
                        <div className="child-content">
                            <div><b><FormattedMessage id="homeheader.speciality"/></b></div>
                            <div className="sub-title"> <FormattedMessage id="homeheader.searchdoctor"/></div>
                        </div>
                        <div className="child-content">
                            <div><b> <FormattedMessage id="homeheader.health-facility"/></b></div>
                            <div className="sub-title"> <FormattedMessage id="homeheader.select-room"/></div>
                        </div>
                        <div className="child-content">
                            <div><b><FormattedMessage id="homeheader.doctor"/></b></div>
                            <div className="sub-title"> <FormattedMessage id="homeheader.select-doctor"/> </div>
                        </div>
                        <div className="child-content">
                            <div><b><FormattedMessage id="homeheader.fee"/></b></div>
                            <div className="sub-title"><FormattedMessage id="homeheader.check-health"/></div>
                        </div>

                    </div>
                    <div className="right-content">
                        <div className="support"><i className="fa-solid fa-circle-question"></i><FormattedMessage id="homeheader.support"/></div>
                        <div className="language">
                        <div className={language === LANGUAGES.VI ?'language-vi active':'language-vi'}>
                            <span onClick={() =>this.changeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                        <div className={language === LANGUAGES.EN ?'language-en active':'language-en'}>
                            <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN
                            </span>
                            </div>
                        </div>
                        
                    </div>
                </div>
               
            </div>
            
            </React.Fragment>
          
        )
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
        changeLanguageAppRedux:(language)=> dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
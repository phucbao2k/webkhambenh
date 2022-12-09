import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { LANGUAGES } from '../../utils';
import * as actions from "../../store/actions";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import logo from '../../assets/logovsh.png';
import './reponsive-header.scss';
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { activeMenu: false };
        this.changeActiveMenu = this.changeActiveMenu.bind(this);
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    goToLogin = () => {
        if (this.props.history) {
            this.props.history.push(`/login`)
        }
    }
goToClinic = () => {
    const element = document.getElementById("clinic");
    element.scrollIntoView({ behavior: 'smooth' });
}
goToSpecialty = () => {
    const element = document.getElementById("specialty");
    element.scrollIntoView({ behavior: 'smooth' });
}
goToTopDoctor=() => {
    const element = document.getElementById("top-doctor");
    element.scrollIntoView({ behavior: 'smooth' });
}
goToHandBook = ()=> {
    const element = document.getElementById("handbook");
    element.scrollIntoView({ behavior: 'smooth' });
}
    changeActiveMenu = () => {
        this.setState({
            activeMenu: !this.state.activeMenu
        });
    }
    componentDidMount() {
        let { userInfo } = this.props;
       
    }
    render() {
        let language = this.props.language;
        console.log("check language: ", language);
        const {  userInfo } = this.props;
        return (
            <React.Fragment>

                <div className={this.state.activeMenu == false ? 'left_menu' : 'left_menu active_menu'}>
                    <div className='overlay' onClick={this.changeActiveMenu}></div>
                    
                    <div className='container main-content'>
                       
                        <div className='menu__item' onClick={() => this.goToSpecialty()}>
                           
                                <div className='pointer'><b><FormattedMessage id="homeheader.speciality" /></b></div>
                                <div className="sub-title"> <FormattedMessage id="homeheader.select-speciality" /></div>
                            </div>
                        <div className='menu__item' onClick={() => this.goToClinic()}>
                          
                                <div className='pointer'><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className="sub-title"> <FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                        <div className='menu__item' onClick={() => this.goToTopDoctor()}>
                           
                            <div className='pointer'><b><FormattedMessage id="homeheader.doctor" /></b></div>
                            <div className="sub-title"> <FormattedMessage id="homeheader.select-doctor" /></div>
                        </div>
                        <div className='menu__item' onClick={() => this.goToHandBook()}>
                          
                            <div className='pointer'><b><FormattedMessage id="homeheader.handbook" /></b></div>
                            <div className="sub-title"> <FormattedMessage id="homeheader.solution" /></div>
                        </div>
                        <div className=''>
                            <div className='menu__item pointer' onClick={() => this.goToLogin()}>
                                <FormattedMessage id="homeheader.manage-account"></FormattedMessage>
                               
                                {userInfo && userInfo.firstName && userInfo.lastName ? ' ' + userInfo.firstName + ' ' + userInfo.lastName : ' '} !
                            </div>
                         
                        </div>
                    </div>
                </div>
                <div className='w-ful bg-white'>
                    <div className='container p-0  mx-auto'>
                        <div className='row p-0 m-0'>
                            <div className='col-12 p-0 py-2'>
                                <div className='d-flex justify-content-between align-items-center menu__header'>
                                    <div className='menu__item logo'>
                                        <i className="fa-solid fa-bars-staggered" onClick={this.changeActiveMenu} /><img className="header-logo" src={logo} onClick={() => this.returnToHome()}></img>
                                    </div>
                                    <div className='menu__item hide__item ' onClick={() => this.goToSpecialty()}>
                                        <div><b><FormattedMessage id="homeheader.speciality" /></b></div>
                                        <div className="sub-title"> <FormattedMessage id="homeheader.select-speciality" /></div>
                                    </div>
                                    <div className='menu__item hide__item' onClick={() => this.goToClinic()}>
                                        <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                        <div className="sub-title"> <FormattedMessage id="homeheader.select-room" /></div>
                                    </div>
                                    <div className='menu__item hide__item' onClick={() => this.goToTopDoctor()}>
                                        <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                        <div className="sub-title"> <FormattedMessage id="homeheader.select-doctor" /></div>
                                    </div>
                                    <div className='menu__item hide__item' onClick={() => this.goToHandBook()}>
                                        <div><b><FormattedMessage id="homeheader.handbook" /></b></div>
                                        <div className="sub-title"> <FormattedMessage id="homeheader.solution" /></div>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center menu__sup'>
                                        <div className='menu__item hide__576' onClick={() => this.goToLogin()}>
                                             <FormattedMessage id="homeheader.manage-account"></FormattedMessage>
                                            {userInfo && userInfo.firstName && userInfo.lastName ? ' ' + userInfo.firstName + ' ' + userInfo.lastName : ' '} !
                                        </div>
                                        <div className='menu__item '>
                                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                                            </div>
                                        </div>
                                        <div className='menu__item'>
                                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1"><FormattedMessage id="banner.title1" /></div>
                            <div className="title2"><FormattedMessage id="banner.title2" /></div> 
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
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
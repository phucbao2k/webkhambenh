import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { LANGUAGES } from '../../utils';
import * as actions from "../../store/actions";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import logo from '../../assets/images.png';
import {SearchDoctor} from '../HomePage/Section/SearchDoctor.js';
import './reponsive-header.scss';
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
             activeMenu: false,
            searchDoctorVisible: false,
             };
        this.changeActiveMenu = this.changeActiveMenu.bind(this);
        
    }
    toggleSearchDoctor = () => {
        this.setState((prevState) => ({
            searchDoctorVisible: !prevState.searchDoctorVisible,
        }));
    };
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
        const { searchDoctorVisible } = this.state;
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
                {!searchBarVisible && (
                    <>
                        <div className='menu__item hide__item ' onClick={() => this.goToSpecialty()}>
                            <div><b><FormattedMessage id='homeheader.speciality' /></b></div>
                            <div className='sub-title'> <FormattedMessage id='homeheader.select-speciality' /></div>
                        </div>
                        <div className='menu__item hide__item' onClick={() => this.goToClinic()}>
                            <div><b><FormattedMessage id='homeheader.health-facility' /></b></div>
                            <div className='sub-title'> <FormattedMessage id='homeheader.select-room' /></div>
                        </div>
                        <div className='menu__item hide__item' onClick={() => this.goToTopDoctor()}>
                            <div><b><FormattedMessage id='homeheader.doctor' /></b></div>
                            <div className='sub-title'> <FormattedMessage id='homeheader.select-doctor' /></div>
                        </div>
                        <div className='menu__item hide__item' onClick={() => this.goToHandBook()}>
                            <div><b><FormattedMessage id='homeheader.handbook' /></b></div>
                            <div className='sub-title'> <FormattedMessage id='homeheader.solution' /></div>
                        </div>
                        <div className='menu__item pointer' onClick={() => this.goToLogin()}>
                            <FormattedMessage id='homeheader.manage-account' />
                            {userInfo && userInfo.firstName && userInfo.lastName ? ' ' + userInfo.firstName + ' ' + userInfo.lastName : ' '} !
                        </div>
                    </>
                )}

                {/* Hiển thị hoặc ẩn nút hiển thị SearchBar */}
                <div className={`menu__item hide__576 ${searchBarVisible ? 'hide' : ''}`} onClick={this.toggleSearchBar}>
                    <div><i className='fa-solid fa-search' /></div>
                    <div className='sub-title'> <FormattedMessage id='homeheader.search' /></div>
                </div>

                {/* Hiển thị hoặc ẩn nút đóng SearchBar */}
                <div className={`menu__item hide__576 ${!searchBarVisible ? 'hide' : ''}`} onClick={this.toggleSearchBar}>
                    <div><i className='fa-solid fa-times' /></div>
                    <div className='sub-title'> <FormattedMessage id='homeheader.close-search' /></div>
                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </
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
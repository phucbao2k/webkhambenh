import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from "../../store/actions"
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
class HomeHeader extends Component {
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
    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu
        })
    }
    render() {
        let language = this.props.language;
        console.log("check language: ", language);
        const { processLogout, userInfo } = this.props;
        return (
            <React.Fragment>

                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fa-solid fa-bars-staggered"></i>

                            <img className="header-logo" onClick={() => this.returnToHome()}></img>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.speciality" /></b></div>
                                <div className="sub-title"> <FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className="child-content">
                                <div><b> <FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className="sub-title"> <FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className="sub-title"> <FormattedMessage id="homeheader.select-doctor" /> </div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.check-health" /></div>
                            </div>

                        </div>
                        <div className="right-content">
                            <span className="welcome">
                                <FormattedMessage id="homeheader.welcome"></FormattedMessage>,
                                {userInfo && userInfo.firstName && userInfo.lastName ? ' ' + userInfo.firstName + ' ' + userInfo.lastName : ' '} !
                                {/* Khi có thông tin của userInfo với 2 biến đầy đủ như kia thì ta in ra, không thì trả về giá trị rỗng */}
                            </span>
                            <div className="support" onClick={() => this.goToLogin()}><i className="fa-solid fa-circle-question"
                            >

                            </i>
                                <div><b><FormattedMessage id="homeheader.support" /></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.click" /></div>
                            </div>
                            <div className="language">
                                <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                    <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                                </div>
                                <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                    <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                {this.props.isShowBanner === true &&
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1"><FormattedMessage id="banner.title1" /></div>
                            <div className="title2"><FormattedMessage id="banner.title2" /></div>
                            <div className="search"><i className="fa-solid fa-magnifying-glass"></i>
                                <input type="text" placeholder='Search...'></input></div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="icon-child"><i className="fa-solid fa-tree"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child1" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fa-solid fa-mobile-screen-button"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child2" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fa-solid fa-book-medical"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child3" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fa-solid fa-mosquito"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child4" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fa-brands fa-pagelines"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child5" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fa-solid fa-sun-plant-wilt"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child6" /></div>
                                </div>
                            </div>
                        </div>

                    </div>
                }
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
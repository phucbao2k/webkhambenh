import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES, USER_ROLE } from '../../utils';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu, patientMenu, bookingManagerMenu } from './menuApp';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
            activeMenu: false
        }

        this.changeActiveMenu = this.changeActiveMenu.bind(this);
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    changeActiveMenu = () => {
        this.setState({
            activeMenu: !this.state.activeMenu
        });
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
            if (role === USER_ROLE.PATIENT) {
                menu = patientMenu;
            }
            if (role === USER_ROLE.ADMIN_BOOKING) {
                menu = bookingManagerMenu;
            }

        }
        this.setState({
            menuApp: menu
        })
    }
    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <React.Fragment>
                <div className={this.state.activeMenu == false ? 'left_menu' : 'left_menu active_menu'}>
                    <div className='overlay' onClick={this.changeActiveMenu}></div>
                    <div className='main-content main-content_header'>
                        <Navigator menus={this.state.menuApp} mobile={true} />
                    </div>
                </div>
                <div className="header-container main__header">
                    {/* thanh navigator */}
                    <div className="header-tabs-container d-flex">
                        <div className='d-flex align-items-center bar__btn' onClick={this.changeActiveMenu}>
                            <i class="fa-solid fa-bars bar_icon"></i>
                        </div>
                        <Navigator menus={this.state.menuApp} mobile={false} />
                    </div>

                    <div className="languages">
                        <span className="welcome">
                            <FormattedMessage id="homeheader.welcome"></FormattedMessage>,
                            {userInfo && userInfo.firstName && userInfo.lastName ? ' ' + userInfo.firstName + ' ' + userInfo.lastName : ' '} !
                            {/* Khi có thông tin của userInfo với 2 biến đầy đủ như kia thì ta in ra, không thì trả về giá trị rỗng */}
                        </span>
                        <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                            <span onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                        </div>
                        <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                            <span onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                        </div>
                        {/* nút logout */}
                        <div className="btn btn-logout" onClick={processLogout}>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

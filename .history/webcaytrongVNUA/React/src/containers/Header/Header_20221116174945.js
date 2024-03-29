import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES, USER_ROLE } from '../../utils';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu, patientMenu } from './menuApp';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
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

        }
        this.setState({
            menuApp: menu
        })
    }
    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                
                <div className="languages">
                   
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

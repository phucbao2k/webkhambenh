import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES, USER_ROLE } from '../../utils';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import {FormattedMessage} from 'react-intl';
class Header extends Component {
handleChangeLanguage =(language) => {
    this.props.changeLanguageAppRedux(language);
}
    render() {
        const { processLogout, language,userInfo  } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
<div className="languages">
    <span className="welcome">
        <FormattedMessage id="homeheader.welcome"></FormattedMessage>, 
        {userInfo && userInfo.firstName && userInfo.lastName? ' '+ userInfo.firstName +' '+ userInfo.lastName: ' '} !
        {/* Khi có thông tin của userInfo với 2 biến đầy đủ như kia thì ta in ra, không thì trả về giá trị rỗng */}
    </span> 
<div className={language === LANGUAGES.VI ?'language-vi active':'language-vi'}>
                            <span onClick={() =>this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                        <div className={language === LANGUAGES.EN ?'language-en active':'language-en'}>
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
        changeLanguageAppRedux:(language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

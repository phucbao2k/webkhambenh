import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';

class Header extends Component {
handleChangeLanguage =(language) => {
    this.props.changeLanguageAppRedux(language);
}
    render() {
        const { processLogout, language  } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
<div className="languages">
<div className={language === LANGUAGES.VI ?'language-vi active':'language-vi'}>
                            <span onClick={() =>this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                        <div className={language === LANGUAGES.EN ?'language-en active':'language-en'}>
                            <span onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
</div>
                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
        language: state.user.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

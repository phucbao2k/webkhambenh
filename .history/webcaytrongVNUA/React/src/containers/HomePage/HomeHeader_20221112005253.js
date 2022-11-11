import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { LANGUAGES } from '../../utils';
import * as actions from "../../store/actions";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
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
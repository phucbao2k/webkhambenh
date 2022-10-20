import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {postVerifyBookAppointment} from "../../services/userService";
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';


//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
statusVerify: false,
errCode: 0
        }

    }


    async componentDidMount() {
if(this.props.location && this.props.location.search){
    let urlParams = new URLSearchParams(this.props.location.search);
    let token = urlParams.get('token');
    let doctorId = urlParams.get('doctorId');
    let res = await postVerifyBookAppointment({
        token: token,
        doctor
    })
}
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {
        return (
            <div></div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);





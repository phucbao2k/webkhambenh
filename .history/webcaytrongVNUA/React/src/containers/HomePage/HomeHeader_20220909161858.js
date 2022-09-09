import React, { Component} from 'react';
import {connect} from 'react-redux';
import './HomeHeader.scss';
class HomeHeader extends Component {
    render(){
        return (
            <React.Fragment>

            </React.Fragment>
          
        )
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
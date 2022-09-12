import React, { Component } from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';



class HomeFooter extends Component{
   
    render(){
      
        return(
            <div className="home-footer">
                <p>&copy; 2022 Tạ Bảo Phúc
                    <a >
                    <span className="title-section"><FormattedMessage id="home-footer"/></span></a>
                </p>
            </div>
        );
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
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
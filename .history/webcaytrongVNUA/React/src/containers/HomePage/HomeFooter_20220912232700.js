import React, { Component } from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';



class HomeFooter extends Component{
   
    render(){
      
        return(
            <div className="section-share home-footer">
                <p>&copy; 2022 Tạ Bảo Phúc-<FormattedMessage id="home-footer.more-info"/>
                    <a href="https://www.youtube.com/c/H%E1%BB%8FiD%C3%A2nIT">&#8594
                    </a>
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
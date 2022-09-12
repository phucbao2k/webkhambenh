import React, { Component } from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';



class About extends Component{
   
    render(){
      
        return(
            <div className="section-share section-about">
                <div className="section-about-header">
                    Channel Hỏi Dân IT
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                    <iframe width="900" height="506"
                     src="https://www.youtube.com/embed/21tjOW8BvB4?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI" title="Bài N5: Demo Sản Phẩm Đạt Được Khi Kết Thúc Khóa Học Trên Production |Khóa Học Node.js và React" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className="content-left"></div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);